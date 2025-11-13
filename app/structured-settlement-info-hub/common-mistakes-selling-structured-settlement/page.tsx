import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { CommonMistakes } from '@/src/components/Pages/StructuredSettlementInfoHub';
import { generateInfoHubMetadata } from '@/lib/seo/metadata';

const LazyFABSpeedDial = dynamic(() => import('../../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = generateInfoHubMetadata(
  '8 Common Mistakes Selling Structured Settlements | Avoid Costly Errors',
  'Avoid costly errors when selling your structured settlement. Learn the 8 most common mistakes, real costs, and how to protect yourself. Expert guide.',
  'common-mistakes-selling-structured-settlement'
);

export default function Page() {
  return (
    <>
      <CommonMistakes />
      <LazyFABSpeedDial />
    </>
  );
}

