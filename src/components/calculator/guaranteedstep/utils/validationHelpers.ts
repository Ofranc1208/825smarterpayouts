// Validation helpers for Guaranteed calculator
// ============================================

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface ValidationRules {
  PAYMENT_AMOUNT: {
    MIN: number;
    MAX: number;
  };
  DATE_RULES: {
    MIN_PERIOD_MONTHS: number;
    MAX_PERIOD_YEARS: number;
    MIN_FUTURE_MONTHS: number;
    MAX_START_DATE_YEARS: number;
    MAX_END_DATE_YEARS: number;
  };
  OFFER_THRESHOLD: number;
}

// Validation rules constants for guaranteed calculator
export const VALIDATION_RULES: ValidationRules = {
  PAYMENT_AMOUNT: {
    MIN: 100,
    MAX: 10_000_000
  },
  DATE_RULES: {
    MIN_PERIOD_MONTHS: 6,
    MAX_PERIOD_YEARS: 30,
    MIN_FUTURE_MONTHS: 6, // Start date must be at least 6 months from today
    MAX_START_DATE_YEARS: 30, // Start date cannot exceed 30 years from today
    MAX_END_DATE_YEARS: 40 // End date cannot exceed 40 years from today
  },
  OFFER_THRESHOLD: 10000
};

/**
 * Validate payment amount
 */
export function validatePaymentAmount(amount: string): ValidationResult {
  if (!amount || amount.trim() === '') {
    return { isValid: false, error: 'Payment amount is required' };
  }

  const numericAmount = parseFloat(amount.replace(/[,$]/g, ''));

  if (isNaN(numericAmount)) {
    return { isValid: false, error: 'Please enter a valid payment amount' };
  }

  if (numericAmount < VALIDATION_RULES.PAYMENT_AMOUNT.MIN) {
    return {
      isValid: false,
      error: `Payment amount must be at least $${VALIDATION_RULES.PAYMENT_AMOUNT.MIN.toLocaleString()}`
    };
  }

  if (numericAmount > VALIDATION_RULES.PAYMENT_AMOUNT.MAX) {
    return {
      isValid: false,
      error: `Payment amount cannot exceed $${VALIDATION_RULES.PAYMENT_AMOUNT.MAX.toLocaleString()}`
    };
  }

  return { isValid: true };
}

/**
 * Validate date range with absolute date limits for guaranteed calculator
 * - Start date: Minimum 6 months from today, Maximum 30 years from today
 * - End date: Maximum 40 years from today
 */
export function validateDateRange(startDate: string, endDate: string): ValidationResult {
  if (!startDate || !endDate) {
    return { isValid: false, error: 'Both start and end dates are required' };
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  
  // Reset time to start of day for accurate comparison
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Check minimum start date (6 months from today)
  const minStartDate = new Date(todayStart);
  minStartDate.setMonth(minStartDate.getMonth() + VALIDATION_RULES.DATE_RULES.MIN_FUTURE_MONTHS);
  
  if (start < minStartDate) {
    return {
      isValid: false,
      error: `Start date must be at least ${VALIDATION_RULES.DATE_RULES.MIN_FUTURE_MONTHS} months in the future`
    };
  }

  // Check maximum start date (30 years from today)
  const maxStartDate = new Date(todayStart);
  maxStartDate.setFullYear(maxStartDate.getFullYear() + VALIDATION_RULES.DATE_RULES.MAX_START_DATE_YEARS);
  
  if (start > maxStartDate) {
    return {
      isValid: false,
      error: `Start date cannot exceed ${VALIDATION_RULES.DATE_RULES.MAX_START_DATE_YEARS} years from today`
    };
  }

  // Check maximum end date (40 years from today)
  const maxEndDate = new Date(todayStart);
  maxEndDate.setFullYear(maxEndDate.getFullYear() + VALIDATION_RULES.DATE_RULES.MAX_END_DATE_YEARS);
  
  if (end > maxEndDate) {
    return {
      isValid: false,
      error: `End date cannot exceed ${VALIDATION_RULES.DATE_RULES.MAX_END_DATE_YEARS} years from today`
    };
  }

  // Check if start date is before end date
  if (start >= end) {
    return { isValid: false, error: 'Start date must be before end date' };
  }

  // Check minimum period (6 months between dates)
  const monthDiff = (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (monthDiff < VALIDATION_RULES.DATE_RULES.MIN_PERIOD_MONTHS) {
    return {
      isValid: false,
      error: `Payment period must be at least ${VALIDATION_RULES.DATE_RULES.MIN_PERIOD_MONTHS} months`
    };
  }

  // Check maximum period (30 years between dates)
  const yearDiff = (end.getFullYear() - start.getFullYear()) +
    (end.getMonth() - start.getMonth()) / 12;

  if (yearDiff > VALIDATION_RULES.DATE_RULES.MAX_PERIOD_YEARS) {
    return {
      isValid: false,
      error: `Payment period cannot exceed ${VALIDATION_RULES.DATE_RULES.MAX_PERIOD_YEARS} years`
    };
  }

  return { isValid: true };
}

/**
 * Validate lump sum date for guaranteed calculator
 * - Minimum: 6 months from today
 * - Maximum: 40 years from today
 */
export function validateLumpSumDate(date: string): ValidationResult {
  if (!date) {
    return { isValid: false, error: 'Lump sum date is required' };
  }

  const lumpSumDate = new Date(date);
  const today = new Date();
  
  // Reset time to start of day for accurate comparison
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const dateStart = new Date(lumpSumDate.getFullYear(), lumpSumDate.getMonth(), lumpSumDate.getDate());

  // Check minimum date (6 months from today)
  const minDate = new Date(todayStart);
  minDate.setMonth(minDate.getMonth() + VALIDATION_RULES.DATE_RULES.MIN_FUTURE_MONTHS);
  
  if (dateStart < minDate) {
    return {
      isValid: false,
      error: `Lump sum date must be at least ${VALIDATION_RULES.DATE_RULES.MIN_FUTURE_MONTHS} months in the future`
    };
  }

  // Check maximum date (40 years from today)
  const maxDate = new Date(todayStart);
  maxDate.setFullYear(maxDate.getFullYear() + VALIDATION_RULES.DATE_RULES.MAX_END_DATE_YEARS);
  
  if (dateStart > maxDate) {
    return {
      isValid: false,
      error: `Lump sum date cannot exceed ${VALIDATION_RULES.DATE_RULES.MAX_END_DATE_YEARS} years from today`
    };
  }

  return { isValid: true };
}

/**
 * Sanitize numeric input (remove non-numeric characters except decimal point)
 */
export function sanitizeNumericInput(input: string): string {
  return input.replace(/[^\d.]/g, '');
}

/**
 * Validate offer threshold (for guaranteed calculator)
 */
export function validateOfferThreshold(amount: number, threshold: number = VALIDATION_RULES.OFFER_THRESHOLD): ValidationResult {
  if (amount < threshold) {
    return {
      isValid: false,
      error: `Offer amount must be at least $${threshold.toLocaleString()} to proceed`
    };
  }

  return { isValid: true };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
