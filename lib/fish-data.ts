// Data o minimálních lovných mírách ryb v mimopstruhovém rybářském revíru

export interface Fish {
  id: string;
  name: string;
  scientificName: string;
  minSize: number; // v centimetrech
  category: 'mimopstruhovy' | 'rybarskyRad';
}

export const fishData: Fish[] = [
  // Mimopstruhový rybářský revír
  {
    id: 'bolen-dravy',
    name: 'bolen dravý',
    scientificName: 'Leuciscus aspius',
    minSize: 40,
    category: 'mimopstruhovy'
  },
  {
    id: 'candat-obecny',
    name: 'candát obecný',
    scientificName: 'Sander lucioperca',
    minSize: 45,
    category: 'mimopstruhovy'
  },
  {
    id: 'hlavatka-obecna',
    name: 'hlavatka obecná (podunajská)',
    scientificName: 'Hucho hucho',
    minSize: 65,
    category: 'mimopstruhovy'
  },
  {
    id: 'jelec-jesen',
    name: 'jelec jesen',
    scientificName: 'Leuciscus idus',
    minSize: 25,
    category: 'mimopstruhovy'
  },
  {
    id: 'jelec-tloust',
    name: 'jelec tloušť',
    scientificName: 'Squalius cephalus',
    minSize: 25,
    category: 'mimopstruhovy'
  },
  {
    id: 'jeseter-maly',
    name: 'jeseter malý',
    scientificName: 'Acipenser ruthenus',
    minSize: 30,
    category: 'mimopstruhovy'
  },
  {
    id: 'kapr-obecny',
    name: 'kapr obecný',
    scientificName: 'Cyprinus carpio',
    minSize: 40,
    category: 'mimopstruhovy'
  },
  {
    id: 'lin-obecny',
    name: 'lín obecný',
    scientificName: 'Tinca tinca',
    minSize: 20,
    category: 'mimopstruhovy'
  },
  {
    id: 'lipan-podhorni',
    name: 'lipan podhorní',
    scientificName: 'Thymallus thymallus',
    minSize: 30,
    category: 'mimopstruhovy'
  },
  {
    id: 'ostroretka-stehovava',
    name: 'ostroretka stěhovavá',
    scientificName: 'Chondrostoma nasus',
    minSize: 30,
    category: 'mimopstruhovy'
  },
  {
    id: 'parma-obecna',
    name: 'parma obecná',
    scientificName: 'Barbus barbus',
    minSize: 40,
    category: 'mimopstruhovy'
  },
  {
    id: 'podoustev-ricni',
    name: 'podoustev říční (nosák)',
    scientificName: 'Vimba vimba',
    minSize: 25,
    category: 'mimopstruhovy'
  },
  {
    id: 'pstruh-duhovy',
    name: 'pstruh duhový',
    scientificName: 'Oncorhynchus mykiss',
    minSize: 25,
    category: 'mimopstruhovy'
  },
  // Rybářský řád
  {
    id: 'pstruh-obecny',
    name: 'pstruh obecný',
    scientificName: 'Salmo trutta',
    minSize: 25,
    category: 'rybarskyRad'
  },
  {
    id: 'siven-americky',
    name: 'síven americký',
    scientificName: 'Salvelinus fontinalis',
    minSize: 25,
    category: 'rybarskyRad'
  },
  {
    id: 'sumec-velky',
    name: 'sumec velký',
    scientificName: 'Silurus glanis',
    minSize: 70,
    category: 'rybarskyRad'
  },
  {
    id: 'stika-obecna',
    name: 'štika obecná',
    scientificName: 'Esox lucius',
    minSize: 50,
    category: 'rybarskyRad'
  },
  {
    id: 'uhor-ricni',
    name: 'úhoř říční',
    scientificName: 'Anguilla anguilla',
    minSize: 50,
    category: 'rybarskyRad'
  },
  {
    id: 'mnik-jednovousy',
    name: 'mník jednovousý',
    scientificName: 'Lota lota',
    minSize: 30,
    category: 'rybarskyRad'
  },
  {
    id: 'losos-obecny',
    name: 'losos obecný (atlantský)',
    scientificName: 'Salmo salar',
    minSize: 50,
    category: 'rybarskyRad'
  },
  {
    id: 'amur-bily',
    name: 'amur bílý',
    scientificName: 'Ctenopharyngodon idella',
    minSize: 50,
    category: 'rybarskyRad'
  }
];

// Funkce pro získání všech unikátních velikostí
export function getUniqueSizes(): number[] {
  const sizes = new Set(fishData.map(fish => fish.minSize));
  return Array.from(sizes).sort((a, b) => a - b);
}

// Funkce pro generování 3 možností pro danou rybu
export function generateOptions(correctSize: number): number[] {
  const allSizes = getUniqueSizes();
  const options = new Set<number>();
  options.add(correctSize);

  // Přidej další 2 náhodné velikosti
  while (options.size < 3 && allSizes.length >= 3) {
    const randomSize = allSizes[Math.floor(Math.random() * allSizes.length)];
    options.add(randomSize);
  }

  // Pokud nemáme dost unikátních velikostí, přidej variace
  if (options.size < 3) {
    const variations = [5, 10, 15];
    for (const variation of variations) {
      if (options.size >= 3) break;
      options.add(correctSize + variation);
    }
  }

  return Array.from(options).sort((a, b) => a - b);
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
