import { notFound } from 'next/navigation';
import { getParkingLot } from '@/lib/db';
import ParkingHeader from '@/components/parking/ParkingHeader';
import PriceDisplay from '@/components/parking/PriceDisplay';
import ParkingForm from '@/components/parking/ParkingForm';

interface PageProps {
  params: Promise<{
    parkingLotId: string;
  }>;
}

export default async function ParkingPage({ params }: PageProps) {
  const { parkingLotId } = await params;
  const parkingLot = await getParkingLot(parkingLotId);

  if (!parkingLot || !parkingLot.isActive) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8F8F8] flex flex-col items-center px-6">
      <ParkingHeader logoUrl={parkingLot.logoUrl} name={parkingLot.name} />

      <PriceDisplay
        price={parkingLot.pricePerDay}
        currency={parkingLot.currency}
        duration={parkingLot.parkingDurationHours}
      />

      <ParkingForm parkingLot={parkingLot} />
    </main>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { parkingLotId } = await params;
  const parkingLot = await getParkingLot(parkingLotId);

  if (!parkingLot) {
    return {
      title: 'Parkoviště nenalezeno',
    };
  }

  return {
    title: `${parkingLot.name} - Parkování`,
    description: `Zaplaťte parkování na ${parkingLot.name} za ${parkingLot.pricePerDay} ${parkingLot.currency}`,
  };
}
