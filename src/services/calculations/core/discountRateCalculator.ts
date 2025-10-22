// ============================================================================
// 💹 DISCOUNT RATE CALCULATOR - Core Rate Calculation Functions
// ============================================================================
// Pure functions for discount rate and NPV calculations.
// No dependencies on external services.

/**
 * Calculate periodic discount rate from annual rate
 * 
 * @param annualRate - Annual discount rate (as decimal, e.g., 0.085 for 8.5%)
 * @param periodsPerYear - Number of periods per year (12 for monthly, 4 for quarterly, etc.)
 * @returns Periodic discount rate
 */
export function calculatePeriodicRate(annualRate: number, periodsPerYear: number = 12): number {
  return annualRate / periodsPerYear;
}

/**
 * Calculate discount factor for NPV calculations
 * 
 * @param periodicRate - Periodic discount rate (as decimal)
 * @param numberOfPeriods - Number of periods
 * @returns Discount factor
 */
export function calculateDiscountFactor(periodicRate: number, numberOfPeriods: number): number {
  return Math.pow(1 + periodicRate, numberOfPeriods);
}

/**
 * Calculate present value of a future payment
 * 
 * @param futureValue - The future payment amount
 * @param discountRate - Annual discount rate (as decimal)
 * @param monthsFromNow - Number of months until payment
 * @returns Present value
 */
export function calculatePresentValue(
  futureValue: number,
  discountRate: number,
  monthsFromNow: number
): number {
  const periodicRate = calculatePeriodicRate(discountRate, 12);
  const discountFactor = calculateDiscountFactor(periodicRate, monthsFromNow);
  return futureValue / discountFactor;
}

/**
 * Apply health/risk adjustments to base discount rate
 * Used for LCP calculations
 * 
 * @param baseRate - Base discount rate (as decimal)
 * @param adjustments - Array of adjustment values to sum
 * @returns Adjusted discount rate
 */
export function applyHealthAdjustments(baseRate: number, adjustments: number[]): number {
  const totalAdjustment = adjustments.reduce((sum, adj) => sum + adj, 0);
  return baseRate + totalAdjustment;
}

/**
 * Calculate min/max rates with spreads
 * 
 * @param baseRate - Base discount rate
 * @param minSpread - Spread to add for minimum rate
 * @param maxSpread - Spread to add for maximum rate
 * @returns Object with min and max rates
 */
export function calculateMinMaxRates(
  baseRate: number,
  minSpread: number,
  maxSpread: number
): { minRate: number; maxRate: number } {
  return {
    minRate: baseRate + minSpread,
    maxRate: baseRate + maxSpread
  };
}

/**
 * Calculate NPV for a single payment
 * 
 * @param amount - Payment amount
 * @param discountRate - Annual discount rate (as decimal)
 * @param monthsFromNow - Months until payment
 * @returns NPV of the payment
 */
export function calculateSinglePaymentNPV(
  amount: number,
  discountRate: number,
  monthsFromNow: number
): number {
  if (monthsFromNow <= 0) {
    return amount; // Payment is now or in the past
  }
  
  return calculatePresentValue(amount, discountRate, monthsFromNow);
}

