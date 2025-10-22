// ============================================================================
// 💵 LCP LUMP SUM CALCULATOR - LCP Lump Sum Payment Calculations
// ============================================================================
// Handles multiple lump sum payments with LCP health adjustments

import { calculateDeathBenefitMaxPV } from '../../../../app/utils/deathBenefit';
import {
  BASE_DISCOUNT_RATE_LCP,
  AMOUNT_ADJUSTMENTS,
  RATE_SPREADS,
  adjustmentMap
} from '../../../../app/utils/npvConfig';
import { calculateMonthsFromToday } from '../core/dateCalculator';
import { roundUp100, roundTo2Decimals, ensureNonNegative } from '../core/roundingUtils';
import type { LCPCalculationResult } from '../../../types';

export interface LCPLumpSumFormData {
  payments: Array<{ amount: string; lumpSumDate: string }>;
  lcpKeys: string[];
  annualIncrease?: number;
}

/**
 * Calculate LCP Lump Sum Payments NPV
 * Handles multiple lump sum payments with LCP health adjustments
 * Sums all payments first, then applies min/max adjustments to total
 * 
 * @param formData - LCP lump sum form data
 * @returns LCP calculation result
 */
export function calculateLCPLumpSum(formData: LCPLumpSumFormData): LCPCalculationResult {
  const { payments, lcpKeys, annualIncrease = 0 } = formData;
  
  // Validate required data
  if (!payments || payments.length === 0) {
    const errorMsg = 'Missing required payments for LCP lump sum calculation';
    console.error('[LCPLumpSumCalculator] Validation failed:', errorMsg);
    throw new Error(errorMsg);
  }

  if (!lcpKeys || lcpKeys.length === 0) {
    const errorMsg = 'Missing LCP health profile keys for calculation';
    console.error('[LCPLumpSumCalculator] Validation failed:', errorMsg);
    throw new Error(errorMsg);
  }
  
  try {
    // Calculate LCP-adjusted base rate
    const baseRate = BASE_DISCOUNT_RATE_LCP;
    const healthAdjustments = lcpKeys.reduce((sum, key) => sum + (adjustmentMap[key] || 0), 0);
    const adjustedRate = baseRate + healthAdjustments;
    
    console.log('[LCPLumpSumCalculator] Rate calculation:', {
      baseRate,
      healthAdjustments,
      adjustedRate,
      lcpKeys
    });

    let totalNpv = 0;
    let totalMinOffer = 0;
    let totalMaxOffer = 0;

    // Calculate each payment individually with LCP adjustments
    payments.forEach((payment, index) => {
      const amountValue = parseFloat(payment.amount);
      const lumpSumDate = payment.lumpSumDate;
      
      if (!amountValue || !lumpSumDate) {
        console.warn(`[LCPLumpSumCalculator] Skipping invalid payment ${index}:`, payment);
        return;
      }

      // Calculate months from today
      const monthsFromToday = calculateMonthsFromToday(lumpSumDate);
      
      if (monthsFromToday < 0) {
        // Payment is in the past, use full amount
        totalNpv += amountValue;
        totalMinOffer += amountValue;
        totalMaxOffer += amountValue;
        return;
      }
      
      // Calculate NPV with LCP-adjusted rate
      const periodicRate = adjustedRate / 12;
      const discountFactor = Math.pow(1 + periodicRate, monthsFromToday);
      const baseNpv = amountValue / discountFactor;
      
      // Calculate min/max rates for this payment
      const minRate = adjustedRate + RATE_SPREADS.min;
      const maxRate = adjustedRate + RATE_SPREADS.max;
      const minDiscountFactor = Math.pow(1 + minRate / 12, monthsFromToday);
      const maxDiscountFactor = Math.pow(1 + maxRate / 12, monthsFromToday);
      const minNpvBeforeAdjustment = amountValue / minDiscountFactor;
      const maxNpvBeforeAdjustment = amountValue / maxDiscountFactor;
      
      totalNpv += baseNpv;
      totalMinOffer += minNpvBeforeAdjustment;
      totalMaxOffer += maxNpvBeforeAdjustment;
    });

    // Calculate Family Protection using Death Benefit calculation
    const totalPaymentAmount = payments.reduce((sum, payment) => {
      return sum + parseFloat(payment.amount || '0');
    }, 0);

    const familyProtectionNPV = calculateDeathBenefitMaxPV(
      totalPaymentAmount,
      payments[0]?.lumpSumDate || '',
      payments[payments.length - 1]?.lumpSumDate || '',
      'Lump Sum',
      annualIncrease
    );

    // Apply min/max adjustments to the TOTAL sum (not individual payments)
    const finalMinPayout = ensureNonNegative(roundUp100(totalMinOffer - AMOUNT_ADJUSTMENTS.min));
    const finalMaxPayout = ensureNonNegative(roundUp100(totalMaxOffer - AMOUNT_ADJUSTMENTS.max));
    
    console.log('[LCPLumpSumCalculator] Final calculation:', {
      totalNpv,
      totalMinOffer,
      totalMaxOffer,
      finalMinPayout,
      finalMaxPayout,
      familyProtectionNPV,
      paymentCount: payments.length
    });

    return {
      npv: roundTo2Decimals(totalNpv),
      minPayout: finalMinPayout,
      maxPayout: finalMaxPayout,
      familyProtectionNPV: roundTo2Decimals(familyProtectionNPV),
      paymentData: { paymentMode: 'Lump Sum', amount: payments.map(p => p.amount).join(', ') },
      detailsData: { 
        startDate: payments[0]?.lumpSumDate || '', 
        endDate: payments[payments.length - 1]?.lumpSumDate || '', 
        annualIncrease 
      },
      profileData: { ageRange: '', gender: '', bodyFrame: '' }, // Will be filled by caller
      lifestyleData: { weight: '' }, // Will be filled by caller
      healthData: { smoke: '', health: '', cardiac: '' }, // Will be filled by caller
      lcpKeys
    };
  } catch (e: any) {
    console.error('[LCPLumpSumCalculator] Calculation failed:', e);
    throw new Error('LCP Lump Sum calculation failed. Please check your inputs.');
  }
}

