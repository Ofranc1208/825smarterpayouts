"use client";

import React from 'react';
import styles from './GuaranteedResultCard.module.css';

export interface GuaranteedResultCardProps {
  label: string;
  amount: number;
  variant?: 'minimum' | 'maximum';
  className?: string;
}

/**
 * GuaranteedResultCard - Individual result display card
 * Shows payout amounts with consistent styling and formatting
 */
const GuaranteedResultCard: React.FC<GuaranteedResultCardProps> = ({
  label,
  amount,
  variant = 'minimum',
  className = ''
}) => {
  const formatAmount = (value: number) => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const getAmountClass = () => {
    switch (variant) {
      case 'maximum':
        return styles.amountMaximum;
      default:
        return styles.amountMinimum;
    }
  };

  return (
    <div className={`${styles.card} ${className}`}>
      <span className={styles.label}>{label}</span>
      <span className={`${styles.amount} ${getAmountClass()}`}>
        ${formatAmount(amount)}
      </span>
    </div>
  );
};

export default GuaranteedResultCard;
