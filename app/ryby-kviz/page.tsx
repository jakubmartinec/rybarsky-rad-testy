import { Metadata, Viewport } from 'next';
import FishQuiz from '@/components/fish-quiz/FishQuiz';

export const metadata: Metadata = {
  title: 'Test: Minimální lovné míry ryb',
  description: 'Interaktivní test o minimálních lovných mírách vybraných druhů ryb v mimopstruhovém rybářském revíru',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RybyKvizPage() {
  return <FishQuiz />;
}
