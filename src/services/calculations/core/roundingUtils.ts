// ============================================================================
// 🔢 ROUNDING UTILITIES - Core Rounding Functions
// ============================================================================
// Pure functions for rounding and formatting monetary values.
// No dependencies on external services.

/**
 * Round up to the nearest $100
 * Used for min/max payout calculations
 * 
 * @param value - The value to round
 * @returns Value rounded up to nearest $100
 */
export function roundUp100(value: number): number {
  return Math.ceil((value - 0.001) / 100) * 100;
}

/**
 * Round up to the nearest $10,000
 * Used for family protection / death benefit calculations
 * 
 * @param value - The value to round
 * @returns Value rounded up to nearest $10,000
 */
export function roundUp10k(value: number): number {
  return Math.ceil((value - 0.001) / 10000) * 10000;
}

/**
 * Round to 2 decimal places
 * Standard rounding for NPV calculations
 * 
 * @param value - The value to round
 * @returns Value rounded to 2 decimal places
 */
export function roundTo2Decimals(value: number): number {
  return parseFloat(value.toFixed(2));
}

/**
 * Format a number as currency (USD)
 * 
 * @param value - The value to format
 * @param includeDecimals - Whether to include decimal places (default: false)
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, includeDecimals: boolean = false): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  });
  
  return formatter.format(value);
}

/**
 * Ensure a value is non-negative (floor at 0)
 * 
 * @param value - The value to check
 * @returns Value or 0 if negative
 */
export function ensureNonNegative(value: number): number {
  return Math.max(0, value);
}

/**
 * Round and ensure non-negative
 * Combines rounding with non-negative check
 * 
 * @param value - The value to process
 * @param roundingFn - The rounding function to use
 * @returns Processed value
 */
export function roundAndEnsureNonNegative(
  value: number,
  roundingFn: (val: number) => number = roundUp100
): number {
  return ensureNonNegative(roundingFn(value));
}

