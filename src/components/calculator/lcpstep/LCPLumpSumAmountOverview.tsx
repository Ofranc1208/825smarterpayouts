"use client";

import React, { useState, useRef, useEffect } from 'react';
import LCPStepContainer from './LCPStepContainer';
import { LCPButton, LCPNavigationButton, QuickHelpBadge } from './shared';
import { NumberOfPaymentsInput, PaymentCard, Payment } from './lump-sum-components';
import layout from './utils/LCPLayout.module.css';

interface LCPLumpSumAmountOverviewProps {
  onNext: (data: { payments: Payment[] }) => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
}

const LCPLumpSumAmountOverview: React.FC<LCPLumpSumAmountOverviewProps> = ({ 
  onNext,
  onBack,
  currentStep, 
  totalSteps 
}) => {
  const [numberOfPayments, setNumberOfPayments] = useState<number | ''>('');
  const [payments, setPayments] = useState<Payment[]>([{ amount: '', lumpSumDate: '' }]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Update payments array when numberOfPayments changes
  React.useEffect(() => {
    if (typeof numberOfPayments === 'number' && numberOfPayments > 0) {
      const currentPayments = payments;
      const newPayments: Payment[] = [];
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
        const amountValue = payment.amount;
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

  // Handle number of payments input with validation
  const handleNumberOfPaymentsChange = (value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 10) {
      setNumberOfPayments(numValue);
    } else if (value === '') {
      setNumberOfPayments('');
    }
  };

  return (
    <LCPStepContainer title="LCP Lump Sum Payment Details" currentStep={currentStep} totalSteps={totalSteps}>
      <QuickHelpBadge />
      
      <form onSubmit={handleSubmit}>
        <NumberOfPaymentsInput
            value={numberOfPayments}
          onChange={handleNumberOfPaymentsChange}
          error={errors['numberOfPayments']}
        />

        {typeof numberOfPayments === 'number' && numberOfPayments > 0 && (
          <div className={layout.paymentList}>
            {payments.map((payment, index) => (
              <PaymentCard
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
          <LCPNavigationButton
            direction="back"
            disabled={!onBack}
            onClick={onBack}
            type="button"
            aria-label="Back to previous step"
          />
          <LCPNavigationButton
            direction="next"
            disabled={numberOfPayments === '' || !numberOfPayments || (typeof numberOfPayments === 'number' && (numberOfPayments < 1 || numberOfPayments > 10))}
            type="submit"
            aria-label="Continue to next step"
          />
        </div>
      </form>
    </LCPStepContainer>
  );
};

export default LCPLumpSumAmountOverview; 