// ============================================================================
// 💵 GUARANTEED LUMP SUM CALCULATOR - Guaranteed Lump Sum Calculations
// ============================================================================
// Handles multiple lump sum payments for guaranteed flow

import {
  BASE_DISCOUNT_RATE,
  AMOUNT_ADJUSTMENTS,
  RATE_SPREADS
} from '../../../../app/utils/npvConfig';
import { calculateMonthsFromToday } from '../core/dateCalculator';
import { roundUp100, roundTo2Decimals, ensureNonNegative } from '../core/roundingUtils';
import type { GuaranteedFormData, GuaranteedCalculationResult } from '../../../types';

/**
 * Calculate Guaranteed Lump Sum Payments NPV
 * Handles multiple lump sum payments for guaranteed flow
 * 
 * @param formData - Guaranteed form data with payments array
 * @returns Guaranteed calculation result
 */
export function calculateGuaranteedLumpSum(formData: GuaranteedFormData): GuaranteedCalculationResult {
  const { payments, annualIncrease = 0 } = formData;
  
  if (!payments || payments.length === 0) {
    throw new Error('Missing payments for Guaranteed Lump Sum calculation');
  }
  
  console.log('[GuaranteedLumpSumCalculator] Calculating Guaranteed Lump Sum for payments:', payments);
  
  let totalNpv = 0;
  let totalMinOffer = 0;
  let totalMaxOffer = 0;
  let earliestDate = '';
  let latestDate = '';
  
  const baseRate = BASE_DISCOUNT_RATE;
  const minRate = baseRate + RATE_SPREADS.min;
  const maxRate = baseRate + RATE_SPREADS.max;
  
  payments.forEach((payment, index) => {
    const amountValue = parseFloat(payment.amount);
    const lumpSumDate = payment.lumpSumDate;
    
    if (!amountValue || !lumpSumDate) {
      console.warn(`[GuaranteedLumpSumCalculator] Skipping invalid payment ${index + 1}`);
      return;
    }
    
    // Track date range for display purposes
    if (!earliestDate || lumpSumDate < earliestDate) {
      earliestDate = lumpSumDate;
    }
    if (!latestDate || lumpSumDate > latestDate) {
      latestDate = lumpSumDate;
    }
    
    const monthsFromToday = calculateMonthsFromToday(lumpSumDate);
    
    if (monthsFromToday < 0) {
      // Past date - use full amount
      totalNpv += amountValue;
      totalMinOffer += amountValue;
      totalMaxOffer += amountValue;
      return;
    }
    
    // Calculate NPV for this payment
    const periodicRate = baseRate / 12;
    const discountFactor = Math.pow(1 + periodicRate, monthsFromToday);
    const baseNpv = amountValue / discountFactor;
    
    const minDiscountFactor = Math.pow(1 + minRate / 12, monthsFromToday);
    const maxDiscountFactor = Math.pow(1 + maxRate / 12, monthsFromToday);
    const minNpvBeforeAdjustment = amountValue / minDiscountFactor;
    const maxNpvBeforeAdjustment = amountValue / maxDiscountFactor;
    
    totalNpv += baseNpv;
    totalMinOffer += minNpvBeforeAdjustment;
    totalMaxOffer += maxNpvBeforeAdjustment;
  });
  
  // Apply total adjustments
  const finalMinPayout = ensureNonNegative(roundUp100(totalMinOffer - AMOUNT_ADJUSTMENTS.min));
  const finalMaxPayout = ensureNonNegative(roundUp100(totalMaxOffer - AMOUNT_ADJUSTMENTS.max));
  
  // Calculate total payment amount for display
  const totalPaymentAmount = payments.reduce((sum, payment) => {
    const amount = parseFloat(payment.amount) || 0;
    return sum + amount;
  }, 0);
  
  console.log('[GuaranteedLumpSumCalculator] Calculation result:', {
    totalNpv,
    finalMinPayout,
    finalMaxPayout,
    totalPaymentAmount,
    paymentCount: payments.length
  });
  
  return {
    npv: roundTo2Decimals(totalNpv),
    minPayout: finalMinPayout,
    maxPayout: finalMaxPayout,
    paymentMode: 'Lump Sum',
    paymentAmount: totalPaymentAmount.toString(),
    annualIncrease: annualIncrease,
    startDate: earliestDate,
    endDate: latestDate
  };
}

