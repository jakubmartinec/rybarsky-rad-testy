import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { updateTicket } from '@/lib/db';
import { FieldValue } from 'firebase-admin/firestore';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Zpracuj event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.metadata?.ticketId && session.payment_status === 'paid') {
          // Aktualizuj ticket na zaplacený
          await updateTicket(session.metadata.ticketId, {
            status: 'paid',
            paidAt: FieldValue.serverTimestamp() as any,
            stripeSessionId: session.id,
            stripePaymentIntentId: session.payment_intent as string,
            customerEmail: session.customer_details?.email || undefined,
          });

          console.log(`Ticket ${session.metadata.ticketId} marked as paid`);
        }
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.metadata?.ticketId) {
          // Označ ticket jako zrušený
          await updateTicket(session.metadata.ticketId, {
            status: 'cancelled',
          });

          console.log(`Ticket ${session.metadata.ticketId} cancelled (session expired)`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
