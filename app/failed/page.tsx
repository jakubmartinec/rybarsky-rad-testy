import { notFound, redirect } from 'next/navigation';
import { getTicket, getParkingLot } from '@/lib/db';
import ParkingHeader from '@/components/parking/ParkingHeader';
import ActionButton from '@/components/parking/ActionButton';

interface PageProps {
  searchParams: Promise<{
    ticket_id?: string;
  }>;
}

export default async function FailedPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const ticketId = params.ticket_id;

  if (!ticketId) {
    redirect('/');
  }

  try {
    const ticket = await getTicket(ticketId);
    if (!ticket) {
      notFound();
    }

    const parkingLot = await getParkingLot(ticket.parkingLotId);
    if (!parkingLot) {
      notFound();
    }

    return (
      <main className="min-h-screen bg-[#F8F8F8] flex flex-col items-center px-6">
        <ParkingHeader logoUrl={parkingLot.logoUrl} name={parkingLot.name} />

        <div className="flex flex-col items-center mt-8 flex-1">
          <h1 className="text-[48px] font-extrabold text-[#B91C1C] leading-tight text-center">
            Chyba
            <br />
            platby
          </h1>

          <div className="flex-1" />

          <ActionButton
            href={`/p/${parkingLot.id}?spz=${ticket.licensePlate}`}
            className="mb-10"
          >
            Opakovat platbu
          </ActionButton>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading failed page:', error);
    notFound();
  }
}

export const metadata = {
  title: 'Platba se nezdařila',
  description: 'Při platbě došlo k chybě',
};
