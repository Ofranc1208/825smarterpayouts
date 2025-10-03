import { Metadata } from 'next';
import { ProsConsSelling } from '@/src/components/Pages/StructuredSettlementInfoHub';

export const metadata: Metadata = {
  title: 'Pros and Cons of Selling a Structured Settlement | SmarterPayouts',
  description: 'Weighing your options? Understand the advantages and disadvantages of selling your structured settlement payments. Expert analysis and guidance.',
  robots: 'index, follow',
  openGraph: {
    title: 'Pros and Cons of Selling a Structured Settlement',
    description: 'Complete analysis of the benefits and drawbacks of selling structured settlement payments.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-info-hub/pros-cons-selling-structured-settlement',
  },
};

export default function Page() {
  return <ProsConsSelling />;
}
