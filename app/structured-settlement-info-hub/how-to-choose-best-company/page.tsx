import { Metadata } from 'next';
import { HowToChooseBestCompany } from '@/src/components/Pages/StructuredSettlementInfoHub';

export const metadata: Metadata = {
  title: 'How to Choose Best Structured Settlement Company | 10 Criteria | SmarterPayouts',
  description: '10 criteria for selecting a reputable company, red flags to avoid, questions to ask. Expert buying guide for structured settlements.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-info-hub/how-to-choose-best-company',
  },
};

export default function Page() {
  return <HowToChooseBestCompany />;
}

