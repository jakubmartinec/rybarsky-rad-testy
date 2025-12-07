import { notFound, redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe';
import { getTicket, getParkingLot } from '@/lib/db';
import { formatValidUntil } from '@/lib/utils';
import ParkingHeader from '@/components/parking/ParkingHeader';
import ActionButton from '@/components/parking/ActionButton';

interface PageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;

  if (!sessionId) {
    redirect('/');
  }

  try {
    // Získej Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session.metadata?.ticketId) {
      notFound();
    }

    // Získej ticket a parkoviště
    const ticket = await getTicket(session.metadata.ticketId);
    if (!ticket) {
      notFound();
    }

    const parkingLot = await getParkingLot(ticket.parkingLotId);
    if (!parkingLot) {
      notFound();
    }

    // Převeď Firestore Timestamp na Date
    const validUntilDate = ticket.validUntil.toDate();

    return (
      <main className="min-h-screen bg-[#F8F8F8] flex flex-col items-center px-6">
        <ParkingHeader logoUrl={parkingLot.logoUrl} name={parkingLot.name} />

        <div className="flex flex-col items-center mt-8 flex-1">
          <h1 className="text-[56px] font-extrabold text-[#1A1A1A] leading-tight">
            Zaplaceno
          </h1>

          <p className="text-[16px] text-[#6B7280] mt-2 text-center">
            Lístek platí do{' '}
            <strong className="text-[#1A1A1A]">
              {formatValidUntil(validUntilDate)}
            </strong>
          </p>

          <div className="text-[120px] mt-12 leading-none">
            ✓
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
            <div className="text-[#22C55E] opacity-20 font-bold text-[200px]">
              ✓
            </div>
          </div>

          <div className="flex-1" />

          <ActionButton
            variant="secondary"
            href={`/receipt/${ticket.id}`}
            className="mb-10"
          >
            Stáhnout doklad
          </ActionButton>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading success page:', error);
    notFound();
  }
}

export const metadata = {
  title: 'Platba proběhla úspěšně',
  description: 'Parkování bylo zaplaceno',
};
