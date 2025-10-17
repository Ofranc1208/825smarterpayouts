// Calculator State Service - Handles state management and persistence
// ==================================================================

import { 
  CalculatorFormData, 
  CalculatorStep, 
  LCPCalculationResult, 
  CalculationError 
} from '../../../types';
import { CalculatorState } from './types';

export class CalculatorStateService {
  /**
   * Create initial calculator state
   */
  static createInitialState(): CalculatorState {
    return {
      currentStep: null,
      formData: {
        guaranteedData: {},
        lcpData: {}
      },
      lcpResult: null,
      lcpError: undefined,
      lcpShowResults: false,
      repromptCounter: 0
    };
  }

  /**
   * Determine current step based on active flows
   */
  static determineCurrentStep(
    compareOfferStep: CalculatorStep | null,
    lcpCurrentStep: CalculatorStep | null,
    guaranteedCurrentStep: CalculatorStep | null
  ): CalculatorStep | null {
    // Prioritize compare offer, then LCP flow, then guaranteed flow
    return compareOfferStep || lcpCurrentStep || guaranteedCurrentStep;
  }

  /**
   * Create form data structure
   */
  static createFormData(
    guaranteedData: any,
    lcpData: any
  ): CalculatorFormData {
    return {
      guaranteedData: guaranteedData || {},
      lcpData: lcpData || {}
    };
  }

  /**
   * Check if step belongs to specific flow
   */
  static isLCPStep(step: CalculatorStep): boolean {
    return typeof step === 'string' && step.startsWith('lcp_');
  }

  static isCompareOfferStep(step: CalculatorStep): boolean {
    return typeof step === 'string' && step.startsWith('compare-offer');
  }

  static isGuaranteedStep(step: CalculatorStep): boolean {
    if (!step) return false;
    return !this.isLCPStep(step) && !this.isCompareOfferStep(step);
  }

  /**
   * Update state immutably
   */
  static updateState(
    currentState: CalculatorState,
    updates: Partial<CalculatorState>
  ): CalculatorState {
    return {
      ...currentState,
      ...updates
    };
  }

  /**
   * Validate state structure
   */
  static isValidState(state: any): state is CalculatorState {
    return (
      state &&
      typeof state === 'object' &&
      'formData' in state &&
      'repromptCounter' in state &&
      typeof state.repromptCounter === 'number'
    );
  }

  /**
   * Get flow type from step
   */
  static getFlowTypeFromStep(step: CalculatorStep): 'guaranteed' | 'lcp' | 'compare-offer' | null {
    if (!step) return null;
    
    if (this.isLCPStep(step)) return 'lcp';
    if (this.isCompareOfferStep(step)) return 'compare-offer';
    return 'guaranteed';
  }

  /**
   * Increment reprompt counter
   */
  static incrementRepromptCounter(currentCounter: number): number {
    return currentCounter + 1;
  }
}
