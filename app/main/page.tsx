import { Metadata } from 'next';
import MainPage from '@/src/components/Pages/Main';
import dynamic from 'next/dynamic';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });
const LazyChatManager = dynamic(() => import('@/src/components/chat/ChatManager'), {
  ssr: false,
  loading: () => <div style={{ display: 'none' }} />
});

export const metadata: Metadata = {
  title: 'AI-Powered Structured Settlement Calculator | SmarterPayouts',
  description: 'Advanced structured settlement calculator with AI assistance. Get accurate lump sum quotes, compare offers, and connect with specialists. No personal data required.',
  keywords: 'structured settlement calculator, AI calculator, lump sum calculator, settlement quotes, financial planning',
  alternates: {
    canonical: 'https://smarterpayouts.com/main',
  },
  robots: 'index, follow',
  openGraph: {
    title: 'AI-Powered Structured Settlement Calculator',
    description: 'Advanced structured settlement calculator with AI assistance. Get accurate lump sum quotes, compare offers, and connect with specialists.',
    url: 'https://smarterpayouts.com/main',
    type: 'website',
  },
};

export default function Main() {
  return (
    <>
      <MainPage />
      <LazyFABSpeedDial />
    </>
  );
}
