"use client";

import React, { useState } from 'react';
import GuaranteedStepContainer from './GuaranteedStepContainer';
import { GuaranteedButton, GuaranteedSection, GuaranteedNavigationButton, GuaranteedInstructionModal, GuaranteedInstructionButton } from './shared';
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
      {/* Instructions Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
        <GuaranteedInstructionButton onClick={() => setShowInstructions(true)} />
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
              {freq === 'Semiannually' ? 'Semi' : freq}
            </GuaranteedButton>
          ))}
        </GuaranteedSection>

        <GuaranteedSection label="Do your payments increase yearly?">
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.86rem',
            justifyContent: 'center',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            {/* First row: 0, 1, 2, 3 */}
            {INCREASES.slice(0, 4).map((inc) => (
              <GuaranteedButton
                key={inc}
                variant="option"
                selected={annualIncrease === inc}
                onClick={() => setAnnualIncrease(inc)}
              >
                {inc}
              </GuaranteedButton>
            ))}
            {/* Second row: 4, 5, 6 centered */}
            <div style={{ gridColumn: '1 / 5', display: 'flex', gap: '0.86rem', justifyContent: 'center' }}>
              {INCREASES.slice(4).map((inc) => (
                <GuaranteedButton
                  key={inc}
                  variant="option"
                  selected={annualIncrease === inc}
                  onClick={() => setAnnualIncrease(inc)}
                >
                  {inc}
                </GuaranteedButton>
              ))}
            </div>
          </div>
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