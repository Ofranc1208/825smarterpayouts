// LCP Flow Handler - Manages LCP calculator flow
// ==============================================

import { 
  LCPFormData, 
  LCPStep, 
  CalculatorStep,
  LCPPaymentData,
  LCPDetailsData,
  LCPProfileData,
  LCPLifestyleData,
  LCPHealthData
} from '../../../../types';
import { FlowHandler } from '../types';
import { CalculatorMessageService } from '../CalculatorMessageService';

export class LCPFlowHandler implements FlowHandler {
  private lcpFormData: LCPFormData;
  private lcpCurrentStep: LCPStep | null;
  private setLcpFormData: (data: LCPFormData | ((prev: LCPFormData) => LCPFormData)) => void;
  private setLcpCurrentStep: (step: LCPStep | null) => void;
  private logUserChoiceAsMessage: (text: string) => void;

  constructor(
    lcpFormData: LCPFormData,
    lcpCurrentStep: LCPStep | null,
    setLcpFormData: (data: LCPFormData | ((prev: LCPFormData) => LCPFormData)) => void,
    setLcpCurrentStep: (step: LCPStep | null) => void,
    logUserChoiceAsMessage: (text: string) => void
  ) {
    this.lcpFormData = lcpFormData;
    this.lcpCurrentStep = lcpCurrentStep;
    this.setLcpFormData = setLcpFormData;
    this.setLcpCurrentStep = setLcpCurrentStep;
    this.logUserChoiceAsMessage = logUserChoiceAsMessage;
  }

  /**
   * Check if this handler can handle the given step
   */
  canHandle(step: CalculatorStep): boolean {
    if (!step) return false;
    
    return typeof step === 'string' && step.startsWith('lcp_');
  }

  /**
   * Handle step navigation
   */
  handleStep(step: CalculatorStep, data?: any): void {
    if (!this.canHandle(step)) {
      console.error('[LCPFlowHandler] Cannot handle step:', step);
      return;
    }

    this.setLcpCurrentStep(step as LCPStep);
  }

  /**
   * Update form data
   */
  updateFormData(data: Partial<LCPFormData>): void {
    this.setLcpFormData(prev => ({ ...prev, ...data }));
  }

  /**
   * Get current form data
   */
  getFormData(): LCPFormData {
    return this.lcpFormData;
  }

  /**
   * Handle LCP payment next action
   */
  handlePaymentNext(data: { paymentMode: string; amount: string }): void {
    const message = CalculatorMessageService.formatLCPPayment(data);
    CalculatorMessageService.logUserChoice(message, this.logUserChoiceAsMessage);
    
    // Update form data and move to next step
    this.updateFormData({ paymentMode: data.paymentMode, amount: data.amount });
    this.handleStep('lcp_profile');
  }

  /**
   * Handle LCP details next action
   */
  handleDetailsNext(data: LCPDetailsData): void {
    const messages = CalculatorMessageService.getStandardMessages();
    CalculatorMessageService.logUserChoice(messages.DETAILS_PROVIDED, this.logUserChoiceAsMessage);
    
    this.updateFormData(data);
    this.handleStep('lcp_review');
  }

  /**
   * Handle LCP profile next action
   */
  handleProfileNext(data: LCPProfileData): void {
    const messages = CalculatorMessageService.getStandardMessages();
    CalculatorMessageService.logUserChoice(messages.PROFILE_PROVIDED, this.logUserChoiceAsMessage);
    
    this.updateFormData(data);
    this.handleStep('lcp_health');
  }

  /**
   * Handle LCP lifestyle next action
   */
  handleLifestyleNext(data: LCPLifestyleData): void {
    const messages = CalculatorMessageService.getStandardMessages();
    CalculatorMessageService.logUserChoice(messages.LIFESTYLE_PROVIDED, this.logUserChoiceAsMessage);
    
    this.updateFormData(data);
    this.handleStep('lcp_details');
  }

  /**
   * Handle LCP health next action
   */
  handleHealthNext(data: LCPHealthData): void {
    const messages = CalculatorMessageService.getStandardMessages();
    CalculatorMessageService.logUserChoice(messages.HEALTH_PROVIDED, this.logUserChoiceAsMessage);
    
    this.updateFormData(data);
    this.handleStep('lcp_details');
  }

  /**
   * Handle LCP calculate action
   */
  handleCalculate(data: Partial<LCPFormData>): void {
    const messages = CalculatorMessageService.getStandardMessages();
    CalculatorMessageService.logUserChoice(messages.CALCULATE_LCP_OFFER, this.logUserChoiceAsMessage);
    
    this.updateFormData(data);
    this.handleStep('lcp_results');
  }

  /**
   * Handle back to review action
   */
  handleBackToReview(): void {
    this.handleStep('lcp_review');
  }

  /**
   * Get current step
   */
  getCurrentStep(): LCPStep | null {
    return this.lcpCurrentStep;
  }

  /**
   * Check if flow is active
   */
  isActive(): boolean {
    return this.lcpCurrentStep !== null;
  }

  /**
   * Start LCP flow
   */
  startFlow(): void {
    this.handleStep('lcp_payment');
  }
}
