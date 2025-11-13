import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { AfterYouSell } from '@/src/components/Pages/StructuredSettlementInfoHub';
import { generateInfoHubMetadata } from '@/lib/seo/metadata';

const LazyFABSpeedDial = dynamic(() => import('../../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = generateInfoHubMetadata(
  'After You Sell Structured Settlement | Financial Planning Guide',
  '90-day plan, smart allocation, avoiding mistakes. Make your lump sum last. Expert financial advice for after selling.',
  'after-you-sell-structured-settlement'
);

export default function Page() {
  return (
    <>
      <AfterYouSell />
      <LazyFABSpeedDial />
    </>
  );
}

