// ============================================================================
// 🧮 CALCULATION SERVICE - Centralized Business Logic
// ============================================================================
// This service contains all NPV calculation logic, separating business logic
// from React hooks and improving maintainability and testability.

import {
  calcNPVWithAdjustment,
  calculateMinMaxNPV,
  calculateGuaranteedNPV,
  PaymentFrequency
} from '../../app/utils/npvCalculations';
import { 
  BASE_DISCOUNT_RATE, 
  BASE_DISCOUNT_RATE_LCP,
  AMOUNT_ADJUSTMENTS, 
  FAMILY_PROTECTION_DISCOUNT_RATE,
  RATE_SPREADS,
  adjustmentMap
} from '../../app/utils/npvConfig';
import { LCPMappingService } from '../utils/lcpMappingService';
import { 
  LCPFormData, 
  LCPCalculationResult, 
  GuaranteedFormData, 
  GuaranteedCalculationResult,
  CalculationError 
} from '../types';

export class CalculationService {
  
  /**
   * 🎯 Calculate Life-Contingent Payments NPV
   * Extracted from useLCPFlow.ts for better separation of concerns
   */
  public static calculateLCP(formData: LCPFormData): LCPCalculationResult {
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
      console.error('[CalculationService] LCP validation failed:', errorMsg);
      throw new Error(errorMsg);
    }
    
    // Ensure all required data is present before creating result
    if (!formData.paymentData || !formData.detailsData || 
        !formData.profileData || !formData.lifestyleData || 
        !formData.healthData) {
      const errorMsg = 'Missing required form data for LCP calculation';
      console.error('[CalculationService] LCP data validation failed:', errorMsg);
      throw new Error(errorMsg);
    }
    
