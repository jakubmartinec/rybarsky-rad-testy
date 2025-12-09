import { Metadata, Viewport } from 'next';
import ProtectionQuiz from '@/components/protection-quiz/ProtectionQuiz';

export const metadata: Metadata = {
  title: 'Test: Doby hájení ryb',
  description: 'Interaktivní test o dobách hájení vybraných druhů ryb v mimopstruhovém rybářském revíru',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function HajeniKvizPage() {
  return <ProtectionQuiz />;
}
