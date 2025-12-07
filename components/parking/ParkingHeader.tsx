import Image from 'next/image';

interface ParkingHeaderProps {
  logoUrl?: string;
  name: string;
}

export default function ParkingHeader({ logoUrl, name }: ParkingHeaderProps) {
  return (
    <div className="flex flex-col items-center pt-16 mb-4">
      {logoUrl ? (
        <div className="w-20 h-20 relative mb-4 rounded-full overflow-hidden bg-white shadow-sm">
          <Image
            src={logoUrl}
            alt="Logo"
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm">
          <span className="text-3xl">🅿️</span>
        </div>
      )}
      <h1 className="text-xl font-semibold text-[#1A1A1A] text-center px-4">
        {name}
      </h1>
    </div>
  );
}
