"use client";

import React, { useState } from 'react';
import LCPStepContainer from './LCPStepContainer';
import { validatePaymentAmount, validateDateRange, sanitizeNumericInput } from '../../../../app/utils/validationHelpers';

interface Props {
  initialData?: {
    startDate?: string;
    endDate?: string;
    amount?: string;
  };
  onNext: (data: { startDate: string; endDate: string; amount: string }) => void;
  currentStep: number;
  totalSteps: number;
}

const LCPDatesSelection: React.FC<Props> = ({ initialData, onNext, currentStep, totalSteps }) => {
  const [startDate, setStartDate] = useState(initialData?.startDate || '');
  const [endDate, setEndDate] = useState(initialData?.endDate || '');
  const [amount, setAmount] = useState(initialData?.amount || '');
  const [touched, setTouched] = useState(false);

  // Update state when initialData changes (for edit functionality)
  React.useEffect(() => {
    if (initialData?.startDate) setStartDate(initialData.startDate);
    if (initialData?.endDate) setEndDate(initialData.endDate);
    if (initialData?.amount) setAmount(initialData.amount);
  }, [initialData]);
  const [showStartTooltip, setShowStartTooltip] = useState(false);
  const [showEndTooltip, setShowEndTooltip] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    amount?: string;
    dates?: string;
  }>({});

  // Enhanced validation logic - separate validation check from state update
  const checkFormValidity = () => {
    // Validate payment amount
    const amountValidation = validatePaymentAmount(amount);
    if (!amountValidation.isValid) {
      return false;
    }

    // Validate date range
    const dateValidation = validateDateRange(startDate, endDate);
    if (!dateValidation.isValid) {
      return false;
    }

    return true;
  };

  const validateAndSetErrors = () => {
    const errors: { amount?: string; dates?: string } = {};

    // Validate payment amount
    const amountValidation = validatePaymentAmount(amount);
    if (!amountValidation.isValid) {
      errors.amount = amountValidation.error;
    }

    // Validate date range
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

  // Date validation helper
  const isValidDateRange = startDate && endDate && new Date(startDate) < new Date(endDate);

  return (
    <LCPStepContainer title="Select Dates for Payout Offer" currentStep={currentStep} totalSteps={totalSteps}>
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          marginBottom: '0.5rem',
          position: 'relative'
        }}>
          <label style={{
            fontSize: '0.83rem',
            fontWeight: '700',
            textAlign: 'center',
            margin: '1rem 0 0.5rem 0'
          }}>What's the amount of payments you're going to exchange for a lump sum?</label>
          <input
            style={{
              padding: '0.45rem 1.1rem',
              border: validationErrors.amount 
                ? '1.5px solid #dc3545' 
                : (amount && validatePaymentAmount(amount).isValid)
                  ? '1.5px solid #22c55e'
                  : '1.5px solid #d1d5db',
              borderRadius: '10px',
              fontSize: '0.98rem',
              background: '#f9fafb',
              width: '100%',
              maxWidth: '220px',
              margin: '0 auto',
              textAlign: 'center',
              boxShadow: validationErrors.amount 
                ? '0 0 0 2px rgba(220, 53, 69, 0.15)' 
                : (amount && validatePaymentAmount(amount).isValid)
                  ? '0 0 0 2px rgba(34, 197, 94, 0.1)'
                  : 'none'
            }}
            type="text"
            value={amount}
            onChange={(e) => {
              const sanitized = sanitizeNumericInput(e.target.value);
              setAmount(sanitized);
              // Clear error when user starts typing
              if (validationErrors.amount) {
                setValidationErrors(prev => ({ ...prev, amount: undefined }));
              }
            }}
            placeholder="Enter amount (min $100)"
            onFocus={(e) => {
              if (!validationErrors.amount) {
                e.currentTarget.style.borderColor = '#22c55e';
                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.1)';
              }
            }}
            onBlur={(e) => {
              setTouched(true);
              if (!validationErrors.amount) {
                if (amount && validatePaymentAmount(amount).isValid) {
                  e.currentTarget.style.borderColor = '#22c55e';
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.1)';
                } else {
                  e.currentTarget.style.borderColor = '#d1d5db';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }
            }}
          />
          {validationErrors.amount && (
            <div style={{
              color: '#dc3545',
              fontSize: '0.8rem',
              marginTop: '0.25rem',
              textAlign: 'center',
              fontWeight: '500'
            }}>{validationErrors.amount}</div>
          )}
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          marginBottom: '0.5rem',
          position: 'relative'
        }}>
          <label style={{
            fontSize: '0.83rem',
            fontWeight: '700',
            textAlign: 'center',
            margin: '1rem 0 0.5rem 0'
          }}>
            Start Date
            <span 
              style={{
                display: 'inline-block',
                width: '18px',
                height: '18px',
                background: '#22c55e',
                color: 'white',
                borderRadius: '50%',
                textAlign: 'center',
                lineHeight: '18px',
                fontSize: '12px',
                fontWeight: 'bold',
                marginLeft: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                userSelect: 'none'
              }}
              onClick={() => setShowStartTooltip(!showStartTooltip)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#16a34a';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#22c55e';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ?
            </span>
          </label>
          {showStartTooltip && (
            <div style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'white',
              color: '#333',
              padding: '0',
              borderRadius: '12px',
              fontSize: '0.85rem',
              lineHeight: '1.4',
              maxWidth: '300px',
              zIndex: 1000,
              marginBottom: '8px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)',
              border: '1px solid #e5e7eb',
              animation: 'tooltipFadeIn 0.2s ease-out',
              cursor: 'pointer'
            }} onClick={() => setShowStartTooltip(false)}>
              <div style={{
                padding: '16px 20px',
                position: 'relative'
              }}>
                First payment date you want to trade for a lump sum.
              </div>
            </div>
          )}
          <input
            style={{
              padding: '0.45rem 1.1rem',
              border: validationErrors.dates ? '1.5px solid #dc3545' : '1.5px solid #d1d5db',
              borderRadius: '10px',
              fontSize: '0.98rem',
              background: '#f9fafb',
              width: '100%',
              maxWidth: '220px',
              margin: '0 auto',
              textAlign: 'center',
              boxShadow: validationErrors.dates ? '0 0 0 2px rgba(220, 53, 69, 0.15)' : 'none'
            }}
            type="date"
            value={startDate}
            onChange={e => {
              setStartDate(e.target.value);
              // Clear date error when user changes dates
              if (validationErrors.dates) {
                setValidationErrors(prev => ({ ...prev, dates: undefined }));
              }
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          marginBottom: '0.5rem',
          position: 'relative'
        }}>
          <label style={{
            fontSize: '0.83rem',
            fontWeight: '700',
            textAlign: 'center',
            margin: '1rem 0 0.5rem 0'
          }}>
            End Date
            <span 
              style={{
                display: 'inline-block',
                width: '18px',
                height: '18px',
                background: '#22c55e',
                color: 'white',
                borderRadius: '50%',
                textAlign: 'center',
                lineHeight: '18px',
                fontSize: '12px',
                fontWeight: 'bold',
                marginLeft: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                userSelect: 'none'
              }}
              onClick={() => setShowEndTooltip(!showEndTooltip)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#16a34a';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#22c55e';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ?
            </span>
          </label>
          {showEndTooltip && (
            <div style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'white',
              color: '#333',
              padding: '0',
              borderRadius: '12px',
              fontSize: '0.85rem',
              lineHeight: '1.4',
              maxWidth: '300px',
              zIndex: 1000,
              marginBottom: '8px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)',
              border: '1px solid #e5e7eb',
              animation: 'tooltipFadeIn 0.2s ease-out',
              cursor: 'pointer'
            }} onClick={() => setShowEndTooltip(false)}>
              <div style={{
                padding: '16px 20px',
                position: 'relative'
              }}>
                The last payment you want to exchange for a lump sum. After this date, your regular payments will resume back to you.
              </div>
            </div>
          )}
          <input
            style={{
              padding: '0.45rem 1.1rem',
              border: validationErrors.dates ? '1.5px solid #dc3545' : '1.5px solid #d1d5db',
              borderRadius: '10px',
              fontSize: '0.98rem',
              background: '#f9fafb',
              width: '100%',
              maxWidth: '220px',
              margin: '0 auto',
              textAlign: 'center',
              boxShadow: validationErrors.dates ? '0 0 0 2px rgba(220, 53, 69, 0.15)' : 'none'
            }}
            type="date"
            value={endDate}
            onChange={e => {
              setEndDate(e.target.value);
              // Clear date error when user changes dates
              if (validationErrors.dates) {
                setValidationErrors(prev => ({ ...prev, dates: undefined }));
              }
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1rem',
          padding: '0.5rem 0'
        }}>
          <button
            style={!isValid ? {
              background: '#bbf7d0',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '3rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              cursor: 'not-allowed',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
              fontWeight: '600'
            } : {
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '3rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
              fontWeight: '600'
            }}
            type="submit"
            disabled={!isValid}
            aria-label="Next"
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.background = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(34, 197, 94, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
              }
            }}
            onMouseDown={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
              }
            }}
          >
            <span style={{
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>&#8594;</span>
          </button>
        </div>
        {touched && validationErrors.dates && (
          <div style={{
            color: '#dc3545',
            fontSize: '0.8rem',
            marginTop: '0.25rem',
            textAlign: 'center',
            fontWeight: '500'
          }}>{validationErrors.dates}</div>
        )}
      </form>
    </LCPStepContainer>
  );
};

export default LCPDatesSelection; 