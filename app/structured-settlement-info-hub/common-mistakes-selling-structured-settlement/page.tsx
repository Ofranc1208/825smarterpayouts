import { Metadata } from 'next';
import { CommonMistakes } from '@/src/components/Pages/StructuredSettlementInfoHub';

export const metadata: Metadata = {
  title: '8 Common Mistakes Selling Structured Settlements | Avoid Costly Errors | SmarterPayouts',
  description: 'Avoid costly errors when selling your structured settlement. Learn the 8 most common mistakes, real costs, and how to protect yourself. Expert guide.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-info-hub/common-mistakes-selling-structured-settlement',
  },
};

export default function Page() {
  return <CommonMistakes />;
}

