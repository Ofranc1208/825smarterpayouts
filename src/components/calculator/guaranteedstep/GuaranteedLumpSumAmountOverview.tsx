"use client";

import React, { useState, useRef } from 'react';
import GuaranteedStepContainer from './GuaranteedStepContainer';
import { GuaranteedNavigationButton } from './shared';
import { RATE_SPREADS, AMOUNT_ADJUSTMENTS, BASE_DISCOUNT_RATE } from '../../../../app/utils/npvConfig';
import { GuaranteedFormData, LumpSumPayment } from './utils/guaranteedTypes';
import { safeStringify } from './utils/typeUtils';
import styles from './GuaranteedLumpSumAmountOverview.module.css';

interface GuaranteedLumpSumAmountOverviewProps {
  onNext: (data: { payments: LumpSumPayment[] }) => void;
  currentStep: number;
  totalSteps: number;
  initialData?: GuaranteedFormData;
}

const GuaranteedLumpSumAmountOverview: React.FC<GuaranteedLumpSumAmountOverviewProps> = ({ 
  onNext, 
  currentStep, 
  totalSteps,
  initialData
}) => {
  const [numberOfPayments, setNumberOfPayments] = useState<number | ''>('');
  const [showGuidance, setShowGuidance] = useState(false);
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
    <GuaranteedStepContainer title="Lump Sum Payment Details" currentStep={currentStep} totalSteps={totalSteps}>
      <form onSubmit={handleSubmit}>
        <div className={styles.section}>
          <label className={styles.label}>Number of Lump Sum Payments (1–10)</label>
          <input
            type="number"
            value={numberOfPayments}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 1 && value <= 10) {
                setNumberOfPayments(value);
                setShowGuidance(false);
              } else if (e.target.value === '') {
                setNumberOfPayments('');
              }
            }}
            className={`${styles.numberInput} ${errors['numberOfPayments'] ? styles.error : ''}`}
            onFocus={() => setShowGuidance(true)}
            onBlur={() => setTimeout(() => setShowGuidance(false), 200)}
            min={1}
            max={10}
            placeholder="Click to enter number (1-10)"
          />
          {showGuidance && (
            <div className={styles.guidanceMessage}>
              <span className={styles.guidanceText}>💡 You can add up to 10 lump sum payments</span>
            </div>
          )}
          {errors['numberOfPayments'] && (
            <span className={styles.errorMessage}>{errors['numberOfPayments']}</span>
          )}
        </div>

        {typeof numberOfPayments === 'number' && numberOfPayments > 0 && (
          <div className={styles.paymentsContainer}>
            {payments.map((payment, index) => (
              <div key={index} className={styles.paymentCard}>
                <h6 className={styles.paymentCardTitle}>Payment {index + 1}</h6>
                
                <div className={styles.section}>
                  <label className={styles.label}>Payment Amount ($)</label>
                  <div className={styles.amountInputWrapper}>
                    <span className={styles.dollarSign}>$</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      className={`${styles.amountInput} ${errors[`payment-${index}-amount`] ? styles.error : ''}`}
                      value={payment.amount}
                      onChange={(e) => handlePaymentChange(index, 'amount', e.target.value)}
                      placeholder="Enter amount"
                    />
                  </div>
                  {errors[`payment-${index}-amount`] && (
                    <span className={styles.errorMessage}>{errors[`payment-${index}-amount`]}</span>
                  )}
                </div>

                <div className={styles.section}>
                  <label className={styles.label}>Payment Date</label>
                  <input
                    type="date"
                    className={`${styles.dateInput} ${errors[`payment-${index}-date`] ? styles.error : ''}`}
                    value={payment.lumpSumDate}
                    onChange={(e) => handlePaymentChange(index, 'lumpSumDate', e.target.value)}
                  />
                  {errors[`payment-${index}-date`] && (
                    <span className={styles.errorMessage}>{errors[`payment-${index}-date`]}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.navigationSection}>
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