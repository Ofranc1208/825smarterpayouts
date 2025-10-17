"use client";

import React, { useState } from 'react';
import LCPStepContainer from './LCPStepContainer';
import { LCPButton, LCPSection, LCPFormInput, LCPNavigationButton } from './shared';
import { validatePaymentAmount, validateDateRange, sanitizeNumericInput } from '../../../../app/utils/validationHelpers';
import layout from './utils/LCPLayout.module.css';
import utilities from './utils/LCPUtilities.module.css';

interface Props {
  initialData?: {
    startDate?: string;
    endDate?: string;
    amount?: string;
  };
  onNext: (data: { startDate: string; endDate: string; amount: string }) => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
}

const LCPDatesSelection: React.FC<Props> = ({ initialData, onNext, onBack, currentStep, totalSteps }) => {
  const [startDate, setStartDate] = useState(initialData?.startDate || '');
  const [endDate, setEndDate] = useState(initialData?.endDate || '');
  const [amount, setAmount] = useState(initialData?.amount || '');
  const [touched, setTouched] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    amount?: string;
    dates?: string;
  }>({});

  // Update state when initialData changes (for edit functionality)
  React.useEffect(() => {
    if (initialData?.startDate) setStartDate(initialData.startDate);
    if (initialData?.endDate) setEndDate(initialData.endDate);
    if (initialData?.amount) setAmount(initialData.amount);
  }, [initialData]);

  // Enhanced validation logic
  const checkFormValidity = () => {
    const amountValidation = validatePaymentAmount(amount);
    if (!amountValidation.isValid) return false;

    const dateValidation = validateDateRange(startDate, endDate);
    if (!dateValidation.isValid) return false;

    return true;
  };

  const validateAndSetErrors = () => {
    const errors: { amount?: string; dates?: string } = {};

    const amountValidation = validatePaymentAmount(amount);
    if (!amountValidation.isValid) {
      errors.amount = amountValidation.error;
    }

    const dateValidation = validateDateRange(startDate, endDate);
    if (!dateValidation.isValid) {
      errors.dates = dateValidation.error;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = checkFormValidity();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (validateAndSetErrors()) {
      onNext({ startDate, endDate, amount });
    }
  };

  // Handle amount input with sanitization
  const handleAmountChange = (value: string) => {
    const sanitized = sanitizeNumericInput(value);
    setAmount(sanitized);
    if (validationErrors.amount) {
      setValidationErrors(prev => ({ ...prev, amount: undefined }));
    }
  };

  // Handle date changes with immediate validation
  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    // Validate immediately if we have both dates
    if (value && endDate) {
      const dateValidation = validateDateRange(value, endDate);
      if (!dateValidation.isValid) {
        setValidationErrors(prev => ({ ...prev, dates: dateValidation.error }));
      } else {
        setValidationErrors(prev => ({ ...prev, dates: undefined }));
      }
    } else {
      setValidationErrors(prev => ({ ...prev, dates: undefined }));
    }
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    // Validate immediately if we have both dates
    if (startDate && value) {
      const dateValidation = validateDateRange(startDate, value);
      if (!dateValidation.isValid) {
        setValidationErrors(prev => ({ ...prev, dates: dateValidation.error }));
      } else {
        setValidationErrors(prev => ({ ...prev, dates: undefined }));
      }
    } else {
      setValidationErrors(prev => ({ ...prev, dates: undefined }));
    }
  };

  return (
    <LCPStepContainer title="Select Payment Dates to Exchange for an Early Payout Option" currentStep={currentStep} totalSteps={totalSteps}>
      <form onSubmit={handleSubmit}>
        <LCPSection 
          label="Payment Amount"
          tooltip="Enter the dollar amount of each structured settlement payment you want to exchange for an early payout."
        >
          <LCPFormInput
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="$ 0.00"
            error={validationErrors.amount}
            isValid={amount ? validatePaymentAmount(amount).isValid : undefined}
          />
        </LCPSection>

        <LCPSection
          label="First Payment Date"
          tooltip="The first payment date you want to exchange for an early payout option."
        >
          <LCPFormInput
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            error={validationErrors.dates}
          />
        </LCPSection>

        <LCPSection
          label="Last Payment Date"
          tooltip="The last payment you want to exchange for an early payout option. After this date, your regular payments resume."
        >
          <LCPFormInput
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            error={validationErrors.dates}
          />
        </LCPSection>

        <div className={layout.actionRow} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
          <LCPNavigationButton
            direction="back"
            disabled={!onBack}
            onClick={onBack}
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

        {touched && validationErrors.dates && (
          <p className={utilities.error} style={{ textAlign: 'center' }}>
            {validationErrors.dates}
          </p>
        )}
      </form>
    </LCPStepContainer>
  );
};

export default LCPDatesSelection; 