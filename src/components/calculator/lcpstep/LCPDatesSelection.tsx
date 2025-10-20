"use client";

import React, { useState } from 'react';
import LCPStepContainer from './LCPStepContainer';
import { LCPButton, LCPSection, LCPFormInput, LCPNavigationButton, QuickHelpBadge } from './shared';
import { validatePaymentAmount, validateDateRange, sanitizeNumericInput } from './utils/validationHelpers';
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
  const [showInstructions, setShowInstructions] = useState(false);
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
    <LCPStepContainer title="Select Payment Date and Amount to be Exchanged for an Early Payout" currentStep={currentStep} totalSteps={totalSteps}>
      {/* Help and Instructions - Both on same line */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <QuickHelpBadge />
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
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(59, 130, 246, 0.2)';
          }}
        >
          <span style={{ fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📋</span>
          Instructions
        </button>
      </div>

      {/* Instructions Modal */}
      {showInstructions && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={() => setShowInstructions(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              maxWidth: '500px',
              width: '100%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#0369a1', fontSize: '1.25rem', fontWeight: '600' }}>
                📋 Page Instructions
              </h3>
              <button
                onClick={() => setShowInstructions(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6b7280',
                  padding: '0',
                  lineHeight: '1'
                }}
              >
                ×
              </button>
            </div>
            <div style={{ color: '#374151', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '1rem', fontWeight: '500' }}>What you need to do:</p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Enter the <strong>payment amount</strong> of your future structured settlement payments that you want to exchange for a lump sum</li>
                <li style={{ marginBottom: '0.5rem' }}>Select the <strong>first payment date</strong> - when would you like to start exchanging your future payments for a lump sum? (Must be at least 3 months in the future)</li>
                <li style={{ marginBottom: '0.5rem' }}>Select the <strong>last payment date</strong> - when would you like to stop exchanging payments? (After this date, your regular payments resume)</li>
                <li style={{ marginBottom: '0.5rem' }}>Click "Continue" to proceed to the next step</li>
              </ul>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                💡 <em>Important: The first payment date must be at least 3 months in the future to allow proper processing time. These dates define the specific payment period you want to exchange for an immediate lump sum payout.</em>
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <LCPSection
          label="Payment Amount"
          tooltip="Enter the amount of your future structured settlement payments that you would like to exchange for a lump sum. For example, if your monthly payments are $1,250, enter $1,250. This is the payment amount you want to convert into immediate cash today."
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
          tooltip="When would you like to start exchanging your future payments for a lump sum? Select the date of the first payment you want to exchange. For example, if you want to start exchanging payments beginning March 1st, 2025, select 03/01/2025. Important: This date must be at least 3 months in the future from today to allow proper processing time."
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
          tooltip="When would you like to stop exchanging your future payments? Select the date of the last payment you want to exchange for a lump sum. For example, if you want to exchange payments through December 31st, 2030, select 12/31/2030. All payments up to and including this date will be converted to a lump sum. After this date, your regular structured settlement payments will continue as scheduled."
        >
          <LCPFormInput
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            error={validationErrors.dates}
          />
        </LCPSection>

        <div className={layout.actionRow}>
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