// Assistant Response Service - Handles context-aware responses
// ===========================================================

import { AssistantFlowType, AssistantStep } from './types';

export class AssistantResponseService {
  /**
   * Get context-aware response based on flow type and current step
   */
  static getContextAwareResponse(
    userText: string, 
    flowType: AssistantFlowType, 
    currentStep: AssistantStep
  ): string {
    const lowerText = userText.toLowerCase();
    
    if (flowType === 'guaranteed') {
      return this.getGuaranteedResponse(lowerText, currentStep);
    } else if (flowType === 'lcp') {
      return this.getLCPResponse(lowerText, currentStep);
    }
    
    // Default response if no flow type is set
    return `I understand you said: "${userText.trim()}". I'm here to help you with this calculation step. What specific questions do you have?`;
  }

  /**
   * Get guaranteed payment specific responses
   */
  private static getGuaranteedResponse(lowerText: string, currentStep: AssistantStep): string {
    switch (currentStep) {
      case 'mode':
        if (lowerText.includes('monthly') || lowerText.includes('month')) {
          return "Great! Monthly payments are very common. This means you receive a payment every month. What's your annual increase rate?";
        } else if (lowerText.includes('quarterly') || lowerText.includes('quarter')) {
          return "Perfect! Quarterly payments mean you receive payments every 3 months. What's your annual increase rate?";
        } else if (lowerText.includes('lump sum')) {
          return "Excellent! Lump sum payments are straightforward. Let's move to the next step.";
        }
        return "I can help you with payment modes. Do you receive payments monthly, quarterly, semiannually, annually, or as a lump sum?";
      
      case 'amount':
        if (lowerText.includes('amount') || lowerText.includes('payment')) {
          return "Please enter the amount you usually receive for each payment. Also, we'll need the start and end dates for the period you want to calculate.";
        }
        return "For the payment amount step, I need to know how much you usually receive and the date range you want to calculate.";
      
      case 'review':
        return "Please review all the information you've provided. Make sure the payment amount, dates, and mode are correct before calculating.";
      
      case 'offer':
        return "Congratulations! Your guaranteed payment calculation is complete. The results show your minimum and maximum payout offers.";
      
      default:
        return "I'm here to help you with your guaranteed payment calculation. What would you like to know?";
    }
  }

  /**
   * Get LCP (Life-Contingent Payment) specific responses
   */
  private static getLCPResponse(lowerText: string, currentStep: AssistantStep): string {
    switch (currentStep) {
      case 'lcp_payment':
        if (lowerText.includes('monthly') || lowerText.includes('month')) {
          return "Great! Monthly payments are common for life-contingent settlements. What's your annual increase rate?";
        } else if (lowerText.includes('lump sum')) {
          return "Perfect! Lump sum payments for life-contingent settlements have different calculation factors. Let's continue.";
        }
        return "For life-contingent payments, I need to know your payment frequency and annual increase rate. This affects your life expectancy calculations.";
      
      case 'lcp_profile':
        if (lowerText.includes('age') || lowerText.includes('gender')) {
          return "Your age and gender are important factors for life-contingent calculations as they affect life expectancy. What's your body frame size?";
        }
        return "For life-contingent payments, I need your age range, gender, and body frame size. These factors help calculate your life expectancy.";
      
      case 'lcp_health':
        if (lowerText.includes('smoke') || lowerText.includes('smoking')) {
          return "Smoking status is a critical factor for life-contingent calculations. What's your general health condition?";
        } else if (lowerText.includes('health') || lowerText.includes('condition')) {
          return "Your health condition affects life expectancy calculations. Do you have any cardiac conditions?";
        }
        return "For life-contingent payments, I need to know your smoking status, general health, and cardiac conditions. These significantly impact your life expectancy.";
      
      case 'lcp_details':
        if (lowerText.includes('date') || lowerText.includes('amount')) {
          return "Please provide the start and end dates for the payments you want to calculate, plus the payment amount.";
        }
        return "For the details step, I need the start date, end date, and payment amount for your life-contingent settlement.";
      
      case 'lcp_review':
        return "Please review all your information carefully. Life-contingent calculations are complex and depend on accurate health and profile data.";
      
      case 'lcp_results':
        return "Congratulations! Your life-contingent payment calculation is complete. The results show your minimum and maximum payout offers based on your health profile.";
      
      default:
        return "I'm here to help you with your life-contingent payment calculation. This process involves health and profile factors that affect your life expectancy. What would you like to know?";
    }
  }

  /**
   * Simulate API call delay (for testing)
   */
  static async simulateApiDelay(minMs: number = 1000, maxMs: number = 2000): Promise<void> {
    const delay = Math.random() * (maxMs - minMs) + minMs;
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Simulate API error (for testing)
   */
  static shouldSimulateError(errorRate: number = 0.01): boolean {
    return Math.random() < errorRate;
  }
}
