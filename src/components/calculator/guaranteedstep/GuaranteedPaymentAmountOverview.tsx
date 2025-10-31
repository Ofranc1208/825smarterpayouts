"use client";

import React, { useState, useRef } from 'react';
import GuaranteedStepContainer from './GuaranteedStepContainer';
import { GuaranteedSection, GuaranteedFormInput, GuaranteedNavigationButton, GuaranteedInstructionModal, GuaranteedInstructionButton } from './shared';
import { useGuaranteedAssistant } from '../../../contexts/GuaranteedAssistantContext';
import layout from './utils/GuaranteedLayout.module.css';
import { validatePaymentAmount, validateDateRange, sanitizeNumericInput } from './utils/validationHelpers';
import { GuaranteedFormData } from './utils/guaranteedTypes';
import styles from './GuaranteedPaymentAmountOverview.module.css';

interface GuaranteedPaymentAmountOverviewProps {
  onNext: (data: { paymentAmount: string; startDate: string; endDate: string }) => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
  initialData?: GuaranteedFormData;
}

const GuaranteedPaymentAmountOverview: React.FC<GuaranteedPaymentAmountOverviewProps> = ({ onNext, onBack, currentStep, totalSteps, initialData }) => {
  const { openAssistant } = useGuaranteedAssistant();
  const [paymentAmount, setPaymentAmount] = useState<string>(initialData?.paymentAmount?.toString() || '');
  const [startDate, setStartDate] = useState<string>(initialData?.startDate || '');
  const [endDate, setEndDate] = useState<string>(initialData?.endDate || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showInstructions, setShowInstructions] = useState(false);
  const [showStartTooltip, setShowStartTooltip] = useState(false);
  const [showEndTooltip, setShowEndTooltip] = useState(false);

  const amountInputRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const checkFormValidity = () => {
    // Enhanced payment amount validation
    const amountValidation = validatePaymentAmount(paymentAmount);
    if (!amountValidation.isValid) {
      return false;
    }

    // Enhanced date range validation
    const dateValidation = validateDateRange(startDate, endDate);
    if (!dateValidation.isValid) {
      return false;
    }

    return true;
  };

  const validateAndSetErrors = () => {
    const newErrors: { [key: string]: string } = {};

    // Enhanced payment amount validation
    const amountValidation = validatePaymentAmount(paymentAmount);
    if (!amountValidation.isValid) {
      newErrors.paymentAmount = amountValidation.error || 'Invalid payment amount';
    }

    // Enhanced date range validation
    const dateValidation = validateDateRange(startDate, endDate);
    if (!dateValidation.isValid) {
      newErrors.dates = dateValidation.error || 'Invalid date range';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAmountChange = (value: string) => {
    const sanitized = sanitizeNumericInput(value);
    setPaymentAmount(sanitized);
    
    // Validate immediately and show error if invalid
    if (sanitized) {
      const amountValidation = validatePaymentAmount(sanitized);
      if (!amountValidation.isValid) {
        setErrors(prev => ({ ...prev, paymentAmount: amountValidation.error || '' }));
      } else {
        setErrors(prev => ({ ...prev, paymentAmount: '' }));
      }
    } else {
      // Clear error if field is empty
      setErrors(prev => ({ ...prev, paymentAmount: '' }));
    }
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    if (errors.startDate || errors.dates) {
      setErrors(prev => ({ ...prev, startDate: '', dates: '' }));
    }
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    if (errors.endDate || errors.dates) {
      setErrors(prev => ({ ...prev, endDate: '', dates: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAndSetErrors()) {
    onNext({
      paymentAmount: paymentAmount.trim(),
      startDate,
      endDate
    });
    }
  };

  const isValid = checkFormValidity();
  const touched = true;

  return (
    <GuaranteedStepContainer title="Select Payment Date and Amount to be Exchanged for an Early Payout" currentStep={currentStep} totalSteps={totalSteps}>
      {/* Instructions Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
        <GuaranteedInstructionButton onClick={() => setShowInstructions(true)} />
      </div>

      {/* Instructions Modal */}
      <GuaranteedInstructionModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      >
        <p className={styles.instructionsDescription}>What you need to do:</p>
        <ul className={styles.instructionsList}>
          <li className={styles.instructionsListItem}>Enter the <strong>payment amount</strong> - This is the amount of each guaranteed payment you want to exchange for a lump sum</li>
          <li className={styles.instructionsListItem}>Select the <strong>start date</strong> - When do you want your guaranteed payments to begin?</li>
          <li className={styles.instructionsListItem}>Select the <strong>end date</strong> - When do you want your guaranteed payments to end?</li>
          <li className={styles.instructionsListItem}>Click "Continue" to proceed to the next step</li>
        </ul>
        <p className={styles.instructionsTip}>
          💡 <em>These dates define the specific guaranteed payment period you want to exchange for an immediate lump sum payout. All guaranteed payments between these dates will be included in your calculation.</em>
        </p>
      </GuaranteedInstructionModal>

      <form onSubmit={handleSubmit}>
        <GuaranteedSection
          label="Payment Amount"
          tooltip="Enter the amount of your future structured settlement payments that you want to exchange for a lump sum. For example, if your monthly payments are $1,250, enter $1,250. This is the payment amount you want to convert into immediate cash today."
        >
          <GuaranteedFormInput
              type="text"
              value={paymentAmount}
              onChange={handleAmountChange}
            placeholder="$ 0.00"
            error={errors.paymentAmount}
            isValid={paymentAmount ? validatePaymentAmount(paymentAmount).isValid : undefined}
          />
        </GuaranteedSection>

        <GuaranteedSection
          label="First Payment Date"
          tooltip="When would you like to start exchanging your future payments for a lump sum? Select the date of the first payment you want to exchange. For example, if you want to start exchanging payments beginning March 1st, 2025, select 03/01/2025. Important: This date must be at least 3 months in the future from today to allow proper processing time."
        >
          <GuaranteedFormInput
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
            error={errors.dates}
          />
        </GuaranteedSection>

        <GuaranteedSection
          label="Last Payment Date"
          tooltip="When would you like to stop exchanging your future payments? Select the date of the last payment you want to exchange for a lump sum. For example, if you want to exchange payments through December 31st, 2030, select 12/31/2030. All payments up to and including this date will be converted to a lump sum. After this date, your regular structured settlement payments will continue as scheduled."
        >
          <GuaranteedFormInput
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
            error={errors.dates}
          />
        </GuaranteedSection>

        <div className={layout.actionRow}>
          {onBack && (
            <GuaranteedNavigationButton
              direction="back"
              onClick={onBack}
              type="button"
              aria-label="Back to previous step"
            />
          )}
          <GuaranteedNavigationButton
            direction="next"
            disabled={!isValid}
            type="submit"
            aria-label="Continue to next step"
          />
        </div>

        {touched && errors.dates && (
          <p style={{ textAlign: 'center', color: '#dc2626', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            {errors.dates}
          </p>
        )}
      </form>
    </GuaranteedStepContainer>
  );
};

export default GuaranteedPaymentAmountOverview; 