/**
 * Structured Settlement Info Hub - App Router Page
 * 
 * This page now uses the modular component from src/components/Pages
 * All logic, styling, and SEO optimization is handled in the component
 */

import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { StructuredSettlementInfoHubPage } from '@/src/components/Pages/StructuredSettlementInfoHub';
import { generateMetadata } from '@/lib/seo/metadata';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export const metadata: Metadata = generateMetadata({
  title: 'Structured Settlement Info Hub',
  description: 'Comprehensive guide to structured settlements: selling, laws by state, lump sum payouts, and tax rules. Learn everything about structured settlements at Smarter Payouts.',
  path: '/structured-settlement-info-hub',
  ogType: 'article',
});

export default function Page() {
  return (
    <>
      <StructuredSettlementInfoHubPage />
      <LazyFABSpeedDial />
    </>
  );
}
