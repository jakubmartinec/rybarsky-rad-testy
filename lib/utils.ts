import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formátování data pro validitu lístku
// Formát: "úterý 27.5. 9:41"
export function formatValidUntil(date: Date): string {
  const days = ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'];
  const day = days[date.getDay()];
  const dateStr = `${date.getDate()}.${date.getMonth() + 1}.`;
  const time = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  return `${day} ${dateStr} ${time}`;
}

// Normalizace SPZ - uppercase, odstranění mezer
export function normalizeLicensePlate(plate: string): string {
  return plate.toUpperCase().replace(/\s+/g, '');
}

// Validace SPZ (české formáty)
export function isValidLicensePlate(plate: string): boolean {
  const normalized = normalizeLicensePlate(plate);
  // Základní validace - aspoň 2 znaky, max 8
  return normalized.length >= 2 && normalized.length <= 8;
}

// Formátování ceny
export function formatPrice(amount: number, currency: 'CZK' | 'EUR'): string {
  if (currency === 'CZK') {
    return `${amount} Kč`;
  }
  return `${amount} €`;
}
