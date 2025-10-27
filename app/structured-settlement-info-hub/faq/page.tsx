import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { FAQPage } from '@/src/components/Pages/StructuredSettlementInfoHub';

const LazyFABSpeedDial = dynamic(() => import('../../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = {
  title: 'Structured Settlement FAQs | Common Questions Answered | SmarterPayouts',
  description: 'Get answers to the most common questions about structured settlements, selling, court approval, taxes, and more. Expert FAQ guide.',
  robots: 'index, follow',
  openGraph: {
    title: 'Structured Settlement FAQs | Common Questions Answered',
    description: 'Comprehensive FAQ covering all aspects of structured settlements and selling your payments.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-info-hub/faq',
  },
};

export default function Page() {
  return (
    <>
      <FAQPage />
      <LazyFABSpeedDial />
    </>
  );
}
