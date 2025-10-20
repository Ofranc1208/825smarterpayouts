"use client";

import React from 'react';
import { GuaranteedSection } from '../shared';
import styles from './GuaranteedPaymentAmountInput.module.css';

export interface GuaranteedPaymentAmountInputProps {
  value: string | number | undefined;
  onChange: (value: string) => void;
  error?: string;
  index: number;
}

/**
 * GuaranteedPaymentAmountInput - Custom amount input with $ prefix and validation
 */
const GuaranteedPaymentAmountInput: React.FC<GuaranteedPaymentAmountInputProps> = ({
  value,
  onChange,
  error,
  index
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Filter and format amount input
    const filteredValue = e.target.value
      .replace(/[^\d.]/g, '')
      .replace(/^(\d*\.\d{0,2}).*$/, '$1');
    onChange(filteredValue);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!error) {
      e.currentTarget.style.borderColor = '#22c55e';
      e.currentTarget.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.1)';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!error) {
      e.currentTarget.style.borderColor = '#d1d5db';
      e.currentTarget.style.boxShadow = 'none';
    }
  };

  return (
    <GuaranteedSection label="Payment Amount ($)">
      <div className={styles.inputContainer}>
        <span className={styles.dollarSign}>$</span>
        <input
          type="text"
          inputMode="decimal"
          className={`${styles.input} ${error ? styles.error : ''}`}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Enter amount"
        />
      </div>
      {error && (
        <span className={styles.errorMessage}>{error}</span>
      )}
    </GuaranteedSection>
  );
};

export default GuaranteedPaymentAmountInput;
