import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { WhatIsStructuredSettlement } from '@/src/components/Pages/StructuredSettlementInfoHub';
import { generateInfoHubMetadata } from '@/lib/seo/metadata';

const LazyFABSpeedDial = dynamic(() => import('../../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = generateInfoHubMetadata(
  'What is a Structured Settlement? | Complete Guide',
  'Learn everything about structured settlements: how they work, benefits, payment options, and when you can sell. Expert guidance from Smarter Payouts.',
  'what-is-a-structured-settlement'
);

export default function Page() {
  return (
    <>
      <WhatIsStructuredSettlement />
      <LazyFABSpeedDial />
    </>
  );
}
