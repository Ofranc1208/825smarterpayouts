"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import LCPStepper from '@/src/components/calculator/lcpstep/LCPStepper';

export default function LCPCalculatorPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  // Log session for debugging
  React.useEffect(() => {
    if (sessionId) {
      console.log('[LCPCalculator] Started with sessionId:', sessionId);
    }
  }, [sessionId]);

  return <LCPStepper />;
} 