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
      welcomeText = "Hi! I'm your Guaranteed Payment Assistant. I can help you through each step of your guaranteed payment calculation. What would you like to know?";
    } else if (flowType === 'lcp') {
      welcomeText = "Hi! I'm your Life-Contingent Payment Assistant. I can help you through each step of your LCP calculation, including health and profile factors. What would you like to know?";
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
