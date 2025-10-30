"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import GuaranteedStepper from '@/src/components/calculator/guaranteedstep/GuaranteedStepper';

export default function GuaranteedCalculatorPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  // Log session for debugging
  React.useEffect(() => {
    if (sessionId) {
      console.log('[GuaranteedCalculator] Started with sessionId:', sessionId);
    }
  }, [sessionId]);

  return <GuaranteedStepper />;
} 