import React, { Suspense } from 'react';
import LumpSumClientComponent from './LumpSumClientComponent';
import { StructuredData } from '@/src/components/SEO/StructuredData';
import { lumpSumCalculatorSchema, organizationSchema } from '@/src/lib/structured-data/schemas';

// Force dynamic rendering to prevent useSearchParams build errors
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Lump Sum Calculator – Get Your Cash Offer | SmarterPayouts",
  description: "Estimate your lump sum payout for structured settlements instantly. Get a fast, accurate cash offer from SmarterPayouts.",
  alternates: {
    canonical: 'https://smarterpayouts.com/lump-sum-calculator',
  }
};

export default function LumpSumCalculatorPageWrapper() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData schema={[lumpSumCalculatorSchema, organizationSchema]} />
      
      <Suspense fallback={<div>Loading Calculator...</div>}>
        <LumpSumClientComponent />
      </Suspense>
    </>
  );
}
