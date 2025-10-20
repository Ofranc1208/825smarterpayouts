// Validation helpers for LCP calculator
// ======================================

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
  };
  OFFER_THRESHOLD: number;
}

// Validation rules constants
export const VALIDATION_RULES: ValidationRules = {
  PAYMENT_AMOUNT: {
    MIN: 100,
    MAX: 10_000_000
  },
  DATE_RULES: {
    MIN_PERIOD_MONTHS: 6,
    MAX_PERIOD_YEARS: 30,
    MIN_FUTURE_MONTHS: 3 // Minimum 3 months in the future
  },
  OFFER_THRESHOLD: 10000 // Minimum $10,000 for offers
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
 * Validate date range with future date requirements
 */
export function validateDateRange(startDate: string, endDate: string): ValidationResult {
  if (!startDate || !endDate) {
    return { isValid: false, error: 'Both start and end dates are required' };
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  // Reset time to start of day for accurate comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Check if dates are in the future (minimum 3 months)
  const minFutureDate = new Date(today);
  minFutureDate.setMonth(minFutureDate.getMonth() + VALIDATION_RULES.DATE_RULES.MIN_FUTURE_MONTHS);

  if (start < minFutureDate) {
    return {
      isValid: false,
      error: `Future payments to be exchanged can only be ${VALIDATION_RULES.DATE_RULES.MIN_FUTURE_MONTHS} months in the future, they cannot be present or past dates`
    };
  }

  if (end < minFutureDate) {
    return {
      isValid: false,
      error: `Future payments to be exchanged can only be ${VALIDATION_RULES.DATE_RULES.MIN_FUTURE_MONTHS} months in the future, they cannot be present or past dates`
    };
  }

  // Check if start date is before end date
  if (start >= end) {
    return { isValid: false, error: 'Start date must be before end date' };
  }

  // Check minimum period (6 months)
  const monthDiff = (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (monthDiff < VALIDATION_RULES.DATE_RULES.MIN_PERIOD_MONTHS) {
    return {
      isValid: false,
      error: `Payment period must be at least ${VALIDATION_RULES.DATE_RULES.MIN_PERIOD_MONTHS} months`
    };
  }

  // Check maximum period (30 years)
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
 * Sanitize numeric input (remove non-numeric characters except decimal point)
 */
export function sanitizeNumericInput(input: string): string {
  return input.replace(/[^\d.]/g, '');
}

/**
 * Check if a date is in the future (minimum 3 months)
 */
export function isDateInFuture(date: string, minMonthsInFuture: number = VALIDATION_RULES.DATE_RULES.MIN_FUTURE_MONTHS): boolean {
  if (!date) return false;

  const inputDate = new Date(date);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const minFutureDate = new Date(today);
  minFutureDate.setMonth(minFutureDate.getMonth() + minMonthsInFuture);

  return inputDate >= minFutureDate;
}

/**
 * Get validation class for input field (red border for invalid)
 */
export function getValidationClass(isValid: boolean, hasError: boolean): string {
  if (hasError || !isValid) {
    return 'error-border';
  }
  if (isValid) {
    return 'valid-border';
  }
  return '';
}

/**
 * Validate offer threshold (for LCP calculator)
 * Checks if the maximum payout is at least $10,000
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
