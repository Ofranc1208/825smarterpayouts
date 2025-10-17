// Calculator Flow Service - Handles flow routing and navigation
// =============================================================

import { CalculatorStep, GuaranteedStep, LCPStep, CompareOfferStep } from '../../../types';
import { FlowType } from './types';

export class CalculatorFlowService {
  /**
   * Get starting step for each flow type
   */
  static getStartingStep(flow: FlowType): CalculatorStep {
    switch (flow) {
      case 'guaranteed':
        return 'mode';
      case 'lcp':
        return 'lcp_payment';
      case 'compare-offer':
        return 'compare-offer-choice';
      default:
        throw new Error(`Unknown flow type: ${flow}`);
    }
  }

  /**
   * Route step to appropriate flow handler
   */
  static routeStep(step: CalculatorStep): FlowType | null {
    if (!step) return null;

    if (typeof step === 'string') {
      if (step.startsWith('lcp_')) return 'lcp';
      if (step.startsWith('compare-offer')) return 'compare-offer';
      return 'guaranteed';
    }

    return null;
  }

  /**
   * Validate step for flow type
   */
  static isValidStepForFlow(step: CalculatorStep, flow: FlowType): boolean {
    const stepFlow = this.routeStep(step);
    return stepFlow === flow;
  }

  /**
   * Get next step in flow sequence
   */
  static getNextStep(currentStep: CalculatorStep, flow: FlowType): CalculatorStep | null {
    switch (flow) {
      case 'guaranteed':
        return this.getNextGuaranteedStep(currentStep as GuaranteedStep);
      case 'lcp':
        return this.getNextLCPStep(currentStep as LCPStep);
      case 'compare-offer':
        return this.getNextCompareOfferStep(currentStep as CompareOfferStep);
      default:
        return null;
    }
  }

  /**
   * Get next guaranteed step
   */
  private static getNextGuaranteedStep(currentStep: GuaranteedStep): GuaranteedStep | null {
    const sequence: GuaranteedStep[] = [
      'select_type',
      'mode',
      'increase',
      'amount',
      'dates',
      'review',
      'offer'
    ];

    const currentIndex = sequence.indexOf(currentStep);
    if (currentIndex === -1 || currentIndex === sequence.length - 1) {
      return null;
    }

    return sequence[currentIndex + 1];
  }

  /**
   * Get next LCP step
   */
  private static getNextLCPStep(currentStep: LCPStep): LCPStep | null {
    const sequence: LCPStep[] = [
      'lcp_payment',
      'lcp_profile',
      'lcp_health',
      'lcp_details',
      'lcp_review',
      'lcp_results'
    ];

    const currentIndex = sequence.indexOf(currentStep);
    if (currentIndex === -1 || currentIndex === sequence.length - 1) {
      return null;
    }

    return sequence[currentIndex + 1];
  }

  /**
   * Get next compare offer step
   */
  private static getNextCompareOfferStep(currentStep: CompareOfferStep): CompareOfferStep | null {
    const sequence: CompareOfferStep[] = [
      'compare-offer-choice',
      'compare-offer-details',
      'compare-offer-review',
      'compare-offer-results'
    ];

    const currentIndex = sequence.indexOf(currentStep);
    if (currentIndex === -1 || currentIndex === sequence.length - 1) {
      return null;
    }

    return sequence[currentIndex + 1];
  }

  /**
   * Check if step is final step in flow
   */
  static isFinalStep(step: CalculatorStep): boolean {
    if (!step) return false;

    const finalSteps = ['offer', 'lcp_results', 'compare-offer-results'];
    return finalSteps.includes(step as string);
  }

  /**
   * Get flow progress percentage
   */
  static getFlowProgress(currentStep: CalculatorStep, flow: FlowType): number {
    let sequence: string[] = [];

    switch (flow) {
      case 'guaranteed':
        sequence = ['select_type', 'mode', 'increase', 'amount', 'dates', 'review', 'offer'];
        break;
      case 'lcp':
        sequence = ['lcp_payment', 'lcp_profile', 'lcp_health', 'lcp_details', 'lcp_review', 'lcp_results'];
        break;
      case 'compare-offer':
        sequence = ['compare-offer-choice', 'compare-offer-details', 'compare-offer-review', 'compare-offer-results'];
        break;
      default:
        return 0;
    }

    const currentIndex = sequence.indexOf(currentStep as string);
    if (currentIndex === -1) return 0;

    return Math.round(((currentIndex + 1) / sequence.length) * 100);
  }
}
