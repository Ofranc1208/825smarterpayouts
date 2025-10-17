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
    console.log('[CalculatorOrchestrator] Initializing state');
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
        console.log('[CalculatorOrchestrator] Starting calculator');
        flowHandlers.guaranteed.startCalculator();
      },

      handleFlowSelect: (flow: FlowType) => {
        console.log('[CalculatorOrchestrator] Selecting flow:', flow);
        
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
        console.log('[CalculatorOrchestrator] Going to step:', step);
        
        const flowType = CalculatorFlowService.routeStep(step);
        if (!flowType) {
          console.warn('[CalculatorOrchestrator] Unknown flow for step:', step);
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
        console.log('[CalculatorOrchestrator] Updating form data:', data);
        
        if (data.guaranteedData) {
          flowHandlers.guaranteed.updateFormData(data.guaranteedData);
        }
        if (data.lcpData) {
          flowHandlers.lcp.updateFormData(data.lcpData);
        }
      },

      // Guaranteed Flow Actions
      handleGuaranteedModeSelect: (mode: string) => {
        console.log('[CalculatorOrchestrator] Guaranteed mode select:', mode);
        flowHandlers.guaranteed.handleModeSelect(mode);
      },

      handleIncreaseSelect: (rate: number) => {
        console.log('[CalculatorOrchestrator] Increase select:', rate);
        flowHandlers.guaranteed.handleIncreaseSelect(rate);
      },

      handleAmountNext: () => {
        console.log('[CalculatorOrchestrator] Amount next');
        flowHandlers.guaranteed.handleAmountNext();
      },

      handleDatesNext: () => {
        console.log('[CalculatorOrchestrator] Dates next');
        flowHandlers.guaranteed.handleDatesNext();
      },

      handleReviewCalculate: () => {
        console.log('[CalculatorOrchestrator] Review calculate');
        flowHandlers.guaranteed.handleReviewCalculate();
      },

      // LCP Flow Actions
      handleLcpPaymentNext: (data: LCPPaymentData) => {
        console.log('[CalculatorOrchestrator] LCP payment next:', data);
        flowHandlers.lcp.handlePaymentNext(data);
      },

      handleLcpDetailsNext: (data: LCPDetailsData) => {
        console.log('[CalculatorOrchestrator] LCP details next:', data);
        flowHandlers.lcp.handleDetailsNext(data);
      },

      handleLcpProfileNext: (data: LCPProfileData) => {
        console.log('[CalculatorOrchestrator] LCP profile next:', data);
        flowHandlers.lcp.handleProfileNext(data);
      },

      handleLcpLifestyleNext: (data: LCPLifestyleData) => {
        console.log('[CalculatorOrchestrator] LCP lifestyle next:', data);
        flowHandlers.lcp.handleLifestyleNext(data);
      },

      handleLcpHealthNext: (data: LCPHealthData) => {
        console.log('[CalculatorOrchestrator] LCP health next:', data);
        flowHandlers.lcp.handleHealthNext(data);
      },

      handleLcpCalculate: (data: Partial<any>) => {
        console.log('[CalculatorOrchestrator] LCP calculate:', data);
        flowHandlers.lcp.handleCalculate(data);
      },

      handleLcpBackToReview: () => {
        console.log('[CalculatorOrchestrator] LCP back to review');
        flowHandlers.lcp.handleBackToReview();
      },

      triggerReprompt: () => {
        console.log('[CalculatorOrchestrator] Triggering reprompt');
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
