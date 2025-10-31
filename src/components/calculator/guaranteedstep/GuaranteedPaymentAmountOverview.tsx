"use client";

import React, { useState } from 'react';
import GuaranteedStepContainer from './GuaranteedStepContainer';
import { GuaranteedSection, GuaranteedFormInput, GuaranteedNavigationButton, GuaranteedInstructionModal, GuaranteedInstructionButton } from './shared';
import { useGuaranteedAssistant } from '../../../contexts/GuaranteedAssistantContext';
import layout from './utils/GuaranteedLayout.module.css';
import { validatePaymentAmount, validateDateRange, sanitizeNumericInput } from './utils/validationHelpers';
import { getMinStartDateString, getMaxStartDateString, getMaxEndDateString } from './utils/dateHelpers';
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
    // Validate immediately if we have both dates
    if (value && endDate) {
      const dateValidation = validateDateRange(value, endDate);
      if (!dateValidation.isValid) {
        setErrors(prev => ({ ...prev, dates: dateValidation.error || '' }));
      } else {
        setErrors(prev => {
          const { dates, ...rest } = prev;
          return rest;
        });
      }
    } else {
      setErrors(prev => {
        const { dates, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    // Validate immediately if we have both dates
    if (startDate && value) {
      const dateValidation = validateDateRange(startDate, value);
      if (!dateValidation.isValid) {
        setErrors(prev => ({ ...prev, dates: dateValidation.error || '' }));
      } else {
        setErrors(prev => {
          const { dates, ...rest } = prev;
          return rest;
        });
      }
    } else {
      setErrors(prev => {
        const { dates, ...rest } = prev;
        return rest;
      });
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

  // Calculate min/max dates for date inputs
  const minStartDateString = getMinStartDateString();
  const maxStartDateString = getMaxStartDateString();
  const maxEndDateString = getMaxEndDateString();

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
        >
          <GuaranteedFormInput
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                min={minStartDateString}
                max={maxStartDateString}
            error={errors.dates}
          />
        </GuaranteedSection>

        <GuaranteedSection
          label="Last Payment Date"
        >
          <GuaranteedFormInput
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                max={maxEndDateString}
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