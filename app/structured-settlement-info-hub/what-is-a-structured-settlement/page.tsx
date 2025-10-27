import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { WhatIsStructuredSettlement } from '@/src/components/Pages/StructuredSettlementInfoHub';

const LazyFABSpeedDial = dynamic(() => import('../../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = {
  title: 'What is a Structured Settlement? | Complete Guide | SmarterPayouts',
  description: 'Learn everything about structured settlements: how they work, benefits, payment options, and when you can sell. Expert guidance from SmarterPayouts.',
  robots: 'index, follow',
  openGraph: {
    title: 'What is a Structured Settlement? | Complete Guide',
    description: 'Comprehensive guide to understanding structured settlements, how they work, and your payment options.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-info-hub/what-is-a-structured-settlement',
  },
};

export default function Page() {
  return (
    <>
      <WhatIsStructuredSettlement />
      <LazyFABSpeedDial />
    </>
  );
}
