import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getParkingLotAdmin, createTicket } from '@/lib/db';
import { normalizeLicensePlate } from '@/lib/utils';
import { Timestamp } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { parkingLotId, licensePlate, validUntil } = body;

    // Validace
    if (!parkingLotId || !licensePlate || !validUntil) {
      return NextResponse.json(
        { error: 'Chybí povinné údaje' },
        { status: 400 }
      );
    }

    // Získej data parkoviště
    const parkingLot = await getParkingLotAdmin(parkingLotId);

    if (!parkingLot || !parkingLot.isActive) {
      return NextResponse.json(
        { error: 'Parkoviště není dostupné' },
        { status: 404 }
      );
    }

    const validFromDate = new Date();
    const validUntilDate = new Date(validUntil);

    // Vytvoř ticket v DB
    const ticket = await createTicket({
      parkingLotId: parkingLot.id,
      clientId: parkingLot.clientId,
      licensePlate: normalizeLicensePlate(licensePlate),
      price: parkingLot.pricePerDay,
      currency: parkingLot.currency,
      validFrom: validFromDate,
      validUntil: validUntilDate,
    });

    // Vytvoř Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: parkingLot.currency.toLowerCase(),
            product_data: {
              name: `Parkování - ${parkingLot.name}`,
              description: `SPZ: ${ticket.licensePlate}`,
            },
            unit_amount: Math.round(parkingLot.pricePerDay * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/failed?ticket_id=${ticket.id}`,
      metadata: {
        ticketId: ticket.id,
        parkingLotId: parkingLot.id,
        licensePlate: ticket.licensePlate,
      },
    });

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Nepodařilo se vytvořit platbu' },
      { status: 500 }
    );
  }
}
