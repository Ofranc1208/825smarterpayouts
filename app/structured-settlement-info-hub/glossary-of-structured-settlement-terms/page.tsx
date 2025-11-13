import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Glossary } from '@/src/components/Pages/StructuredSettlementInfoHub';
import { generateInfoHubMetadata } from '@/lib/seo/metadata';

const LazyFABSpeedDial = dynamic(() => import('../../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = generateInfoHubMetadata(
  'Glossary of Structured Settlement Terms | Definitions',
  'Clear definitions of the most important terms in structured settlements, court approval, annuities, and more. Searchable glossary.',
  'glossary-of-structured-settlement-terms'
);

export default function Page() {
  return (
    <>
      <Glossary />
      <LazyFABSpeedDial />
    </>
  );
}
