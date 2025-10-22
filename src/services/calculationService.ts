// ============================================================================
// 🧮 CALCULATION SERVICE - Orchestrator (Refactored)
// ============================================================================
// This service acts as the main orchestrator/coordinator for all NPV calculations.
// It delegates to specialized calculation modules while maintaining the same API.
// 
// ARCHITECTURE: Orchestration Pattern
// - Keeps the same CalculationService class and method signatures
// - Delegates implementation to specialized modules in ./calculations/
// - Zero breaking changes to existing code
// - Maintains backward compatibility

import type { 
  LCPFormData, 
  LCPCalculationResult, 
  GuaranteedFormData, 
  GuaranteedCalculationResult 
} from '../types';

// Import calculation services
import { calculateLCP as lcpCalculate } from './calculations/lcp/LCPCalculationService';
import { calculateLCPLumpSum as lcpLumpSumCalculate } from './calculations/lcp/LCPLumpSumCalculator';
import { 
  calculateGuaranteed as guaranteedCalculate,
  calculateLumpSum as lumpSumCalculate 
} from './calculations/guaranteed/GuaranteedCalculationService';

// Import validators
import { validateLCPFormData as validateLCP } from './calculations/validators/LCPValidator';
import { validateGuaranteedFormData as validateGuaranteed } from './calculations/validators/GuaranteedValidator';

/**
 * Main Calculation Service Orchestrator
 * Coordinates all calculation operations by delegating to specialized services
 */
export class CalculationService {
  
  /**
   * 🎯 Calculate Life-Contingent Payments NPV
   * Delegates to LCP calculation service
   * 
   * @param formData - LCP form data
   * @returns LCP calculation result
   */
  public static calculateLCP(formData: LCPFormData): LCPCalculationResult {
    return lcpCalculate(formData);
  }

  /**
   * 🎯 Calculate Lump Sum Payments NPV (Guaranteed)
   * Delegates to Guaranteed lump sum calculator
   * 
   * @param formData - Lump sum form data
   * @returns Guaranteed calculation result
   */
  public static calculateLumpSum(formData: { 
    amount: string; 
    lumpSumDate: string; 
    annualIncrease?: number 
  }): GuaranteedCalculationResult {
    return lumpSumCalculate(formData);
  }

  /**
   * 🎯 Calculate LCP Lump Sum Payments NPV
   * Delegates to LCP lump sum calculator
   * 
   * @param formData - LCP lump sum form data
   * @returns LCP calculation result
   */
  public static calculateLCPLumpSum(
    formData: { 
      payments: Array<{ amount: string; lumpSumDate: string }>;
      lcpKeys: string[];
      annualIncrease?: number;
    }
  ): LCPCalculationResult {
    return lcpLumpSumCalculate(formData);
  }

  /**
   * 🎯 Calculate Guaranteed Payments NPV
   * Delegates to Guaranteed calculation service
   * 
   * @param formData - Guaranteed form data
   * @returns Guaranteed calculation result
   */
  public static calculateGuaranteed(formData: GuaranteedFormData): GuaranteedCalculationResult {
    return guaranteedCalculate(formData);
  }

  /**
   * 🎯 Calculate both LCP and Guaranteed for comparison
   * Utility method for comparing different payment types
   * 
   * @param lcpFormData - LCP form data
   * @param guaranteedFormData - Guaranteed form data
   * @returns Both calculation results
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
   * 🎯 Validate LCP form data before calculation
   * Delegates to LCP validator
   * 
   * @param formData - LCP form data to validate
   * @returns Validation result with errors
   */
  public static validateLCPFormData(formData: LCPFormData): { isValid: boolean; errors: string[] } {
    return validateLCP(formData);
  }

  /**
   * 🎯 Validate Guaranteed form data before calculation
   * Delegates to Guaranteed validator
   * 
   * @param formData - Guaranteed form data to validate
   * @returns Validation result with errors
   */
  public static validateGuaranteedFormData(formData: GuaranteedFormData): { isValid: boolean; errors: string[] } {
    return validateGuaranteed(formData);
  }
}
