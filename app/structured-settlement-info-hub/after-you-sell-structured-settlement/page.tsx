import { Metadata } from 'next';
import { AfterYouSell } from '@/src/components/Pages/StructuredSettlementInfoHub';

export const metadata: Metadata = {
  title: 'After You Sell Structured Settlement | Financial Planning Guide | SmarterPayouts',
  description: '90-day plan, smart allocation, avoiding mistakes. Make your lump sum last. Expert financial advice for after selling.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-info-hub/after-you-sell-structured-settlement',
  },
};

export default function Page() {
  return <AfterYouSell />;
}

