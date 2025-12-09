// Data o dobách hájení ryb v mimopstruhovém rybářském revíru

export interface ProtectedFish {
  id: string;
  name: string;
  scientificName: string;
  protectionPeriod: string; // Textová reprezentace doby hájení
}

// Konstanta pro ryby bez hájení
export const NO_PROTECTION = 'nemá hájení';

// Konstanta pro celoročně hájené ryby
export const YEAR_ROUND_PROTECTION = 'celoročně';

export const protectedFishData: ProtectedFish[] = [
  // Od 1. ledna do 15. června
  {
    id: 'bolen-dravy',
    name: 'bolen dravý',
    scientificName: 'Leuciscus aspius',
    protectionPeriod: '1. ledna – 15. června'
  },
  {
    id: 'candat-obecny',
    name: 'candát obecný',
    scientificName: 'Sander lucioperca',
    protectionPeriod: '1. ledna – 15. června'
  },
  {
    id: 'okoun-ricni',
    name: 'okoun říční',
    scientificName: 'Perca fluviatilis',
    protectionPeriod: '1. ledna – 15. června'
  },
  {
    id: 'sumec-velky',
    name: 'sumec velký',
    scientificName: 'Silurus glanis',
    protectionPeriod: '1. ledna – 15. června'
  },
  {
    id: 'stika-obecna',
    name: 'štika obecná',
    scientificName: 'Esox lucius',
    protectionPeriod: '1. ledna – 15. června'
  },
  // Od 1. prosince do 15. června
  {
    id: 'lipan-podhorni',
    name: 'lipan podhorní',
    scientificName: 'Thymallus thymallus',
    protectionPeriod: '1. prosince – 15. června'
  },
  // Od 1. ledna do 30. září
  {
    id: 'hlavatka-obecna',
    name: 'hlavatka obecná (podunajská)',
    scientificName: 'Hucho hucho',
    protectionPeriod: '1. ledna – 30. září'
  },
  // Od 1. září do 30. listopadu
  {
    id: 'uhor-ricni',
    name: 'úhoř říční',
    scientificName: 'Anguilla anguilla',
    protectionPeriod: '1. září – 30. listopadu'
  },
  // Od 1. ledna do 15. března
  {
    id: 'mnik-jednovousy',
    name: 'mník jednovousý',
    scientificName: 'Lota lota',
    protectionPeriod: '1. ledna – 15. března'
  },
  // Ryby bez hájení
  {
    id: 'kapr-obecny',
    name: 'kapr obecný',
    scientificName: 'Cyprinus carpio',
    protectionPeriod: NO_PROTECTION
  },
  {
    id: 'amur-bily',
    name: 'amur bílý',
    scientificName: 'Ctenopharyngodon idella',
    protectionPeriod: NO_PROTECTION
  },
  // Celoročně hájené ryby
  {
    id: 'losos-obecny',
    name: 'losos obecný (atlantský)',
    scientificName: 'Salmo salar',
    protectionPeriod: YEAR_ROUND_PROTECTION
  }
];

// Všechny unikátní doby hájení pro generování možností
export const allProtectionPeriods: string[] = [
  '1. ledna – 15. června',
  '1. prosince – 15. června',
  '1. ledna – 30. září',
  '1. září – 30. listopadu',
  '1. ledna – 15. března',
  NO_PROTECTION,
  YEAR_ROUND_PROTECTION
];

// Funkce pro generování 3 možností pro danou rybu
export function generateProtectionOptions(correctPeriod: string): string[] {
  const options = new Set<string>();
  options.add(correctPeriod);

  // Přidej další 2 náhodné doby hájení
  const otherPeriods = allProtectionPeriods.filter(p => p !== correctPeriod);
  const shuffled = shuffleArray(otherPeriods);

  for (const period of shuffled) {
    if (options.size >= 3) break;
    options.add(period);
  }

  return shuffleArray(Array.from(options));
}

// Funkce pro zamíchání pole (Fisher-Yates shuffle)
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
