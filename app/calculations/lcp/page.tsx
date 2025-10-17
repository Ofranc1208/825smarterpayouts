"use client";

import React from 'react';
import LCPStepper from '../../../src/components/calculator/lcpstep/LCPStepper';

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

const LCPCalculatorPage: React.FC = () => {
  return <LCPStepper />;
};

export default LCPCalculatorPage; 