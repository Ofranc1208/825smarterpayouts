"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import GuaranteedStepper from '@/src/components/calculator/guaranteedstep/GuaranteedStepper';
import { StructuredData } from '@/src/components/SEO/StructuredData';
import { guaranteedCalculatorSchema, organizationSchema } from '@/src/lib/structured-data/schemas';

export default function GuaranteedCalculatorPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  return (
    <>
      {/* Structured Data for SEO - Google Rating Badge */}
      <StructuredData schema={[guaranteedCalculatorSchema, organizationSchema]} />
      <GuaranteedStepper />
    </>
  );
} 