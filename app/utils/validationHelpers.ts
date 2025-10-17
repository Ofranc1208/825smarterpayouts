// Validation helpers for form fields and calculations

// ============================================================================
// VALIDATION CONSTANTS
// ============================================================================

export const VALIDATION_RULES = {
  PAYMENT_AMOUNT: {
    MIN: 100,                    // $100 minimum
    MAX: 1_000_000,             // $1M maximum (7 digits)
    MAX_DECIMAL_PLACES: 2,       // $123.45 format
  },
  OFFER_THRESHOLDS: {
    MIN_PAYOUT: 5_000,          // $5K minimum offer
  },
  DATE_RULES: {
    MIN_PERIOD_MONTHS: 6,        // 6 months minimum between start and end
    MAX_PERIOD_YEARS: 35,        // 35 years maximum from today
    MIN_START_MONTHS_FUTURE: 3,  // Start date must be 3+ months from today
    MIN_END_MONTHS_FROM_START: 6, // End date must be 6+ months from start
  },
  FORBIDDEN_PATTERNS: [
    /[*#@!%^&()_+=\[\]{}\\|;:'"<>?/~`]/,  // Special characters
    /[a-zA-Z]/,                           // Letters
  ]
} as const;

// ============================================================================
// BASIC VALIDATION FUNCTIONS
// ============================================================================

export function isPositiveNumber(value: any): boolean {
  return typeof value === 'number' && isFinite(value) && value > 0;
}

export function isValidDate(value: any): boolean {
  return value instanceof Date && !isNaN(value.getTime());
}

export function isNonEmptyString(value: any): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

// ============================================================================
// PAYMENT AMOUNT VALIDATION
// ============================================================================

export interface PaymentValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedValue?: string;
}

export function validatePaymentAmount(value: string): PaymentValidationResult {
  // Handle empty input
  if (!value || value.trim() === '') {
    return { isValid: false, error: 'Payment amount is required' };
  }

  // Remove commas and whitespace for validation
  const cleanValue = value.replace(/[\s,]/g, '');
  
  // Check for forbidden characters
  for (const pattern of VALIDATION_RULES.FORBIDDEN_PATTERNS) {
    if (pattern.test(cleanValue)) {
      return { isValid: false, error: 'Payment amount contains invalid characters' };
    }
  }

  // Check if it's a valid number
  const numValue = parseFloat(cleanValue);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Please enter a valid payment amount' };
  }

  // Check minimum amount
  if (numValue < VALIDATION_RULES.PAYMENT_AMOUNT.MIN) {
    return { 
      isValid: false, 
      error: `Payment amount must be at least $${VALIDATION_RULES.PAYMENT_AMOUNT.MIN.toLocaleString()}` 
    };
  }

  // Check maximum amount
  if (numValue > VALIDATION_RULES.PAYMENT_AMOUNT.MAX) {
    return { 
      isValid: false, 
      error: `Payment amount cannot exceed $${VALIDATION_RULES.PAYMENT_AMOUNT.MAX.toLocaleString()}` 
    };
  }

  // Check decimal places
  const decimalParts = cleanValue.split('.');
  if (decimalParts.length > 1 && decimalParts[1].length > VALIDATION_RULES.PAYMENT_AMOUNT.MAX_DECIMAL_PLACES) {
    return { 
      isValid: false, 
      error: `Payment amount can have at most ${VALIDATION_RULES.PAYMENT_AMOUNT.MAX_DECIMAL_PLACES} decimal places` 
    };
  }

  // Check for maximum 7 digits before decimal point
  const wholePart = decimalParts[0];
  if (wholePart.length > 7) {
    return {
      isValid: false,
      error: 'Payment amount cannot exceed 7 digits'
    };
  }

  // Sanitize and format the value
  const sanitizedValue = numValue.toFixed(2);

  return { 
    isValid: true, 
    sanitizedValue 
  };
}

// ============================================================================
// OFFER VALIDATION
// ============================================================================

export interface OfferValidationResult {
  isValid: boolean;
  shouldShowOffer: boolean;
  message?: string;
}

export function validateOfferThreshold(minOffer: number, maxOffer: number): OfferValidationResult {
  const minThreshold = VALIDATION_RULES.OFFER_THRESHOLDS.MIN_PAYOUT;
  
  if (minOffer < minThreshold) {
    return {
      isValid: true,
      shouldShowOffer: false,
      message: `Unfortunately, we don't have any offers available for amounts under $${minThreshold.toLocaleString()}. Please try increasing your payment amount or adjusting your date range.`
    };
  }

  return {
    isValid: true,
    shouldShowOffer: true
  };
}

// ============================================================================
// DATE VALIDATION
// ============================================================================

export interface DateValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateDateRange(startDate: string, endDate: string): DateValidationResult {
  if (!startDate || !endDate) {
    return { isValid: false, error: 'Both start and end dates are required' };
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Check if dates are valid
  if (!isValidDate(start) || !isValidDate(end)) {
    return { isValid: false, error: 'Please enter valid dates' };
  }

  // Check if end date is after start date
  if (end <= start) {
    return { isValid: false, error: 'End date must be after start date' };
  }

  // NEW RULE 1: Check if start date is at least 3 months in the future
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
  
  const minStartDate = new Date(today);
  minStartDate.setMonth(minStartDate.getMonth() + VALIDATION_RULES.DATE_RULES.MIN_START_MONTHS_FUTURE);
  
  if (start < minStartDate) {
    return { 
      isValid: false, 
      error: `Payment dates must be at least ${VALIDATION_RULES.DATE_RULES.MIN_START_MONTHS_FUTURE} months in the future. This processing timeframe ensures your transaction is completed properly.` 
    };
  }

  // NEW RULE 2: Check if end date is at least 6 months after start date
  const minEndDate = new Date(start);
  minEndDate.setMonth(minEndDate.getMonth() + VALIDATION_RULES.DATE_RULES.MIN_END_MONTHS_FROM_START);
  
  if (end < minEndDate) {
    return { 
      isValid: false, 
      error: `End date must be at least ${VALIDATION_RULES.DATE_RULES.MIN_END_MONTHS_FROM_START} months after the start date to qualify for an early payout option.` 
    };
  }

  // Check maximum period (35 years from today for end date)
  const maxEndDate = new Date(today);
  maxEndDate.setFullYear(maxEndDate.getFullYear() + VALIDATION_RULES.DATE_RULES.MAX_PERIOD_YEARS);
  
  if (end > maxEndDate) {
    return { 
      isValid: false, 
      error: `End date cannot be more than ${VALIDATION_RULES.DATE_RULES.MAX_PERIOD_YEARS} years in the future. Please select a date within the eligible timeframe.` 
    };
  }

  return { isValid: true };
}

// ============================================================================
// INPUT SANITIZATION
// ============================================================================

export function sanitizeNumericInput(value: string): string {
  // Remove forbidden characters but keep numbers, decimals, and commas
  return value.replace(/[^0-9.,]/g, '');
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

export function formatCurrencyWithCents(value: number): string {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
} 