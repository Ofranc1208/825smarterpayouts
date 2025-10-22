// ============================================================================
// 🔒 GUARANTEED CALCULATION SERVICE - Guaranteed Payment Calculations
// ============================================================================
// Main service for calculating Guaranteed Payments (no health adjustments)

import { calculateMinMaxNPV, PaymentFrequency } from '../../../../app/utils/npvCalculations';
import {
  BASE_DISCOUNT_RATE,
  AMOUNT_ADJUSTMENTS,
  RATE_SPREADS
} from '../../../../app/utils/npvConfig';
import { calculateMonthsFromToday } from '../core/dateCalculator';
import { roundUp100, roundTo2Decimals, ensureNonNegative } from '../core/roundingUtils';
import type { GuaranteedFormData, GuaranteedCalculationResult } from '../../../types';
import { calculateGuaranteedLumpSum } from './GuaranteedLumpSumCalculator';

/**
 * Calculate Guaranteed Payments NPV
 * Handles both regular payments and lump sum payments
 * 
 * @param formData - Guaranteed form data
 * @returns Guaranteed calculation result
 */
export function calculateGuaranteed(formData: GuaranteedFormData): GuaranteedCalculationResult {
  const { paymentAmount, startDate, endDate, paymentMode, annualIncrease, payments } = formData;
  
  // Check if this is a lump sum payment calculation
  if (paymentMode === 'Lump Sum' && payments && payments.length > 0) {
    console.log('[GuaranteedCalculationService] Calculating Guaranteed Lump Sum with payments:', payments);
    return calculateGuaranteedLumpSum(formData);
  }
  
  // Regular payment calculation
  // Validate required data for regular payments
  if (!paymentAmount || !startDate || !endDate || !paymentMode) {
    const missingFields = [];
    if (!paymentAmount) missingFields.push('paymentAmount');
    if (!startDate) missingFields.push('startDate');
    if (!endDate) missingFields.push('endDate');
    if (!paymentMode) missingFields.push('paymentMode');
    
    const errorMsg = `Missing required fields: ${missingFields.join(', ')}`;
    console.error('[GuaranteedCalculationService] Validation failed:', errorMsg);
    throw new Error(errorMsg);
  }
  
  const amount = parseFloat(paymentAmount);
  if (!amount) {
    const errorMsg = 'Invalid payment amount';
    console.error('[GuaranteedCalculationService] Invalid payment amount:', paymentAmount);
    throw new Error(errorMsg);
  }
  
  try {
    const result = calculateMinMaxNPV({
      amount,
      startDate,
      endDate,
      baseRate: BASE_DISCOUNT_RATE,
      paymentMode: paymentMode as PaymentFrequency,
      increaseRate: annualIncrease || 0,
      minAdjustment: AMOUNT_ADJUSTMENTS.min,
      maxAdjustment: AMOUNT_ADJUSTMENTS.max
    });
    
    const calculationResult: GuaranteedCalculationResult = {
      npv: result.minOffer, // Use minOffer as NPV for guaranteed flow
      minPayout: result.minOffer,
      maxPayout: result.maxOffer,
      paymentMode: paymentMode || '',
      paymentAmount: paymentAmount || '',
      annualIncrease: annualIncrease || 0,
      startDate: startDate || '',
      endDate: endDate || ''
    };
    
    return calculationResult;
  } catch (e: any) {
    console.error('[GuaranteedCalculationService] Calculation failed:', e);
    throw new Error('Guaranteed calculation failed. Please check your inputs.');
  }
}

/**
 * Calculate single Lump Sum Payment NPV (Guaranteed)
 * Handles a single lump sum payment with individual date
 * 
 * @param formData - Lump sum form data
 * @returns Guaranteed calculation result
 */
export function calculateLumpSum(formData: { 
  amount: string; 
  lumpSumDate: string; 
  annualIncrease?: number 
}): GuaranteedCalculationResult {
  const { amount, lumpSumDate, annualIncrease = 0 } = formData;
  
  // Validate required data
  if (!amount || !lumpSumDate) {
    const errorMsg = 'Missing required fields for lump sum calculation';
    console.error('[GuaranteedCalculationService] Lump Sum validation failed:', errorMsg);
    throw new Error(errorMsg);
  }
  
  const amountValue = parseFloat(amount);
  if (!amountValue) {
    const errorMsg = 'Invalid payment amount';
    console.error('[GuaranteedCalculationService] Invalid payment amount:', amount);
    throw new Error(errorMsg);
  }
  
  try {
    // Use the same calculation logic as the original LumpSumClientComponent
    const baseRate = BASE_DISCOUNT_RATE;
    const minRate = baseRate + RATE_SPREADS.min;
    const maxRate = baseRate + RATE_SPREADS.max;
    
    const monthsFromToday = calculateMonthsFromToday(lumpSumDate);
    
    if (monthsFromToday < 0) {
      return {
        npv: amountValue,
        minPayout: amountValue,
        maxPayout: amountValue,
        paymentMode: 'Lump Sum',
        paymentAmount: amount,
        annualIncrease: annualIncrease,
        startDate: lumpSumDate,
        endDate: lumpSumDate
      };
    }
    
    const periodicRate = baseRate / 12;
    const discountFactor = Math.pow(1 + periodicRate, monthsFromToday);
    const baseNpv = amountValue / discountFactor;
    
    const minDiscountFactor = Math.pow(1 + minRate / 12, monthsFromToday);
    const maxDiscountFactor = Math.pow(1 + maxRate / 12, monthsFromToday);
    const minNpvBeforeAdjustment = amountValue / minDiscountFactor;
    const maxNpvBeforeAdjustment = amountValue / maxDiscountFactor;
    
    return {
      npv: roundTo2Decimals(baseNpv),
      minPayout: ensureNonNegative(roundUp100(minNpvBeforeAdjustment - AMOUNT_ADJUSTMENTS.min)),
      maxPayout: ensureNonNegative(roundUp100(maxNpvBeforeAdjustment - AMOUNT_ADJUSTMENTS.max)),
      paymentMode: 'Lump Sum',
      paymentAmount: amount,
      annualIncrease: annualIncrease,
      startDate: lumpSumDate,
      endDate: lumpSumDate
    };
  } catch (e: any) {
    console.error('[GuaranteedCalculationService] Lump Sum calculation failed:', e);
    throw new Error('Lump Sum calculation failed. Please check your inputs.');
  }
}

