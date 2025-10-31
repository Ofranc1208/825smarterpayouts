"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import LCPStepper from '@/src/components/calculator/lcpstep/LCPStepper';
import { StructuredData } from '@/src/components/SEO/StructuredData';
import { lcpCalculatorSchema, organizationSchema } from '@/src/lib/structured-data/schemas';

export default function LCPCalculatorPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  return (
    <>
      {/* Structured Data for SEO - Google Rating Badge */}
      <StructuredData schema={[lcpCalculatorSchema, organizationSchema]} />
      <LCPStepper />
    </>
  );
} 