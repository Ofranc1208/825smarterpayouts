import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { FAQPage } from '@/src/components/Pages/StructuredSettlementInfoHub';
import { generateInfoHubMetadata } from '@/lib/seo/metadata';

const LazyFABSpeedDial = dynamic(() => import('../../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = generateInfoHubMetadata(
  'Structured Settlement FAQs | Common Questions Answered',
  'Get answers to the most common questions about structured settlements, selling, court approval, taxes, and more. Expert FAQ guide.',
  'faq'
);

export default function Page() {
  return (
    <>
      <FAQPage />
      <LazyFABSpeedDial />
    </>
  );
}
