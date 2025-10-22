/**
 * 💬 GUARANTEED MESSAGE SERVICE
 * 
 * Handles message creation and management for the Guaranteed Assistant.
 * Provides utilities for creating different types of messages.
 */

import { GuaranteedAssistantMessage, GuaranteedAssistantStep, GuaranteedMessageMetadata } from './types';
import { GuaranteedFormData } from '../../components/calculator/guaranteedstep/utils/guaranteedTypes';

export class GuaranteedMessageService {
  /**
   * Create a new message
   */
  static createMessage(
    text: string,
    type: 'text' | 'user_choice' | 'system',
    sender: 'user' | 'assistant' | 'system',
    metadata?: GuaranteedMessageMetadata
  ): GuaranteedAssistantMessage {
    return {
      id: this.generateMessageId(),
      type,
      text,
      sender,
      timestamp: new Date(),
      metadata: metadata as any // Type assertion to match GuaranteedMessage interface
    };
  }

  /**
   * Create a user message
   */
  static createUserMessage(text: string, step?: string, formData?: GuaranteedFormData): GuaranteedAssistantMessage {
    return this.createMessage(text, 'text', 'user', {
      step,
      formData
    });
  }

  /**
   * Create an assistant message
   */
  static createAssistantMessage(text: string, step?: string, formData?: GuaranteedFormData): GuaranteedAssistantMessage {
    return this.createMessage(text, 'text', 'assistant', {
      step,
      formData
    });
  }

  /**
   * Create a bot message (step-aware notification)
   */
  static createBotMessage(text: string, step?: string, formData?: GuaranteedFormData): GuaranteedAssistantMessage {
    return this.createMessage(text, 'text', 'assistant', {
      step,
      formData,
      isBotMessage: true
    });
  }

  /**
   * Create an error message
   */
  static createErrorMessage(errorText: string, step?: string, formData?: GuaranteedFormData): GuaranteedAssistantMessage {
    return this.createMessage(errorText, 'text', 'assistant', {
      step,
      formData,
      isError: true
    });
  }

  /**
   * Create a welcome message
   */
  static createWelcomeMessage(step: GuaranteedAssistantStep, formData?: GuaranteedFormData): GuaranteedAssistantMessage {
    const welcomeText = this.getWelcomeText(step);
    return this.createMessage(welcomeText, 'text', 'assistant', {
      step: step || undefined,
      formData,
      isWelcome: true
    });
  }

  /**
   * Create a handoff message
   */
  static createHandoffMessage(step?: string): GuaranteedAssistantMessage {
    return this.createMessage(
      "Perfect! I'm transferring you to our main chat where Mint can help you with any additional questions or next steps. All your calculation details will be available there.",
      'text',
      'assistant',
      {
        step,
        isHandoff: true
      }
    );
  }

  /**
   * Create a user choice message
   */
  static createUserChoiceMessage(choice: string, step?: string, formData?: GuaranteedFormData): GuaranteedAssistantMessage {
    return this.createMessage(
      `Selected: ${choice}`,
      'user_choice',
      'user',
      {
        step,
        calculationData: { choice, step },
        formData
      }
    );
  }

  /**
   * Get welcome text for a step
   */
  private static getWelcomeText(step: GuaranteedAssistantStep): string {
    const stepMap: Record<string, string> = {
      'guaranteed_payment': "Hi! I'm your Guaranteed Payments assistant.\n\nIf you have any questions about why we need information or what we need information for, I can answer that for you.",
      'guaranteed_lump_sum': "Welcome to the Lump Sum Details step!\n\nLet me know if you need help understanding any of the information required here."
    };

    return stepMap[step || ''] || "Hi! I'm your Guaranteed Payments assistant.\n\nIf you have any questions about any steps, please let me know.";
  }

  /**
   * Generate a unique message ID
   */
  private static generateMessageId(): string {
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Check if a message is a welcome message
   */
  static isWelcomeMessage(message: GuaranteedAssistantMessage): boolean {
    return message.metadata?.isWelcome === true;
  }

  /**
   * Check if a message is an error message
   */
  static isErrorMessage(message: GuaranteedAssistantMessage): boolean {
    return (message.metadata as GuaranteedMessageMetadata)?.isError === true;
  }

  /**
   * Check if a message is a bot message
   */
  static isBotMessage(message: GuaranteedAssistantMessage): boolean {
    return (message.metadata as GuaranteedMessageMetadata)?.isBotMessage === true;
  }
}

