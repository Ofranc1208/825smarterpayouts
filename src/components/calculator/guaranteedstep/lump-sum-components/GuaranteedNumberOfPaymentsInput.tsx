"use client";

import React, { useState, useEffect } from 'react';
import { GuaranteedSection, GuaranteedFormInput } from '../shared';
import styles from './GuaranteedNumberOfPaymentsInput.module.css';

export interface GuaranteedNumberOfPaymentsInputProps {
  value: number | '';
  onChange: (value: string) => void;
  error?: string;
}

/**
 * GuaranteedNumberOfPaymentsInput - Handles the number of payments input with guidance tooltip
 */
const GuaranteedNumberOfPaymentsInput: React.FC<GuaranteedNumberOfPaymentsInputProps> = ({
  value,
  onChange,
  error
}) => {
  const [showGuidance, setShowGuidance] = useState(false);

  const handleChange = (inputValue: string) => {
    onChange(inputValue);

    // Show guidance when user starts typing
    if (inputValue && !showGuidance) {
      setShowGuidance(true);
    }
  };

  // Handle guidance tooltip timing
  useEffect(() => {
    if (showGuidance) {
      const timer = setTimeout(() => setShowGuidance(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showGuidance]);

  return (
    <GuaranteedSection label="Number of Lump Sum Payments (1–10)">
      <GuaranteedFormInput
        type="text"
        value={value.toString()}
        onChange={handleChange}
        placeholder="Click to enter number (1-10)"
        error={error}
        isValid={typeof value === 'number' && value >= 1 && value <= 10}
      />
      {showGuidance && (
        <div className={styles.guidanceTooltip}>
          <span className={styles.guidanceText}>
            💡 You can add up to 10 lump sum payments
          </span>
        </div>
      )}
    </GuaranteedSection>
  );
};

export default GuaranteedNumberOfPaymentsInput;
