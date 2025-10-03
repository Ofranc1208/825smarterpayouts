import { Metadata } from 'next';
import { StateLaws } from '@/src/components/Pages/StructuredSettlementInfoHub';

export const metadata: Metadata = {
  title: 'Structured Settlement Laws by State | State Requirements | SmarterPayouts',
  description: 'Understand structured settlement laws and court approval requirements for all 50 states. State-specific guidance and regulations.',
  robots: 'index, follow',
  openGraph: {
    title: 'Structured Settlement Laws by State | State Requirements',
    description: 'Complete guide to state-specific structured settlement laws, court requirements, and regulations.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-info-hub/state-laws',
  },
};

export default function Page() {
  return <StateLaws />;
}
