// Calculator Orchestrator - Coordinates all calculator services
// =============================================================

import { 
  CalculatorState, 
  CalculatorActions, 
  FlowType 
} from './types';
import { 
  CalculatorStep,
  LCPPaymentData,
  LCPDetailsData,
  LCPProfileData,
  LCPLifestyleData,
  LCPHealthData,
  CalculatorFormData
} from '../../../types';
import { CalculatorStateService } from './CalculatorStateService';
import { CalculatorFlowService } from './CalculatorFlowService';
import { CalculatorMessageService } from './CalculatorMessageService';
import { GuaranteedFlowHandler } from './flows/GuaranteedFlowHandler';
import { LCPFlowHandler } from './flows/LCPFlowHandler';
import { CompareOfferFlowHandler } from './flows/CompareOfferFlowHandler';

export class CalculatorOrchestrator {
  /**
   * Initialize calculator state
   */
  static initializeState(): CalculatorState {
    return CalculatorStateService.createInitialState();
  }

  /**
   * Create all calculator actions
   */
  static createActions(
    getState: () => CalculatorState,
    setState: (updates: Partial<CalculatorState>) => void,
    flowHandlers: {
      guaranteed: GuaranteedFlowHandler;
      lcp: LCPFlowHandler;
      compareOffer: CompareOfferFlowHandler;
    }
  ): CalculatorActions {
    return {
      startCalculator: () => {
        flowHandlers.guaranteed.startCalculator();
      },

      handleFlowSelect: (flow: FlowType) => {
        const startingStep = CalculatorFlowService.getStartingStep(flow);
        
        switch (flow) {
          case 'guaranteed':
            flowHandlers.guaranteed.handleStep('mode');
            break;
          case 'lcp':
            flowHandlers.lcp.startFlow();
            break;
          case 'compare-offer':
            flowHandlers.compareOffer.startFlow();
            break;
        }
      },

      goToNextStep: (step: CalculatorStep) => {
        const flowType = CalculatorFlowService.routeStep(step);
        if (!flowType) {
          console.error('[CalculatorOrchestrator] Unknown flow for step:', step);
          return;
        }

        switch (flowType) {
          case 'guaranteed':
            flowHandlers.guaranteed.handleStep(step);
            break;
          case 'lcp':
            flowHandlers.lcp.handleStep(step);
            break;
          case 'compare-offer':
            flowHandlers.compareOffer.handleStep(step);
            break;
        }
      },

      updateFormData: (data: Partial<CalculatorFormData>) => {
        if (data.guaranteedData) {
          flowHandlers.guaranteed.updateFormData(data.guaranteedData);
        }
        if (data.lcpData) {
          flowHandlers.lcp.updateFormData(data.lcpData);
        }
      },

      // Guaranteed Flow Actions
      handleGuaranteedModeSelect: (mode: string) => {
        flowHandlers.guaranteed.handleModeSelect(mode);
      },

      handleIncreaseSelect: (rate: number) => {
        flowHandlers.guaranteed.handleIncreaseSelect(rate);
      },

      handleAmountNext: () => {
        flowHandlers.guaranteed.handleAmountNext();
      },

      handleDatesNext: () => {
        flowHandlers.guaranteed.handleDatesNext();
      },

      handleReviewCalculate: () => {
        flowHandlers.guaranteed.handleReviewCalculate();
      },

      // LCP Flow Actions
      handleLcpPaymentNext: (data: LCPPaymentData) => {
        flowHandlers.lcp.handlePaymentNext(data);
      },

      handleLcpDetailsNext: (data: LCPDetailsData) => {
        flowHandlers.lcp.handleDetailsNext(data);
      },

      handleLcpProfileNext: (data: LCPProfileData) => {
        flowHandlers.lcp.handleProfileNext(data);
      },

      handleLcpLifestyleNext: (data: LCPLifestyleData) => {
        flowHandlers.lcp.handleLifestyleNext(data);
      },

      handleLcpHealthNext: (data: LCPHealthData) => {
        flowHandlers.lcp.handleHealthNext(data);
      },

      handleLcpCalculate: (data: Partial<any>) => {
        flowHandlers.lcp.handleCalculate(data);
      },

      handleLcpBackToReview: () => {
        flowHandlers.lcp.handleBackToReview();
      },

      triggerReprompt: () => {
        const currentState = getState();
        const newCounter = CalculatorStateService.incrementRepromptCounter(currentState.repromptCounter);
        setState({ repromptCounter: newCounter });
      }
    };
  }

  /**
   * Get current state from flow handlers
   */
  static getCurrentState(
    flowHandlers: {
      guaranteed: GuaranteedFlowHandler;
      lcp: LCPFlowHandler;
      compareOffer: CompareOfferFlowHandler;
    }
  ): Partial<CalculatorState> {
    const currentStep = CalculatorStateService.determineCurrentStep(
      flowHandlers.compareOffer.getCurrentStep(),
      flowHandlers.lcp.getCurrentStep(),
      flowHandlers.guaranteed.getCurrentStep()
    );

    const formData = CalculatorStateService.createFormData(
      flowHandlers.guaranteed.getFormData(),
      flowHandlers.lcp.getFormData()
    );

    return {
      currentStep,
      formData
    };
  }

  /**
   * Validate orchestrator state
   */
  static validateState(state: CalculatorState): boolean {
    return CalculatorStateService.isValidState(state);
  }

  /**
   * Get active flow type
   */
  static getActiveFlow(
    flowHandlers: {
      guaranteed: GuaranteedFlowHandler;
      lcp: LCPFlowHandler;
      compareOffer: CompareOfferFlowHandler;
    }
  ): FlowType | null {
    if (flowHandlers.compareOffer.isActive()) return 'compare-offer';
    if (flowHandlers.lcp.isActive()) return 'lcp';
    if (flowHandlers.guaranteed.isActive()) return 'guaranteed';
    return null;
  }
}
