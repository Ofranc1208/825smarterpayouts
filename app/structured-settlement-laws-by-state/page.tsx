// App Router wrapper for Settlement Laws by State page
// Following enterprise architecture patterns

import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import SettlementLawsByStatePage from '../../src/components/Pages/SettlementLawsByState';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = {
  title: 'Structured Settlement Laws by State | Complete Guide | SmarterPayouts',
  description: 'Comprehensive guide to structured settlement laws in all 50 states. Learn court approval requirements, key provisions, and selling regulations for your state.',
  keywords: 'structured settlement laws by state, court approval requirements, state regulations, selling settlements, state-specific laws',
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-laws-by-state',
  },
  robots: 'index, follow',
  openGraph: {
    title: 'Structured Settlement Laws by State | Complete Guide',
    description: 'Comprehensive guide to structured settlement laws in all 50 states. Learn court approval requirements and state-specific regulations.',
    url: 'https://smarterpayouts.com/structured-settlement-laws-by-state',
    type: 'article',
  },
};

export default function StructuredSettlementLawsByState() {
  return (
    <>
      <SettlementLawsByStatePage />
      <LazyFABSpeedDial />
    </>
  );
}
