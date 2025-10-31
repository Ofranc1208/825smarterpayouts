"use client";

import React from 'react';
import { GuaranteedSection, GuaranteedFormInput } from '../shared';
import { getMinStartDateString, getMaxEndDateString } from '../utils/dateHelpers';
import GuaranteedPaymentAmountInput from './GuaranteedPaymentAmountInput';
import styles from './GuaranteedPaymentCard.module.css';

export interface GuaranteedPayment {
  id?: string;
  amount?: string | number;
  lumpSumDate?: string;
}

export interface GuaranteedPaymentCardProps {
  payment: GuaranteedPayment;
  index: number;
  errors: Record<string, string>;
  onPaymentChange: (index: number, field: 'amount' | 'lumpSumDate', value: string) => void;
}

/**
 * GuaranteedPaymentCard - Individual payment form card
 * Contains amount input and date input for a single payment
 */
const GuaranteedPaymentCard: React.FC<GuaranteedPaymentCardProps> = ({
  payment,
  index,
  errors,
  onPaymentChange
}) => {
  const handleAmountChange = (value: string) => {
    onPaymentChange(index, 'amount', value);
  };

  const handleDateChange = (value: string) => {
    onPaymentChange(index, 'lumpSumDate', value);
  };

  // Calculate min/max dates for date input
  const minDateString = getMinStartDateString();
  const maxDateString = getMaxEndDateString();

  return (
    <div className={styles.card}>
      <h6 className={styles.title}>Payment {index + 1}</h6>

      <GuaranteedPaymentAmountInput
        value={payment.amount?.toString() || ''}
        onChange={handleAmountChange}
        error={errors[`payment-${index}-amount`]}
        index={index}
      />

      <GuaranteedSection label="Payment Date">
        <GuaranteedFormInput
          type="date"
          value={payment.lumpSumDate || ''}
          onChange={handleDateChange}
          min={minDateString}
          max={maxDateString}
          error={errors[`payment-${index}-date`]}
          isValid={!!payment.lumpSumDate}
        />
      </GuaranteedSection>
    </div>
  );
};

export default GuaranteedPaymentCard;
