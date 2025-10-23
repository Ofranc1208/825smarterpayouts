import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { StructuredData } from '@/src/components/SEO/StructuredData';
import { lumpSumCalculatorSchema, organizationSchema } from '@/src/lib/structured-data/schemas';

// Dynamically import the client component to avoid SSR issues with useSearchParams
const LumpSumClientComponent = dynamic(() => import('./LumpSumClientComponent'), {
  ssr: false,
  loading: () => <div className="container py-5 text-center">Loading Calculator...</div>
});

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
      
      <LumpSumClientComponent />
    </>
  );
}
