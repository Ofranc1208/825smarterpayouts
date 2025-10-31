// Guaranteed Flow Handler - Manages guaranteed calculator flow
// ============================================================

import { GuaranteedFormData, GuaranteedStep, CalculatorStep } from '../../../../types';
import { FlowHandler } from '../types';
import { CalculatorMessageService } from '../CalculatorMessageService';

export class GuaranteedFlowHandler implements FlowHandler {
  private guaranteedFlow: any; // useGuaranteedFlow hook result
  private logUserChoiceAsMessage: (text: string) => void;

  constructor(
    guaranteedFlow: any,
    logUserChoiceAsMessage: (text: string) => void
  ) {
    this.guaranteedFlow = guaranteedFlow;
    this.logUserChoiceAsMessage = logUserChoiceAsMessage;
  }

  /**
   * Check if this handler can handle the given step
   */
  canHandle(step: CalculatorStep): boolean {
    if (!step) return false;
    
    const guaranteedSteps = [
      'select_type', 'mode', 'increase', 'amount', 'dates', 'review', 'offer'
    ];
    
    return guaranteedSteps.includes(step as string);
  }

  /**
   * Handle step navigation
   */
  handleStep(step: CalculatorStep, data?: any): void {
    if (!this.canHandle(step)) {
      console.warn('[GuaranteedFlowHandler] Cannot handle step:', step);
      return;
    }

    this.guaranteedFlow.goToNextStep(step as GuaranteedStep);
  }

  /**
   * Update form data
   */
  updateFormData(data: GuaranteedFormData): void {
    this.guaranteedFlow.updateFormData(data);
  }

  /**
   * Get current form data
   */
  getFormData(): GuaranteedFormData {
    return this.guaranteedFlow.formData;
  }

  /**
   * Start calculator flow
   */
  startCalculator(): void {
    this.guaranteedFlow.startCalculator();
  }

  /**
   * Handle mode selection
   */
  handleModeSelect(mode: string): void {
    const message = CalculatorMessageService.formatModeSelection(mode);
    CalculatorMessageService.logUserChoice(message, this.logUserChoiceAsMessage);
    
    this.guaranteedFlow.handleModeSelect(mode);
  }

  /**
   * Handle increase rate selection
   */
  handleIncreaseSelect(rate: number): void {
    const message = CalculatorMessageService.formatIncreaseSelection(rate);
    CalculatorMessageService.logUserChoice(message, this.logUserChoiceAsMessage);
    
    this.guaranteedFlow.handleIncreaseSelect(rate);
  }

  /**
   * Handle amount next action
   */
  handleAmountNext(): void {
    const amount = this.guaranteedFlow.formData.paymentAmount;
    if (amount) {
      const message = CalculatorMessageService.formatPaymentAmount(amount);
      CalculatorMessageService.logUserChoice(message, this.logUserChoiceAsMessage);
    }
    
    this.guaranteedFlow.handleAmountNext();
  }

  /**
   * Handle dates next action
   */
  handleDatesNext(): void {
    const { startDate, endDate } = this.guaranteedFlow.formData;
    if (startDate && endDate) {
      const message = CalculatorMessageService.formatPaymentPeriod(startDate, endDate);
      CalculatorMessageService.logUserChoice(message, this.logUserChoiceAsMessage);
    }
    
    this.guaranteedFlow.handleDatesNext();
  }

  /**
   * Handle review calculate action
   */
  handleReviewCalculate(): void {
    const messages = CalculatorMessageService.getStandardMessages();
    CalculatorMessageService.logUserChoice(messages.CALCULATE_OFFER, this.logUserChoiceAsMessage);
    
    this.guaranteedFlow.handleReviewCalculate();
  }

  /**
   * Get current step
   */
  getCurrentStep(): GuaranteedStep | null {
    return this.guaranteedFlow.currentStep;
  }

  /**
   * Check if flow is active
   */
  isActive(): boolean {
    return this.guaranteedFlow.currentStep !== null;
  }
}
