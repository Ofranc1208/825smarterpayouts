// ============================================================================
// 👨‍👩‍👧‍👦 FAMILY PROTECTION SERVICE - Death Benefit Calculations
// ============================================================================
// Wrapper service for death benefit (family protection) calculations

import { calculateDeathBenefitMaxPV } from '../../../../app/utils/deathBenefit';

/**
 * Calculate Family Protection Value (Death Benefit)
 * Uses the death benefit calculator to determine maximum PV exposure
 * 
 * @param amount - Payment amount
 * @param startDate - Start date of payments
 * @param endDate - End date of payments
 * @param paymentFrequency - Payment frequency (Monthly, Quarterly, etc.)
 * @param increaseRate - Annual increase rate (optional)
 * @returns Family protection NPV
 */
export function calculateFamilyProtection(
  amount: number,
  startDate: string,
  endDate: string,
  paymentFrequency?: string,
  increaseRate?: number
): number {
  try {
    console.log('[FamilyProtectionService] Calculating family protection:', {
      amount,
      startDate,
      endDate,
      paymentFrequency,
      increaseRate
    });

    const familyProtectionValue = calculateDeathBenefitMaxPV(
      amount,
      startDate,
      endDate,
      paymentFrequency,
      increaseRate
    );

    console.log('[FamilyProtectionService] Family protection calculated:', familyProtectionValue);

    return familyProtectionValue;
  } catch (e: any) {
    console.error('[FamilyProtectionService] Calculation failed:', e);
    throw new Error('Family protection calculation failed. Please check your inputs.');
  }
}

/**
 * Calculate Family Protection for multiple lump sum payments
 * 
 * @param totalAmount - Total payment amount
 * @param earliestDate - Earliest payment date
 * @param latestDate - Latest payment date
 * @param increaseRate - Annual increase rate (optional)
 * @returns Family protection NPV
 */
export function calculateFamilyProtectionLumpSum(
  totalAmount: number,
  earliestDate: string,
  latestDate: string,
  increaseRate?: number
): number {
  return calculateFamilyProtection(
    totalAmount,
    earliestDate,
    latestDate,
    'Lump Sum',
    increaseRate
  );
}

