"use client";

import React from 'react';
import GuaranteedStepper from '../../../src/components/calculator/guaranteedstep/GuaranteedStepper';

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

const GuaranteedCalculatorPage: React.FC = () => {
  return <GuaranteedStepper />;
};

export default GuaranteedCalculatorPage; 