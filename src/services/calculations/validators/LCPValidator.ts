// ============================================================================
// ✅ LCP VALIDATOR - Life-Contingent Payment Validation
// ============================================================================
// Validation logic for LCP form data

import type { LCPFormData } from '../../../types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validate LCP form data before calculation
 * Pre-calculation validation to catch errors early
 * 
 * @param formData - LCP form data to validate
 * @returns Validation result with errors array
 */
export function validateLCPFormData(formData: LCPFormData): ValidationResult {
  const errors: string[] = [];
  
  // Payment Data Validation
  if (!formData.paymentData?.amount) {
    errors.push('Payment amount is required');
  }
  if (!formData.paymentData?.paymentMode) {
    errors.push('Payment mode is required');
  }
  
  // Details Data Validation
  if (!formData.detailsData?.startDate) {
    errors.push('Start date is required');
  }
  if (!formData.detailsData?.endDate) {
    errors.push('End date is required');
  }
  
  // Profile Data Validation
  if (!formData.profileData?.ageRange) {
    errors.push('Age range is required');
  }
  if (!formData.profileData?.gender) {
    errors.push('Gender is required');
  }
  if (!formData.profileData?.bodyFrame) {
    errors.push('Body frame is required');
  }
  
  // Lifestyle Data Validation
  if (!formData.lifestyleData?.weight) {
    errors.push('Weight category is required');
  }
  
  // Health Data Validation
  if (!formData.healthData?.smoke) {
    errors.push('Smoking status is required');
  }
  if (!formData.healthData?.health) {
    errors.push('Health status is required');
  }
  if (!formData.healthData?.cardiac) {
    errors.push('Cardiac condition is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate individual field
 * 
 * @param fieldName - Name of the field
 * @param value - Value to validate
 * @returns Error message or null if valid
 */
export function validateField(fieldName: string, value: any): string | null {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
}

/**
 * Validate payment amount
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
 * Validate date range
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

