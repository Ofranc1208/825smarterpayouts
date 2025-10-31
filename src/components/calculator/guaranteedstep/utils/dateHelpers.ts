/**
 * ============================================================================
 * DATE HELPER UTILITIES - Guaranteed Calculator
 * ============================================================================
 * 
 * Provides date calculation utilities for the Guaranteed Payment calculator.
 * Ensures dates are within acceptable ranges from today.
 */

/**
 * Get minimum start date (6 months from today) for HTML input min attribute
 * Format: YYYY-MM-DD (e.g., "2025-07-01")
 * 
 * @returns Minimum date string in ISO format
 */
export function getMinStartDateString(): string {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setMonth(today.getMonth() + 6); // 6 months in the future
  return minDate.toISOString().split('T')[0];
}

/**
 * Get maximum start date (30 years from today) for HTML input max attribute
 * Format: YYYY-MM-DD (e.g., "2055-01-01")
 * 
 * @returns Maximum start date string in ISO format
 */
export function getMaxStartDateString(): string {
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setFullYear(today.getFullYear() + 30); // 30 years from today
  return maxDate.toISOString().split('T')[0];
}

/**
 * Get maximum end date (40 years from today) for HTML input max attribute
 * Format: YYYY-MM-DD (e.g., "2065-01-01")
 * 
 * @returns Maximum end date string in ISO format
 */
export function getMaxEndDateString(): string {
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setFullYear(today.getFullYear() + 40); // 40 years from today
  return maxDate.toISOString().split('T')[0];
}

