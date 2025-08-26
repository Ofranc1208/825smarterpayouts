import React, { Suspense } from 'react';
import LumpSumClientComponent from './LumpSumClientComponent';

// Force dynamic rendering to prevent useSearchParams build errors
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Lump Sum Calculator – Get Your Cash Offer | SmarterPayouts",
  description: "Estimate your lump sum payout for structured settlements instantly. Get a fast, accurate cash offer from SmarterPayouts.",
};

export default function LumpSumCalculatorPageWrapper() {
  return (
    <Suspense fallback={<div>Loading Calculator...</div>}>
      <LumpSumClientComponent />
    </Suspense>
  );
}
