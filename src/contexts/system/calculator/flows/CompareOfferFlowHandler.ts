// Compare Offer Flow Handler - Manages compare offer calculator flow
// ==================================================================

import { CompareOfferStep, CalculatorStep } from '../../../../types';
import { FlowHandler } from '../types';
import { CalculatorMessageService } from '../CalculatorMessageService';

export class CompareOfferFlowHandler implements FlowHandler {
  private compareOfferStep: CompareOfferStep | null;
  private setCompareOfferStep: (step: CompareOfferStep | null) => void;
  private logUserChoiceAsMessage: (text: string) => void;
  private compareOfferData: any = {};

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
    this.setCompareOfferStep(step as CompareOfferStep);
  }

  /**
   * Update form data
   */
  updateFormData(data: any): void {
    console.log('[CompareOfferFlowHandler] Updating form data:', data);
    this.compareOfferData = { ...this.compareOfferData, ...data };
  }

  /**
   * Get current form data
   */
  getFormData(): any {
    return this.compareOfferData;
  }

  /**
   * Handle offer choice selection
   */
  handleOfferChoice(choice: string): void {
    CalculatorMessageService.logUserChoice(`Compare offer: ${choice}`, this.logUserChoiceAsMessage);
    
    this.updateFormData({ offerChoice: choice });
    this.handleStep('compare-offer-details');
  }

  /**
   * Handle offer details submission
   */
  handleOfferDetails(details: any): void {
    CalculatorMessageService.logUserChoice('Offer details provided', this.logUserChoiceAsMessage);
    
    this.updateFormData(details);
    this.handleStep('compare-offer-review');
  }

  /**
   * Handle offer comparison calculation
   */
  handleOfferCompare(): void {
    CalculatorMessageService.logUserChoice('Compare offers', this.logUserChoiceAsMessage);
    
    this.handleStep('compare-offer-results');
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
