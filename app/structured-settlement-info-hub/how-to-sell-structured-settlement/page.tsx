import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { HowToSellStructuredSettlement } from '@/src/components/Pages/StructuredSettlementInfoHub';
import { generateInfoHubMetadata } from '@/lib/seo/metadata';

const LazyFABSpeedDial = dynamic(() => import('../../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = generateInfoHubMetadata(
  'How to Sell a Structured Settlement | 5-Step Process',
  'Complete guide to selling your structured settlement: step-by-step process, court approval, getting quotes, and maximizing your payout.',
  'how-to-sell-structured-settlement'
);

export default function Page() {
  return (
    <>
      <HowToSellStructuredSettlement />
      <LazyFABSpeedDial />
    </>
  );
}
