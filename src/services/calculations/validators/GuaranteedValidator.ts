// ============================================================================
// ✅ GUARANTEED VALIDATOR - Guaranteed Payment Validation
// ============================================================================
// Validation logic for Guaranteed payment form data

import type { GuaranteedFormData } from '../../../types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validate Guaranteed form data before calculation
 * Pre-calculation validation to catch errors early
 * 
 * @param formData - Guaranteed form data to validate
 * @returns Validation result with errors array
 */
export function validateGuaranteedFormData(formData: GuaranteedFormData): ValidationResult {
  const errors: string[] = [];
  
  if (!formData.paymentAmount) {
    errors.push('Payment amount is required');
  }
  
  if (!formData.paymentMode) {
    errors.push('Payment mode is required');
  }
  
  if (!formData.startDate) {
    errors.push('Start date is required');
  }
  
  if (!formData.endDate) {
    errors.push('End date is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate payment amount for guaranteed payments
 * 
 * @param amount - Amount to validate
 * @returns Error message or null if valid
 */
export function validatePaymentAmount(amount: string | number): string | null {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) {
    return 'Payment amount must be a valid number';
  }
  
  if (numAmount <= 0) {
    return 'Payment amount must be greater than zero';
  }
  
  return null;
}

/**
 * Validate date range for guaranteed payments
 * 
 * @param startDate - Start date string
 * @param endDate - End date string
 * @returns Error message or null if valid
 */
export function validateDateRange(startDate: string, endDate: string): string | null {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(start.getTime())) {
    return 'Start date is invalid';
  }
  
  if (isNaN(end.getTime())) {
    return 'End date is invalid';
  }
  
  if (end <= start) {
    return 'End date must be after start date';
  }
  
  return null;
}

/**
 * Validate lump sum payments array
 * 
 * @param payments - Array of lump sum payments
 * @returns Error message or null if valid
 */
export function validateLumpSumPayments(
  payments: Array<{ amount: string; lumpSumDate: string }>
): string | null {
  if (!payments || payments.length === 0) {
    return 'At least one payment is required';
  }
  
  for (let i = 0; i < payments.length; i++) {
    const payment = payments[i];
    
    if (!payment.amount || !payment.lumpSumDate) {
      return `Payment ${i + 1} is missing required fields`;
    }
    
    const amount = parseFloat(payment.amount);
    if (isNaN(amount) || amount <= 0) {
      return `Payment ${i + 1} has invalid amount`;
    }
    
    const date = new Date(payment.lumpSumDate);
    if (isNaN(date.getTime())) {
      return `Payment ${i + 1} has invalid date`;
    }
  }
  
  return null;
}

