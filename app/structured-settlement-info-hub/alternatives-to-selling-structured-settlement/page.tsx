import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { AlternativesToSelling } from '@/src/components/Pages/StructuredSettlementInfoHub';
import { generateInfoHubMetadata } from '@/lib/seo/metadata';

const LazyFABSpeedDial = dynamic(() => import('../../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = generateInfoHubMetadata(
  'Alternatives to Selling Your Structured Settlement | 6 Options',
  'Explore 6 alternatives to selling: loans, payment acceleration, budgeting, and more. Preserve value while solving financial needs.',
  'alternatives-to-selling-structured-settlement'
);

export default function Page() {
  return (
    <>
      <AlternativesToSelling />
      <LazyFABSpeedDial />
    </>
  );
}

