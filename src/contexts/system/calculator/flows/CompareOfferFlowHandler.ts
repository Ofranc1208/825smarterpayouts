// Compare Offer Flow Handler - Manages compare offer calculator flow
// ==================================================================

import { CompareOfferStep, CalculatorStep } from '../../../../types';
import { FlowHandler } from '../types';
import { CalculatorMessageService } from '../CalculatorMessageService';

export interface CompareOfferFormData {
  existingOfferAmount?: string;
  paymentAmount?: string;
  paymentFrequency?: 'monthly' | 'quarterly' | 'semiannually' | 'annually';
  companyName?: string;
  calculatedOfferAmount?: number;
  difference?: number;
  percentageDifference?: number;
  isBetterOffer?: boolean;
}

export class CompareOfferFlowHandler implements FlowHandler {
  private compareOfferStep: CompareOfferStep | null;
  private setCompareOfferStep: (step: CompareOfferStep | null) => void;
  private logUserChoiceAsMessage: (text: string) => void;
  private compareOfferData: CompareOfferFormData = {};

  constructor(
    compareOfferStep: CompareOfferStep | null,
    setCompareOfferStep: (step: CompareOfferStep | null) => void,
    logUserChoiceAsMessage: (text: string) => void
  ) {
    this.compareOfferStep = compareOfferStep;
    this.setCompareOfferStep = setCompareOfferStep;
    this.logUserChoiceAsMessage = logUserChoiceAsMessage;
  }

  /**
   * Check if this handler can handle the given step
   */
  canHandle(step: CalculatorStep): boolean {
    if (!step) return false;
    
    return typeof step === 'string' && step.startsWith('compare-offer');
  }

  /**
   * Handle step navigation
   */
  handleStep(step: CalculatorStep, data?: any): void {
    if (!this.canHandle(step)) {
      console.warn('[CompareOfferFlowHandler] Cannot handle step:', step);
      return;
    }

    console.log('[CompareOfferFlowHandler] Navigating to step:', step);
    
    // Update data if provided
    if (data) {
      this.updateFormData(data);
    }
    
    this.setCompareOfferStep(step as CompareOfferStep);
  }

  /**
   * Update form data
   */
  updateFormData(data: Partial<CompareOfferFormData>): void {
    console.log('[CompareOfferFlowHandler] Updating form data:', data);
    this.compareOfferData = { ...this.compareOfferData, ...data };
  }

  /**
   * Get current form data
   */
  getFormData(): CompareOfferFormData {
    return this.compareOfferData;
  }

  /**
   * Handle offer choice selection
   */
  handleOfferChoice(choice: string): void {
    console.log('[CompareOfferFlowHandler] Offer choice selected:', choice);
    CalculatorMessageService.logUserChoice(`Compare offer: ${choice}`, this.logUserChoiceAsMessage);
    
    if (choice === 'Help me compare my offer') {
      this.handleStep('compare-offer-details');
    } else if (choice === 'Upload Offer Document') {
      // Future: Handle document upload
      console.log('[CompareOfferFlowHandler] Document upload not yet implemented');
    }
  }

  /**
   * Handle offer details submission
   */
  handleOfferDetails(details: Partial<CompareOfferFormData>): void {
    console.log('[CompareOfferFlowHandler] Offer details submitted:', details);
    CalculatorMessageService.logUserChoice('Offer details provided', this.logUserChoiceAsMessage);
    
    this.updateFormData(details);
    this.handleStep('compare-offer-review');
  }

  /**
   * Handle offer comparison calculation
   */
  handleOfferCompare(calculationResults: Partial<CompareOfferFormData>): void {
    console.log('[CompareOfferFlowHandler] Calculating comparison:', calculationResults);
    CalculatorMessageService.logUserChoice('Compare offers', this.logUserChoiceAsMessage);
    
    this.updateFormData(calculationResults);
    this.handleStep('compare-offer-results');
  }

  /**
   * Handle edit (go back to details)
   */
  handleEdit(): void {
    console.log('[CompareOfferFlowHandler] Editing offer details');
    this.handleStep('compare-offer-details');
  }

  /**
   * Get current step
   */
  getCurrentStep(): CompareOfferStep | null {
    return this.compareOfferStep;
  }

  /**
   * Check if flow is active
   */
  isActive(): boolean {
    return this.compareOfferStep !== null;
  }

  /**
   * Start compare offer flow
   */
  startFlow(): void {
    console.log('[CompareOfferFlowHandler] Starting compare offer flow');
    this.resetFlow(); // Clear any previous data
    this.handleStep('compare-offer-choice');
  }

  /**
   * Reset flow
   */
  resetFlow(): void {
    console.log('[CompareOfferFlowHandler] Resetting flow');
    this.setCompareOfferStep(null);
    this.compareOfferData = {};
  }
}
