"use client";

import React from 'react';
import { StepperContent } from '../../../src/components/calculator/lcpstep/stepper';

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

const LCPCalculatorPage: React.FC = () => {
  return <StepperContent />;
};

export default LCPCalculatorPage; 