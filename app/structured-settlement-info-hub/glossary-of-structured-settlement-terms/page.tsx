import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Glossary } from '@/src/components/Pages/StructuredSettlementInfoHub';

const LazyFABSpeedDial = dynamic(() => import('../../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = {
  title: 'Glossary of Structured Settlement Terms | Definitions | SmarterPayouts',
  description: 'Clear definitions of the most important terms in structured settlements, court approval, annuities, and more. Searchable glossary.',
  robots: 'index, follow',
  openGraph: {
    title: 'Glossary of Structured Settlement Terms | Definitions',
    description: 'Comprehensive glossary of structured settlement terminology and legal definitions.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-info-hub/glossary-of-structured-settlement-terms',
  },
};

export default function Page() {
  return (
    <>
      <Glossary />
      <LazyFABSpeedDial />
    </>
  );
}
