import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { MaximizeOffer } from '@/src/components/Pages/StructuredSettlementInfoHub';

const LazyFABSpeedDial = dynamic(() => import('../../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = {
  title: 'How to Maximize Structured Settlement Offer | 12 Strategies | SmarterPayouts',
  description: '12 proven strategies to get best price. Worth $10,000-$30,000 in extra value. Expert negotiation tactics for structured settlements.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-info-hub/maximize-offer-selling-structured-settlement',
  },
};

export default function Page() {
  return (
    <>
      <MaximizeOffer />
      <LazyFABSpeedDial />
    </>
  );
}

