"use client";

import React, { useState } from 'react';
import { useAssistant } from '../../../contexts/AssistantContext';
import LCPStepContainer from './LCPStepContainer';
import { LCPButton, LCPSection, LCPNavigationButton } from './shared';
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
  const { openAssistant } = useAssistant();
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
      {/* Quick Help Badge - Compact Info Style */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1rem'
      }}>
        <button
          style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            border: '1px solid #f59e0b',
            borderRadius: '20px',
            padding: '0.4rem 0.8rem',
            fontSize: '0.75rem',
            fontWeight: '500',
            color: '#92400e',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 3px rgba(245, 158, 11, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            minWidth: 'auto'
          }}
          onClick={openAssistant}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(245, 158, 11, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)';
            e.currentTarget.style.color = '#92400e';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(245, 158, 11, 0.2)';
          }}
        >
          <span style={{ fontSize: '0.7rem' }}>💡</span>
          Quick Help
        </button>
      </div>

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

        <div className={layout.actionRow} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
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