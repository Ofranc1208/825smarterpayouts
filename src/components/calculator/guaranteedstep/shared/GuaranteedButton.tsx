"use client";

import React from 'react';
import styles from './GuaranteedButton.module.css';

/**
 * ============================================================================
 * GUARANTEED BUTTON - SHARED COMPONENT
 * ============================================================================
 *
 * Centralized button component for Guaranteed calculator steps.
 * Eliminates ~400 lines of duplicated button styling across step components.
 *
 * Supports two variants:
 * - 'option': Selection buttons (payment modes, ages, etc.)
 * - 'next': Circular next button with arrow
 */

export interface GuaranteedButtonProps {
  variant: 'option' | 'next';
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  children?: React.ReactNode;
  'aria-label'?: string;
  className?: string;
}

const GuaranteedButton: React.FC<GuaranteedButtonProps> = ({
  variant,
  selected = false,
  disabled = false,
  onClick,
  type = 'button',
  children,
  'aria-label': ariaLabel,
  className
}) => {
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  // Common props for both variants
  const commonProps = {
    type,
    disabled,
    onClick,
    onKeyDown: handleKeyDown,
    className: `${styles.baseButton} ${className || ''}`,
    'aria-label': ariaLabel,
    tabIndex: disabled ? -1 : 0,
  };

  // Option variant (selection buttons)
  if (variant === 'option') {
    return (
      <button
        {...commonProps}
        className={`${styles.optionButton} ${selected ? styles.optionButtonSelected : ''} ${commonProps.className}`}
        aria-pressed={selected}
        role="button"
      >
        {children}
      </button>
    );
  }

  // Next variant (circular arrow button)
  if (variant === 'next') {
    return (
      <button
        {...commonProps}
        className={`${styles.nextButton} ${disabled ? styles.nextButtonDisabled : ''} ${commonProps.className}`}
        aria-label={ariaLabel || 'Next'}
      >
        <span className={styles.arrow}>
          →
        </span>
      </button>
    );
  }

  // Fallback (should not happen)
  return null;
};

export default GuaranteedButton;

// Export props interface for TypeScript users
export type { GuaranteedButtonProps };