    try {
      const baseRate = 0.085;
      
      // Debug: Log the LCP keys and their adjustments
      console.log('[CalculationService] LCP Keys:', lcpKeys);
      const adjustments = lcpKeys.map(key => ({ key, adjustment: adjustmentMap[key] || 0 }));
      console.log('[CalculationService] Adjustments:', adjustments);
      
      const mainResult = calcNPVWithAdjustment({
        amount,
        startDate,
        endDate,
        baseRate,
        lcpKeys,
        paymentMode: paymentMode as PaymentFrequency,
        increaseRate
      });
      
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
      
      const familyProtection = calculateGuaranteedNPV({
        amount,
        startDate,
        endDate,
        discountRate: FAMILY_PROTECTION_DISCOUNT_RATE * 100,
        paymentMode: paymentMode as PaymentFrequency,
        increaseRate
      });
      
      // Debug: Log the final rates being used
      const totalAdjustment = lcpKeys.reduce((sum, k) => sum + (adjustmentMap[k] || 0), 0);
      const finalRate = baseRate + totalAdjustment;
      console.log('[CalculationService] Final discount rate:', {
        baseRate,
        totalAdjustment,
        finalRate: (finalRate * 100).toFixed(2) + '%'
      });
      
      const calculationResult: LCPCalculationResult = {
        npv: mainResult.npv,
        minPayout: minMax.minOffer,
        maxPayout: minMax.maxOffer,
        familyProtectionNPV: familyProtection.npv,
        paymentData: formData.paymentData,
        detailsData: formData.detailsData,
        profileData: formData.profileData,
        lifestyleData: formData.lifestyleData,
        healthData: formData.healthData,
        lcpKeys
      };
      
      return calculationResult;
    } catch (e: any) {
      console.error('[CalculationService] LCP calculation failed:', e);
      throw new Error('LCP calculation failed. Please check your inputs.');
    }
  }

  /**
   * 🎯 Calculate Lump Sum Payments NPV (Guaranteed)
   * Handles multiple lump sum payments with individual dates
   */
  public static calculateLumpSum(formData: { amount: string; lumpSumDate: string; annualIncrease?: number }): GuaranteedCalculationResult {
    const { amount, lumpSumDate, annualIncrease = 0 } = formData;
    
    // Validate required data
    if (!amount || !lumpSumDate) {
      const errorMsg = 'Missing required fields for lump sum calculation';
      console.error('[CalculationService] Lump Sum validation failed:', errorMsg);
      throw new Error(errorMsg);
    }
    
    const amountValue = parseFloat(amount);
    if (!amountValue) {
      const errorMsg = 'Invalid payment amount';
      console.error('[CalculationService] Invalid payment amount:', amount);
      throw new Error(errorMsg);
    }
    
    try {
      // Use the same calculation logic as the original LumpSumClientComponent
      const baseRate = BASE_DISCOUNT_RATE;
      const minRate = baseRate + RATE_SPREADS.min;
      const maxRate = baseRate + RATE_SPREADS.max;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const lumpDate = new Date(lumpSumDate);
      lumpDate.setHours(0, 0, 0, 0);
      
      const yearsDiff = lumpDate.getFullYear() - today.getFullYear();
      const monthsDiff = lumpDate.getMonth() - today.getMonth();
      const daysDiff = lumpDate.getDate() - today.getDate();
      const monthsFromToday = yearsDiff * 12 + monthsDiff + daysDiff / 30.44;
      
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
      
      const roundUp100 = (val: number) => Math.ceil((val - 0.001) / 100) * 100;
      
      return {
        npv: parseFloat(baseNpv.toFixed(2)),
        minPayout: Math.max(0, roundUp100(minNpvBeforeAdjustment - AMOUNT_ADJUSTMENTS.min)),
        maxPayout: Math.max(0, roundUp100(maxNpvBeforeAdjustment - AMOUNT_ADJUSTMENTS.max)),
        paymentMode: 'Lump Sum',
        paymentAmount: amount,
        annualIncrease: annualIncrease,
        startDate: lumpSumDate,
        endDate: lumpSumDate
      };
    } catch (e: any) {
      console.error('[CalculationService] Lump Sum calculation failed:', e);
      throw new Error('Lump Sum calculation failed. Please check your inputs.');
    }
  }

  /**
   * 🎯 Calculate LCP Lump Sum Payments NPV
   * Handles multiple lump sum payments with LCP health adjustments
   * Sums all payments first, then applies min/max adjustments to total
   */
  public static calculateLCPLumpSum(
    formData: { 
      payments: Array<{ amount: string; lumpSumDate: string }>;
      lcpKeys: string[];
      annualIncrease?: number;
    }
  ): LCPCalculationResult {
    const { payments, lcpKeys, annualIncrease = 0 } = formData;
    
    // Validate required data
    if (!payments || payments.length === 0) {
      const errorMsg = 'Missing required payments for LCP lump sum calculation';
      console.error('[CalculationService] LCP Lump Sum validation failed:', errorMsg);
      throw new Error(errorMsg);
    }

    if (!lcpKeys || lcpKeys.length === 0) {
      const errorMsg = 'Missing LCP health profile keys for calculation';
      console.error('[CalculationService] LCP Lump Sum validation failed:', errorMsg);
      throw new Error(errorMsg);
    }
    
    try {
      // Calculate LCP-adjusted base rate
      const baseRate = BASE_DISCOUNT_RATE_LCP;
      const healthAdjustments = lcpKeys.reduce((sum, key) => sum + (adjustmentMap[key] || 0), 0);
      const adjustedRate = baseRate + healthAdjustments;
      
      console.log('[CalculationService] LCP Lump Sum rate calculation:', {
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
          console.warn(`[CalculationService] Skipping invalid payment ${index}:`, payment);
          return;
        }

        // Calculate single payment NPV with LCP-adjusted rate
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const lumpDate = new Date(lumpSumDate);
        lumpDate.setHours(0, 0, 0, 0);
        
        const yearsDiff = lumpDate.getFullYear() - today.getFullYear();
        const monthsDiff = lumpDate.getMonth() - today.getMonth();
        const daysDiff = lumpDate.getDate() - today.getDate();
        const monthsFromToday = yearsDiff * 12 + monthsDiff + daysDiff / 30.44;
        
        if (monthsFromToday < 0) {
          // Payment is in the past, use full amount
          totalNpv += amountValue;
          totalMinOffer += amountValue;
          totalMaxOffer += amountValue;
          return;
        }
        
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

      // Calculate Family Protection NPV using the same logic as regular LCP
      let familyProtectionNPV = 0;
      payments.forEach((payment) => {
        const amountValue = parseFloat(payment.amount);
        const lumpSumDate = payment.lumpSumDate;
        
        if (!amountValue || !lumpSumDate) {
          return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const lumpDate = new Date(lumpSumDate);
        lumpDate.setHours(0, 0, 0, 0);
        
        const yearsDiff = lumpDate.getFullYear() - today.getFullYear();
        const monthsDiff = lumpDate.getMonth() - today.getMonth();
        const daysDiff = lumpDate.getDate() - today.getDate();
        const monthsFromToday = yearsDiff * 12 + monthsDiff + daysDiff / 30.44;
        
        if (monthsFromToday < 0) {
          familyProtectionNPV += amountValue;
          return;
        }
        
        // Use FAMILY_PROTECTION_DISCOUNT_RATE for family protection calculation
        const familyProtectionRate = FAMILY_PROTECTION_DISCOUNT_RATE;
        const periodicRate = familyProtectionRate / 12;
        const discountFactor = Math.pow(1 + periodicRate, monthsFromToday);
        const familyProtectionNPVForPayment = amountValue / discountFactor;
        
        familyProtectionNPV += familyProtectionNPVForPayment;
      });

      // Apply min/max adjustments to the TOTAL sum (not individual payments)
      const roundUp100 = (val: number) => Math.ceil((val - 0.001) / 100) * 100;
      
      const finalMinPayout = Math.max(0, roundUp100(totalMinOffer - AMOUNT_ADJUSTMENTS.min));
      const finalMaxPayout = Math.max(0, roundUp100(totalMaxOffer - AMOUNT_ADJUSTMENTS.max));
      
      console.log('[CalculationService] LCP Lump Sum final calculation:', {
        totalNpv,
        totalMinOffer,
        totalMaxOffer,
        finalMinPayout,
        finalMaxPayout,
        familyProtectionNPV,
        paymentCount: payments.length
      });

      return {
        npv: parseFloat(totalNpv.toFixed(2)),
        minPayout: finalMinPayout,
        maxPayout: finalMaxPayout,
        familyProtectionNPV: parseFloat(familyProtectionNPV.toFixed(2)),
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
      console.error('[CalculationService] LCP Lump Sum calculation failed:', e);
      throw new Error('LCP Lump Sum calculation failed. Please check your inputs.');
    }
  }

  /**
   * 🎯 Calculate Guaranteed Payments NPV
   * Handles both regular payments and lump sum payments
   */
  public static calculateGuaranteed(formData: GuaranteedFormData): GuaranteedCalculationResult {
    const { paymentAmount, startDate, endDate, paymentMode, annualIncrease, payments } = formData;
    
    // Check if this is a lump sum payment calculation
    if (paymentMode === 'Lump Sum' && payments && payments.length > 0) {
      console.log('[CalculationService] Calculating Guaranteed Lump Sum with payments:', payments);
      return this.calculateGuaranteedLumpSum(formData);
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
      console.error('[CalculationService] Guaranteed validation failed:', errorMsg);
      throw new Error(errorMsg);
    }
    
    const amount = parseFloat(paymentAmount);
    if (!amount) {
      const errorMsg = 'Invalid payment amount';
      console.error('[CalculationService] Invalid payment amount:', paymentAmount);
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
      console.error('[CalculationService] Guaranteed calculation failed:', e);
      throw new Error('Guaranteed calculation failed. Please check your inputs.');
    }
  }

  /**
   * 🎯 Calculate Guaranteed Lump Sum Payments NPV
   * Handles multiple lump sum payments for guaranteed flow
   */
  private static calculateGuaranteedLumpSum(formData: GuaranteedFormData): GuaranteedCalculationResult {
    const { payments, annualIncrease = 0 } = formData;
    
    if (!payments || payments.length === 0) {
      throw new Error('Missing payments for Guaranteed Lump Sum calculation');
    }
    
    console.log('[CalculationService] Calculating Guaranteed Lump Sum for payments:', payments);
    
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
        console.warn(`[CalculationService] Skipping invalid payment ${index + 1}`);
        return;
      }
      
      // Track date range for display purposes
      if (!earliestDate || lumpSumDate < earliestDate) {
        earliestDate = lumpSumDate;
      }
      if (!latestDate || lumpSumDate > latestDate) {
        latestDate = lumpSumDate;
      }
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const lumpDate = new Date(lumpSumDate);
      lumpDate.setHours(0, 0, 0, 0);
      
      const yearsDiff = lumpDate.getFullYear() - today.getFullYear();
      const monthsDiff = lumpDate.getMonth() - today.getMonth();
      const daysDiff = lumpDate.getDate() - today.getDate();
      const monthsFromToday = yearsDiff * 12 + monthsDiff + daysDiff / 30.44;
      
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
    const roundUp100 = (val: number) => Math.ceil((val - 0.001) / 100) * 100;
    const finalMinPayout = Math.max(0, roundUp100(totalMinOffer - AMOUNT_ADJUSTMENTS.min));
    const finalMaxPayout = Math.max(0, roundUp100(totalMaxOffer - AMOUNT_ADJUSTMENTS.max));
    
    // Calculate total payment amount for display
    const totalPaymentAmount = payments.reduce((sum, payment) => {
      const amount = parseFloat(payment.amount) || 0;
      return sum + amount;
    }, 0);
    
    console.log('[CalculationService] Guaranteed Lump Sum calculation result:', {
      totalNpv,
      finalMinPayout,
      finalMaxPayout,
      totalPaymentAmount,
      paymentCount: payments.length
    });
    
    return {
      npv: parseFloat(totalNpv.toFixed(2)),
      minPayout: finalMinPayout,
      maxPayout: finalMaxPayout,
      paymentMode: 'Lump Sum',
      paymentAmount: totalPaymentAmount.toString(),
      annualIncrease: annualIncrease,
      startDate: earliestDate,
      endDate: latestDate
    };
  }

  /**
   * 🎯 Calculate both LCP and Guaranteed for comparison
   * Utility method for comparing different payment types
   */
  public static calculateComparison(
    lcpFormData: LCPFormData, 
    guaranteedFormData: GuaranteedFormData
  ): {
    lcp: LCPCalculationResult;
    guaranteed: GuaranteedCalculationResult;
  } {
    const lcpResult = this.calculateLCP(lcpFormData);
    const guaranteedResult = this.calculateGuaranteed(guaranteedFormData);
    
    return {
      lcp: lcpResult,
      guaranteed: guaranteedResult
    };
  }

  /**
   * 🎯 Validate form data before calculation
   * Pre-calculation validation to catch errors early
   */
  public static validateLCPFormData(formData: LCPFormData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!formData.paymentData?.amount) errors.push('Payment amount is required');
    if (!formData.paymentData?.paymentMode) errors.push('Payment mode is required');
    if (!formData.detailsData?.startDate) errors.push('Start date is required');
    if (!formData.detailsData?.endDate) errors.push('End date is required');
    if (!formData.profileData?.ageRange) errors.push('Age range is required');
    if (!formData.profileData?.gender) errors.push('Gender is required');
    if (!formData.profileData?.bodyFrame) errors.push('Body frame is required');
    if (!formData.lifestyleData?.weight) errors.push('Weight category is required');
    if (!formData.healthData?.smoke) errors.push('Smoking status is required');
    if (!formData.healthData?.health) errors.push('Health status is required');
    if (!formData.healthData?.cardiac) errors.push('Cardiac condition is required');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * 🎯 Validate guaranteed form data before calculation
   */
  public static validateGuaranteedFormData(formData: GuaranteedFormData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!formData.paymentAmount) errors.push('Payment amount is required');
    if (!formData.paymentMode) errors.push('Payment mode is required');
    if (!formData.startDate) errors.push('Start date is required');
    if (!formData.endDate) errors.push('End date is required');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
} 