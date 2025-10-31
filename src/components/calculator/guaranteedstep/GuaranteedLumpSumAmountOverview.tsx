"use client";

import React, { useState } from 'react';
import GuaranteedStepContainer from './GuaranteedStepContainer';
import { GuaranteedNavigationButton } from './shared';
import { GuaranteedNumberOfPaymentsInput, GuaranteedPaymentCard } from './lump-sum-components';
import { RATE_SPREADS, AMOUNT_ADJUSTMENTS, BASE_DISCOUNT_RATE } from '../../../../app/utils/npvConfig';
import { GuaranteedFormData, LumpSumPayment } from './utils/guaranteedTypes';
import { validateLumpSumDate } from './utils/validationHelpers';
import { safeStringify } from './utils/typeUtils';
import layout from './utils/GuaranteedLayout.module.css';
import styles from './GuaranteedLumpSumAmountOverview.module.css';

interface GuaranteedLumpSumAmountOverviewProps {
  onNext: (data: { payments: LumpSumPayment[] }) => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
  initialData?: GuaranteedFormData;
}

const GuaranteedLumpSumAmountOverview: React.FC<GuaranteedLumpSumAmountOverviewProps> = ({
  onNext,
  onBack,
  currentStep,
  totalSteps,
  initialData
}) => {
  const [numberOfPayments, setNumberOfPayments] = useState<number | ''>('');
  const [payments, setPayments] = useState<LumpSumPayment[]>(initialData?.payments && initialData.payments.length > 0 ? initialData.payments : [{ amount: '', lumpSumDate: '' }]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Initialize numberOfPayments from existing data when editing
  React.useEffect(() => {
    if (initialData?.payments && initialData.payments.length > 0) {
      setNumberOfPayments(initialData.payments.length);
    }
  }, [initialData]);

  // Update payments array when numberOfPayments changes
  React.useEffect(() => {
    if (typeof numberOfPayments === 'number' && numberOfPayments > 0) {
      const currentPayments = payments;
      const newPayments: LumpSumPayment[] = [];
      for (let i = 0; i < numberOfPayments; i++) {
        newPayments.push(currentPayments[i] || { amount: '', lumpSumDate: '' });
      }
      setPayments(newPayments);
    }
  }, [numberOfPayments]);

  const handlePaymentChange = (index: number, field: 'amount' | 'lumpSumDate', value: string) => {
    const updatedPayments = [...payments];
    
    if (field === 'amount') {
      // Filter and format amount input
      const filteredValue = value
        .replace(/[^\d.]/g, '')
        .replace(/^(\d*\.\d{0,2}).*$/, '$1');
      updatedPayments[index].amount = filteredValue;
    } else {
      updatedPayments[index].lumpSumDate = value;
      
      // Real-time validation for date
      if (value) {
        const dateValidation = validateLumpSumDate(value);
        if (!dateValidation.isValid) {
          setErrors(prev => ({ ...prev, [`payment-${index}-date`]: dateValidation.error || '' }));
        } else {
          setErrors(prev => {
            const { [`payment-${index}-date`]: _, ...rest } = prev;
            return rest;
          });
        }
      } else {
        // Clear error if date is empty
        setErrors(prev => {
          const { [`payment-${index}-date`]: _, ...rest } = prev;
          return rest;
        });
      }
    }
    
    setPayments(updatedPayments);
  };

  const validateForm = (): boolean => {
    const currentErrors: { [key: string]: string } = {};

    // Check if number of payments is entered
    if (numberOfPayments === '' || !numberOfPayments) {
      currentErrors['numberOfPayments'] = 'Please enter the number of payments (1-10).';
    } else if (typeof numberOfPayments === 'number' && (numberOfPayments < 1 || numberOfPayments > 10)) {
      currentErrors['numberOfPayments'] = 'Please enter a number between 1 and 10.';
    }

    // Only validate payment details if we have a valid number of payments
    if (typeof numberOfPayments === 'number' && numberOfPayments > 0) {
      payments.forEach((payment, index) => {
        const amountValue = safeStringify(payment.amount);
        const parsedAmount = parseFloat(amountValue);

        if (!amountValue || isNaN(parsedAmount) || parsedAmount <= 0) {
          currentErrors[`payment-${index}-amount`] = 'Please enter a valid positive amount.';
        } else {
          const amountString = String(amountValue);
          const decimalIndex = amountString.indexOf('.');
          const wholePart = decimalIndex === -1 ? amountString : amountString.substring(0, decimalIndex);
          if (wholePart.length > 7) {
            currentErrors[`payment-${index}-amount`] = 'Amount cannot exceed 7 digits.';
          }
        }

        if (!payment.lumpSumDate) {
          currentErrors[`payment-${index}-date`] = 'Please enter a payment date.';
        } else {
          // Validate lump sum date (6 months minimum, 40 years maximum)
          const dateValidation = validateLumpSumDate(payment.lumpSumDate);
          if (!dateValidation.isValid) {
            currentErrors[`payment-${index}-date`] = dateValidation.error || 'Invalid payment date.';
          }
        }
      });
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onNext({ payments });
    }
  };

  return (
    <GuaranteedStepContainer title="Select Payment Date and Amount to be Exchanged for an Early Payout" currentStep={currentStep} totalSteps={totalSteps}>
      {/* Instructions - Centered */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <button
          type="button"
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

      <form onSubmit={handleSubmit}>
        <GuaranteedNumberOfPaymentsInput
          value={numberOfPayments}
          onChange={(value) => {
            const numValue = parseInt(value);
            if (!isNaN(numValue) && numValue >= 1 && numValue <= 10) {
              setNumberOfPayments(numValue);
            } else if (value === '') {
              setNumberOfPayments('');
            }
          }}
          error={errors['numberOfPayments']}
        />

        {typeof numberOfPayments === 'number' && numberOfPayments > 0 && (
          <div className={styles.paymentsContainer}>
            {payments.map((payment, index) => (
              <GuaranteedPaymentCard
                key={index}
                payment={payment}
                index={index}
                errors={errors}
                onPaymentChange={handlePaymentChange}
              />
            ))}
          </div>
        )}

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
            disabled={numberOfPayments === '' || !numberOfPayments || (typeof numberOfPayments === 'number' && (numberOfPayments < 1 || numberOfPayments > 10))}
            type="submit"
            aria-label="Continue to next step"
          />
        </div>
      </form>
    </GuaranteedStepContainer>
  );
};

export default GuaranteedLumpSumAmountOverview; 