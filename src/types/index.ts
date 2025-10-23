// ============================================================================
// 🎯 CORE TYPE DEFINITIONS - Production Ready Type Safety
// ============================================================================
// This file provides comprehensive TypeScript interfaces for all core data structures
// to eliminate unsafe 'any' types and improve code reliability and maintainability.

// ============================================================================
// FORM DATA STRUCTURES
// ============================================================================

/**
 * Life-Contingent Payments Form Data Structure
 * Contains all data collected during the LCP flow
 */
export interface LCPFormData {
  paymentData?: LCPPaymentData;
  detailsData?: LCPDetailsData;
  profileData?: LCPProfileData;
  lifestyleData?: LCPLifestyleData;
  healthData?: LCPHealthData;
  lumpSumPayments?: Array<{ amount: string; lumpSumDate: string }>;
}

/**
 * Guaranteed Payments Form Data Structure
 * Contains all data collected during the Guaranteed flow
 */
export interface GuaranteedFormData {
  paymentMode?: string;
  annualIncrease?: number;
  paymentAmount?: string;
  startDate?: string;
  endDate?: string;
  payments?: Array<{ amount: string; lumpSumDate: string }>;
  calculationResult?: GuaranteedCalculationResult | null;
}

// ============================================================================
// LCP STEP-SPECIFIC DATA STRUCTURES
// ============================================================================

/**
 * Payment step data for LCP flow
 */
export interface LCPPaymentData {
  paymentMode: string;
  amount: string;
}

/**
 * Details step data for LCP flow
 */
export interface LCPDetailsData {
  annualIncrease: number;
  startDate: string;
  endDate: string;
}

/**
 * Profile step data for LCP flow
 */
export interface LCPProfileData {
  ageRange: string;
  gender: string;
  bodyFrame: string;
}

/**
 * Lifestyle step data for LCP flow
 */
export interface LCPLifestyleData {
  weight: string;
}

/**
 * Health step data for LCP flow
 */
export interface LCPHealthData {
  smoke: string;
  health: string;
  cardiac: string;
}

// ============================================================================
// CALCULATION RESULT STRUCTURES
// ============================================================================

/**
 * Life-Contingent Payments Calculation Result
 * Contains all calculated values and input data for LCP calculations
 */
export interface LCPCalculationResult {
  npv: number;
  minPayout: number;
  maxPayout: number;
  familyProtectionNPV: number;
  paymentData: LCPPaymentData;
  detailsData: LCPDetailsData;
  profileData: LCPProfileData;
  lifestyleData: LCPLifestyleData;
  healthData: LCPHealthData;
  lcpKeys: string[];
  lumpSumPayments?: Array<{ amount: string; lumpSumDate: string }>;
}

/**
 * Guaranteed Payments Calculation Result
 * Contains all calculated values and input data for Guaranteed calculations
 */
export interface GuaranteedCalculationResult {
  npv: number;
  minPayout: number;
  maxPayout: number;
  paymentMode: string;
  paymentAmount: string;
  annualIncrease: number;
  startDate: string;
  endDate: string;
}

// ============================================================================
// CONTEXT STATE STRUCTURES
// ============================================================================

/**
 * Complete Calculator Form Data combining both flows
 */
export interface CalculatorFormData {
  guaranteedData: GuaranteedFormData;
  lcpData: LCPFormData;
}

/**
 * Review data structure for guaranteed flow
 */
export interface GuaranteedReviewData {
  paymentMode: string;
  paymentAmount: string;
  annualIncrease: number;
  startDate: string;
  endDate: string;
}

// ============================================================================
// STEP TYPE DEFINITIONS
// ============================================================================

export type GuaranteedStep = 'select_type' | 'mode' | 'increase' | 'amount' | 'dates' | 'review' | 'offer';
export type LCPStep = 'lcp_payment' | 'lcp_details' | 'lcp_profile' | 'lcp_lifestyle' | 'lcp_health' | 'lcp_lump_sum' | 'lcp_review' | 'lcp_results';
export type CompareOfferStep = 'compare-offer-choice' | 'compare-offer-details' | 'compare-offer-review' | 'compare-offer-results';
export type CalculatorStep = GuaranteedStep | LCPStep | CompareOfferStep;

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Generic calculation error type
 */
export interface CalculationError {
  message: string;
  code?: string;
  details?: any;
}

/**
 * Calculation state for tracking loading/error states
 */
export interface CalculationState {
  isLoading: boolean;
  error: CalculationError | null;
  result: LCPCalculationResult | GuaranteedCalculationResult | null;
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard to check if result is LCP calculation result
 */
export function isLCPCalculationResult(result: any): result is LCPCalculationResult {
  return result && 
         typeof result.npv === 'number' &&
         typeof result.minPayout === 'number' &&
         typeof result.maxPayout === 'number' &&
         typeof result.familyProtectionNPV === 'number' &&
         Array.isArray(result.lcpKeys);
}

/**
 * Type guard to check if result is Guaranteed calculation result
 */
export function isGuaranteedCalculationResult(result: any): result is GuaranteedCalculationResult {
  return result && 
         typeof result.npv === 'number' &&
         typeof result.minPayout === 'number' &&
         typeof result.maxPayout === 'number' &&
         typeof result.paymentMode === 'string';
}

/**
 * Type guard to check if form data is LCP form data
 */
export function isLCPFormData(data: any): data is LCPFormData {
  return data && typeof data === 'object' && 
         (data.paymentData || data.detailsData || data.profileData || data.lifestyleData || data.healthData);
}

/**
 * Type guard to check if form data is Guaranteed form data
 */
export function isGuaranteedFormData(data: any): data is GuaranteedFormData {
  return data && typeof data === 'object' &&
         (data.paymentMode !== undefined || data.paymentAmount !== undefined || 
          data.annualIncrease !== undefined || data.startDate !== undefined || data.endDate !== undefined);
} 