import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Rybářské testy
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Vyber si test, který chceš absolvovat:
        </p>

        <div className="space-y-4">
          <Link
            href="/ryby-kviz"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors text-center"
          >
            <div className="text-xl mb-1">Minimální lovné míry ryb</div>
            <div className="text-sm font-normal opacity-90">15 minut | 21 otázek</div>
          </Link>

          <Link
            href="/hajeni-kviz"
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors text-center"
          >
            <div className="text-xl mb-1">Doby hájení ryb</div>
            <div className="text-sm font-normal opacity-90">10 minut | 9 otázek</div>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="font-bold text-gray-800 mb-2">Jak to funguje:</h2>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>U každé otázky vyber správnou odpověď ze 3 možností</li>
            <li>K úspěchu potřebuješ mít maximálně 3 chyby</li>
            <li>Všechny údaje se týkají mimopstruhového rybářského revíru</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
