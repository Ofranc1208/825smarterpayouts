"use client";

import React, { useState } from 'react';
import GuaranteedStepContainer from './GuaranteedStepContainer';
import { GuaranteedButton, GuaranteedSection, GuaranteedNavigationButton, GuaranteedInstructionModal } from './shared';
import { useGuaranteedAssistant } from '../../../contexts/GuaranteedAssistantContext';
import { GuaranteedFormData } from './utils/guaranteedTypes';
import styles from './GuaranteedPaymentOverview.module.css';

interface GuaranteedPaymentOverviewProps {
  onNext: (data: { paymentMode: string; annualIncrease: number }) => void;
  currentStep: number;
  totalSteps: number;
  initialData?: GuaranteedFormData;
}

const GuaranteedPaymentOverview: React.FC<GuaranteedPaymentOverviewProps> = ({ onNext, currentStep, totalSteps, initialData }) => {
  const { openAssistant } = useGuaranteedAssistant();
  const [paymentMode, setPaymentMode] = useState<'Monthly' | 'Quarterly' | 'Semiannually' | 'Annually' | 'Lump Sum'>(initialData?.paymentMode || 'Monthly');
  const [annualIncrease, setAnnualIncrease] = useState<number>(initialData?.annualIncrease ?? 0);
  const [showInstructions, setShowInstructions] = useState(false);

  const FREQUENCIES = ['Monthly', 'Quarterly', 'Semiannually', 'Annually', 'Lump Sum'];
  const INCREASES = [0, 1, 2, 3, 4, 5, 6];

  const isValid = paymentMode;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onNext({ paymentMode, annualIncrease });
    }
  };

  return (
    <GuaranteedStepContainer title="Settlement Payment Overview" currentStep={currentStep} totalSteps={totalSteps}>
      {/* Help and Instructions - Both on same line like LCP */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <button
          type="button"
          style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            border: '1px solid #f59e0b',
            borderRadius: '20px',
            padding: '0.3rem 0.7rem',
            fontSize: '0.7rem',
            fontWeight: '500',
            color: '#92400e',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 3px rgba(245, 158, 11, 0.2)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            userSelect: 'none',
            fontFamily: 'inherit'
          }}
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
          onClick={openAssistant}
        >
          <span style={{ fontSize: '0.65rem' }}>💡</span>
          Quick AI Help
        </button>
        <button
          type="button"
          onClick={() => setShowInstructions(true)}
          style={{
            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
            border: '1px solid #3b82f6',
            borderRadius: '20px',
            padding: '0.3rem 0.7rem',
            fontSize: '0.7rem',
            fontWeight: '500',
            color: '#1e3a8a',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 3px rgba(59, 130, 246, 0.2)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            userSelect: 'none',
            fontFamily: 'inherit'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(59, 130, 246, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)';
            e.currentTarget.style.color = '#1e3a8a';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(59, 130, 246, 0.2)';
          }}
        >
          Instructions
        </button>
      </div>

      {/* Instructions Modal */}
      <GuaranteedInstructionModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      >
        <p className={styles.instructionDescription}>What you need to do:</p>
        <ul className={styles.instructionsList}>
          <li className={styles.instructionsListItem}>Select how often you currently receive your guaranteed payments</li>
          <li className={styles.instructionsListItem}>Indicate if your payments increase yearly and by what percentage</li>
          <li className={styles.instructionsListItem}>Click "Continue" to proceed to the next step</li>
        </ul>
        <p className={styles.instructionsTip}>
          💡 <em>Your current payment structure helps us calculate the most accurate payout value for your remaining payments.</em>
        </p>
      </GuaranteedInstructionModal>

      <form onSubmit={handleSubmit}>
        <GuaranteedSection label="How often do you receive your payments?">
          {FREQUENCIES.map((freq) => (
            <GuaranteedButton
              key={freq}
              variant="option"
              selected={paymentMode === freq}
              onClick={() => setPaymentMode(freq as typeof paymentMode)}
            >
              {freq}
            </GuaranteedButton>
          ))}
        </GuaranteedSection>

        <GuaranteedSection label="Do your payments increase yearly?">
          {INCREASES.map((inc) => (
            <GuaranteedButton
              key={inc}
              variant="option"
              selected={annualIncrease === inc}
              onClick={() => setAnnualIncrease(inc)}
            >
              {inc}
            </GuaranteedButton>
          ))}
        </GuaranteedSection>

        <div className={styles.navigationSection}>
          <GuaranteedNavigationButton
            direction="next"
            disabled={!isValid}
            type="submit"
            aria-label="Continue to next step"
          />
        </div>
      </form>
    </GuaranteedStepContainer>
  );
};

export default GuaranteedPaymentOverview; 