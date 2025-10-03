/**
 * Structured Settlement Info Hub - App Router Page
 * 
 * This page now uses the modular component from src/components/Pages
 * All logic, styling, and SEO optimization is handled in the component
 */

import { Metadata } from 'next';
import { StructuredSettlementInfoHubPage } from '@/src/components/Pages/StructuredSettlementInfoHub';

export const metadata: Metadata = {
  title: 'Structured Settlement Info Hub | SmarterPayouts',
  description: 'Comprehensive guide to structured settlements: selling, laws by state, lump sum payouts, and tax rules. Learn everything about structured settlements at SmarterPayouts.',
  robots: 'index, follow',
  openGraph: {
    title: 'Structured Settlement Info Hub | SmarterPayouts',
    description: 'Comprehensive guide to structured settlements: selling, laws by state, lump sum payouts, and tax rules.',
    type: 'article',
    url: 'https://smarterpayouts.com/structured-settlement-info-hub',
  },
  alternates: {
    canonical: 'https://smarterpayouts.com/structured-settlement-info-hub',
  },
};

export default function Page() {
  return <StructuredSettlementInfoHubPage />;
}
