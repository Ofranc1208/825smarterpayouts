/**
 * Compare Offer Calculation Utilities
 */

import { CompareOfferData, PAYMENT_FREQUENCY_MULTIPLIERS } from './compareOfferTypes';

/**
 * Calculate our quote based on payment details
 * This is a simplified calculation - in production, this would use the same
 * calculation engine as the guaranteed flow
 */
export function calculateOurQuote(data: CompareOfferData): number {
  const paymentAmount = parseFloat(data.paymentAmount);
  const paymentsPerYear = PAYMENT_FREQUENCY_MULTIPLIERS[data.paymentFrequency];
  
  // Simplified calculation: Annual payment value * discount factor
  // In production, this should use the actual NPV calculation
  const annualValue = paymentAmount * paymentsPerYear;
  
  // Assume 20 years of payments with a 6% discount rate
  // This is a placeholder - real calculation should match guaranteed flow
  const discountRate = 0.06;
  const years = 20;
  
  // Present value of annuity formula: PMT * [(1 - (1 + r)^-n) / r]
  const presentValue = annualValue * ((1 - Math.pow(1 + discountRate, -years)) / discountRate);
  
  // Apply our competitive rate (typically 70-80% of present value)
  const ourRate = 0.75;
  const ourQuote = presentValue * ourRate;
  
  return Math.round(ourQuote * 100) / 100; // Round to 2 decimal places
}

/**
 * Calculate the difference between offers
 */
export function calculateDifference(ourQuote: number, existingOffer: number): {
  difference: number;
  percentageDifference: number;
  isBetterOffer: boolean;
} {
  const difference = ourQuote - existingOffer;
  const percentageDifference = (difference / existingOffer) * 100;
  const isBetterOffer = difference > 0;
  
  return {
    difference: Math.round(difference * 100) / 100,
    percentageDifference: Math.round(percentageDifference * 100) / 100,
    isBetterOffer
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Format percentage for display
 */
export function formatPercentage(percentage: number): string {
  const sign = percentage > 0 ? '+' : '';
  return `${sign}${percentage.toFixed(2)}%`;
}

