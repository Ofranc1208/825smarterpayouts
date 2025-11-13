import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ProsConsSelling } from '@/src/components/Pages/StructuredSettlementInfoHub';
import { generateInfoHubMetadata } from '@/lib/seo/metadata';

const LazyFABSpeedDial = dynamic(() => import('../../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = generateInfoHubMetadata(
  'Pros and Cons of Selling a Structured Settlement',
  'Weighing your options? Understand the advantages and disadvantages of selling your structured settlement payments. Expert analysis and guidance.',
  'pros-cons-selling-structured-settlement'
);

export default function Page() {
  return (
    <>
      <ProsConsSelling />
      <LazyFABSpeedDial />
    </>
  );
}
