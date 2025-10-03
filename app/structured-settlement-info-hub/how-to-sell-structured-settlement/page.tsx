import { Metadata } from 'next';
import { HowToSellStructuredSettlement } from '@/src/components/Pages/StructuredSettlementInfoHub';

export const metadata: Metadata = {
  title: 'How to Sell a Structured Settlement | 5-Step Process | SmarterPayouts',
  description: 'Complete guide to selling your structured settlement: step-by-step process, court approval, getting quotes, and maximizing your payout.',
  robots: 'index, follow',
  openGraph: {
    title: 'How to Sell a Structured Settlement | 5-Step Process',
    description: 'Learn the exact process for selling your structured settlement payments for a lump sum.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-info-hub/how-to-sell-structured-settlement',
  },
};

export default function Page() {
  return <HowToSellStructuredSettlement />;
}
