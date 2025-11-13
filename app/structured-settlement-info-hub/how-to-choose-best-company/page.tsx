import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { HowToChooseBestCompany } from '@/src/components/Pages/StructuredSettlementInfoHub';
import { generateInfoHubMetadata } from '@/lib/seo/metadata';

const LazyFABSpeedDial = dynamic(() => import('../../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = generateInfoHubMetadata(
  'How to Choose Best Structured Settlement Company | 10 Criteria',
  '10 criteria for selecting a reputable company, red flags to avoid, questions to ask. Expert buying guide for structured settlements.',
  'how-to-choose-best-company'
);

export default function Page() {
  return <HowToChooseBestCompany />;
}

