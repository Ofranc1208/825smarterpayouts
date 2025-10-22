// Assistant Message Service - Handles message creation and management
// ==================================================================

import { AssistantMessage, AssistantFlowType, AssistantStep } from './types';

export class AssistantMessageService {
  /**
   * Create a unique message ID
   */
  static createMessageId(prefix: string = 'msg'): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Create a user message
   */
  static createUserMessage(
    text: string, 
    step?: AssistantStep, 
    flowType?: AssistantFlowType
  ): AssistantMessage {
    return {
      id: this.createMessageId('user'),
      sender: 'user',
      text: text.trim(),
      step: step || undefined,
      flowType: flowType || undefined
    };
  }

  /**
   * Create a bot message
   */
  static createBotMessage(
    text: string, 
    step?: AssistantStep, 
    flowType?: AssistantFlowType
  ): AssistantMessage {
    return {
      id: this.createMessageId('bot'),
      sender: 'bot',
      text: text.trim(),
      step: step || undefined,
      flowType: flowType || undefined
    };
  }

  /**
   * Create a welcome message
   */
  static createWelcomeMessage(
    flowType: AssistantFlowType, 
    step?: AssistantStep
  ): AssistantMessage {
    let welcomeText = 'Hello, Mint again. How can I help you with this step?';
    
    if (flowType === 'guaranteed') {
      welcomeText = "Hi! I'm your Guaranteed Payment Assistant. I can help you through each step of your guaranteed payment calculation.\n\nWhat can I help you with?";
    } else if (flowType === 'lcp') {
      welcomeText = "Hi! I'm your Life-Contingent Payment Assistant. I can help you through each step of your LCP calculation.\n\nWhat can I help you with?";
    }
    
    return {
      id: this.createMessageId('assistant-welcome'),
      sender: 'bot',
      text: welcomeText,
      step: step || undefined,
      flowType: flowType || undefined
    };
  }

  /**
   * Get step-aware information for welcome message
   */
  private static getStepInfo(step: AssistantStep | undefined, flowType: AssistantFlowType): string {
    if (flowType === 'lcp') {
      const stepMap: Record<string, { number: number; total: number; name: string }> = {
        'lcp_payment': { number: 1, total: 5, name: 'Payment Details' },
        'lcp_profile': { number: 2, total: 5, name: 'Physical Profile' },
        'lcp_health': { number: 3, total: 5, name: 'Health Overview' },
        'lcp_details': { number: 4, total: 5, name: 'Payment Schedule' },
        'lcp_lump_sum': { number: 4, total: 5, name: 'Lump Sum Details' },
        'lcp_review': { number: 5, total: 5, name: 'Review' },
        'lcp_results': { number: 5, total: 5, name: 'Results' }
      };

      const stepData = step ? stepMap[step as string] : null;
      
      if (stepData) {
        return `I see you're on step ${stepData.number} of ${stepData.total} (${stepData.name}).\n\nWhat can I help you with here?`;
      }
      
      return "What can I help you with?";
    } else if (flowType === 'guaranteed') {
      const stepMap: Record<string, { number: number; total: number; name: string }> = {
        'mode': { number: 1, total: 2, name: 'Payment Mode' },
        'amount': { number: 2, total: 2, name: 'Payment Amount' },
        'review': { number: 2, total: 2, name: 'Review' },
        'offer': { number: 2, total: 2, name: 'Offer' }
      };

      const stepData = step ? stepMap[step as string] : null;
      
      if (stepData) {
        return `I see you're on step ${stepData.number} of ${stepData.total} (${stepData.name}).\n\nWhat can I help you with here?`;
      }
      
      return "What can I help you with?";
    }
    
    return "What can I help you with?";
  }

  /**
   * Create an error message
   */
  static createErrorMessage(
    errorText: string = "Sorry, I'm having trouble connecting. Please try again.",
    step?: AssistantStep, 
    flowType?: AssistantFlowType
  ): AssistantMessage {
    return {
      id: this.createMessageId('error'),
      sender: 'bot',
      text: errorText,
      step: step || undefined,
      flowType: flowType || undefined
    };
  }

  /**
   * Create a test message
   */
  static createTestMessage(
    step?: AssistantStep, 
    flowType?: AssistantFlowType
  ): AssistantMessage {
    return {
      id: this.createMessageId('test'),
      sender: 'user',
      text: 'This is a test message to see the conversation!',
      step: step || undefined,
      flowType: flowType || undefined
    };
  }

  /**
   * Check if messages contain a welcome message
   */
  static hasWelcomeMessage(messages: AssistantMessage[]): boolean {
    return messages.some(msg => msg.id.startsWith('assistant-welcome'));
  }

  /**
   * Validate message structure
   */
  static isValidMessage(message: any): message is AssistantMessage {
    return (
      message &&
      typeof message.id === 'string' &&
      typeof message.text === 'string' &&
      ['user', 'bot'].includes(message.sender)
    );
  }
}
