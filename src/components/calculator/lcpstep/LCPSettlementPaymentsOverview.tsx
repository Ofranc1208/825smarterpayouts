"use client";

import React, { useState } from 'react';
import LCPStepContainer from './LCPStepContainer';
import { LCPButton, LCPSection, LCPNavigationButton, QuickHelpBadge } from './shared';
import layout from './utils/LCPLayout.module.css';

const FREQUENCIES = ['Monthly', 'Quarterly', 'Semi', 'Lump Sum'];
const INCREASES = [0, 1, 2, 3, 4, 5, 6];

interface Props {
  initialData?: {
    paymentMode?: string;
    annualIncrease?: number;
  };
  onNext: (data: { paymentMode: string; annualIncrease: number }) => void;
  currentStep: number;
  totalSteps: number;
}

const LCPSettlementPaymentsOverview: React.FC<Props> = ({ initialData, onNext, currentStep, totalSteps }) => {
  const [paymentMode, setPaymentMode] = useState(initialData?.paymentMode || 'Monthly');
  const [annualIncrease, setAnnualIncrease] = useState<number>(
    initialData?.annualIncrease ?? 0
  );

  // Update state when initialData changes (for edit functionality)
  React.useEffect(() => {
    if (initialData?.paymentMode) setPaymentMode(initialData.paymentMode);
    if (initialData?.annualIncrease !== undefined) setAnnualIncrease(initialData.annualIncrease);
  }, [initialData]);

  const isValid = paymentMode;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onNext({ paymentMode, annualIncrease });
    }
  };

  return (
    <LCPStepContainer title="Settlement Payments Overview" currentStep={currentStep} totalSteps={totalSteps}>
      <QuickHelpBadge />

      <form onSubmit={handleSubmit}>
        <LCPSection label="How often do you receive your payments?">
          {FREQUENCIES.map((freq) => (
            <LCPButton
              key={freq}
              variant="option"
              selected={paymentMode === freq}
              onClick={() => setPaymentMode(freq)}
            >
              {freq}
            </LCPButton>
          ))}
        </LCPSection>

        <LCPSection label="Do your payments increase yearly?">
          {INCREASES.map((inc) => (
            <LCPButton
              key={inc}
              variant="option"
              selected={annualIncrease === inc}
              onClick={() => setAnnualIncrease(inc)}
            >
              {inc}
            </LCPButton>
          ))}
        </LCPSection>

        <div className={layout.actionRow}>
          <LCPNavigationButton
            direction="back"
            disabled={true}
            type="button"
            aria-label="Back to previous step"
          />
          <LCPNavigationButton
            direction="next"
            disabled={!isValid}
            type="submit"
            aria-label="Continue to next step"
          />
        </div>
      </form>
    </LCPStepContainer>
  );
};

export default LCPSettlementPaymentsOverview; 