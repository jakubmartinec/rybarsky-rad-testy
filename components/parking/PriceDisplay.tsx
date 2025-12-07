import { formatPrice } from '@/lib/utils';

interface PriceDisplayProps {
  price: number;
  currency: 'CZK' | 'EUR';
  duration: number; // hours
}

export default function PriceDisplay({ price, currency, duration }: PriceDisplayProps) {
  const getDurationText = (hours: number) => {
    if (hours === 24) return '24 h';
    if (hours < 24) return `${hours} h`;
    const days = Math.floor(hours / 24);
    return `${days} ${days === 1 ? 'den' : days < 5 ? 'dny' : 'dní'}`;
  };

  return (
    <div className="flex flex-col items-center mt-8 mb-4">
      <div className="text-[72px] font-extrabold leading-none text-[#1A1A1A]">
        {formatPrice(price, currency)}
      </div>
      <p className="text-[16px] text-[#6B7280] mt-2">
        Placené parkování na {getDurationText(duration)}
      </p>
    </div>
  );
}
