// ============================================================================
// 💰 LCP CALCULATION SERVICE - Life-Contingent Payment Calculations
// ============================================================================
// Main service for calculating Life-Contingent Payments with health adjustments

import {
  calcNPVWithAdjustment,
  calculateMinMaxNPV,
  PaymentFrequency
} from '../../../../app/utils/npvCalculations';
import { calculateDeathBenefitMaxPV } from '../../../../app/utils/deathBenefit';
import {
  BASE_DISCOUNT_RATE_LCP,
  AMOUNT_ADJUSTMENTS,
  adjustmentMap
} from '../../../../app/utils/npvConfig';
import { LCPMappingService } from '../../../utils/lcpMappingService';
import type { LCPFormData, LCPCalculationResult } from '../../../types';

/**
 * Calculate Life-Contingent Payments NPV
 * Main calculation for LCP with health profile adjustments
 * 
 * @param formData - Complete LCP form data
 * @returns LCP calculation result with min/max payouts and family protection
 */
export function calculateLCP(formData: LCPFormData): LCPCalculationResult {
  // Extract basic payment and date info from form data
  const amount = Number(formData.paymentData?.amount || 0);
  const paymentMode = formData.paymentData?.paymentMode || 'Monthly';
  const startDate = formData.detailsData?.startDate || '';
  const endDate = formData.detailsData?.endDate || '';
  const increaseRate = formData.detailsData?.annualIncrease || 0;
  
  // Use the mapping function to get properly formatted LCP keys
  const lcpKeys = LCPMappingService.mapFormValuesToCalculationKeys(formData);

  // Validate required fields
  if (!amount || !paymentMode || !startDate || !endDate) {
    const missingFields = [];
    if (!amount) missingFields.push('amount');
    if (!paymentMode) missingFields.push('paymentMode');
    if (!startDate) missingFields.push('startDate');
    if (!endDate) missingFields.push('endDate');
    
    const errorMsg = `Missing required fields: ${missingFields.join(', ')}`;
    console.error('[LCPCalculationService] Validation failed:', errorMsg);
    throw new Error(errorMsg);
  }
  
  // Ensure all required data is present before creating result
  if (!formData.paymentData || !formData.detailsData || 
      !formData.profileData || !formData.lifestyleData || 
      !formData.healthData) {
    const errorMsg = 'Missing required form data for LCP calculation';
    console.error('[LCPCalculationService] Data validation failed:', errorMsg);
    throw new Error(errorMsg);
  }
  
  try {
    const baseRate = BASE_DISCOUNT_RATE_LCP;
    
    // Debug: Log the LCP keys and their adjustments
    console.log('[LCPCalculationService] LCP Keys:', lcpKeys);
    const adjustments = lcpKeys.map(key => ({ key, adjustment: adjustmentMap[key] || 0 }));
    console.log('[LCPCalculationService] Adjustments:', adjustments);
    
    // Calculate main NPV with LCP health adjustments
    const mainResult = calcNPVWithAdjustment({
      amount,
      startDate,
      endDate,
      baseRate,
      lcpKeys,
      paymentMode: paymentMode as PaymentFrequency,
      increaseRate
    });
    
    // Calculate min/max payout range
    const minMax = calculateMinMaxNPV({
      amount,
      startDate,
      endDate,
      baseRate,
      paymentMode: paymentMode as PaymentFrequency,
      increaseRate,
      isLCP: true,
      lcpKeys,
      minAdjustment: AMOUNT_ADJUSTMENTS.min,
      maxAdjustment: AMOUNT_ADJUSTMENTS.max
    });
    
    // Calculate Family Protection using Death Benefit calculation
    const familyProtectionNPV = calculateDeathBenefitMaxPV(
      amount,
      startDate,
      endDate,
      paymentMode,
      increaseRate
    );
    
    // Debug: Log the final rates being used
    const totalAdjustment = lcpKeys.reduce((sum, k) => sum + (adjustmentMap[k] || 0), 0);
    const finalRate = baseRate + totalAdjustment;
    console.log('[LCPCalculationService] Final discount rate:', {
      baseRate,
      totalAdjustment,
      finalRate: (finalRate * 100).toFixed(2) + '%'
    });
    
    const calculationResult: LCPCalculationResult = {
      npv: mainResult.npv,
      minPayout: minMax.minOffer,
      maxPayout: minMax.maxOffer,
      familyProtectionNPV: familyProtectionNPV,
      paymentData: formData.paymentData,
      detailsData: formData.detailsData,
      profileData: formData.profileData,
      lifestyleData: formData.lifestyleData,
      healthData: formData.healthData,
      lcpKeys
    };
    
    return calculationResult;
  } catch (e: any) {
    console.error('[LCPCalculationService] Calculation failed:', e);
    throw new Error('LCP calculation failed. Please check your inputs.');
  }
}

