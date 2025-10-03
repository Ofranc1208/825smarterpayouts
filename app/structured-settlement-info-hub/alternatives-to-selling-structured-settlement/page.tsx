import { Metadata } from 'next';
import { AlternativesToSelling } from '@/src/components/Pages/StructuredSettlementInfoHub';

export const metadata: Metadata = {
  title: 'Alternatives to Selling Your Structured Settlement | 6 Options | SmarterPayouts',
  description: 'Explore 6 alternatives to selling: loans, payment acceleration, budgeting, and more. Preserve value while solving financial needs.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-info-hub/alternatives-to-selling-structured-settlement',
  },
};

export default function Page() {
  return <AlternativesToSelling />;
}

