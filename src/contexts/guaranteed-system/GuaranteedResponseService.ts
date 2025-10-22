/**
 * 🤖 GUARANTEED RESPONSE SERVICE
 * 
 * Handles AI response generation for the Guaranteed Assistant.
 * Provides contextual responses based on step and form data.
 */

import { GuaranteedAssistantStep } from './types';
import { GuaranteedFormData } from '../../components/calculator/guaranteedstep/utils/guaranteedTypes';
import {
  generateContextualResponse,
  generateHandoffSummary,
  STEP_GUIDANCE_PROMPTS
} from '../../components/calculator/guaranteedstep/utils/guaranteedPrompts';

export class GuaranteedResponseService {
  /**
   * Generate a contextual response based on user input
   */
  static generateResponse(
    userMessage: string,
    step: GuaranteedAssistantStep,
    formData: GuaranteedFormData
  ): string {
    return generateContextualResponse(userMessage, step || 'general', formData);
  }

  /**
   * Get step guidance text
   */
  static getStepGuidance(step: GuaranteedAssistantStep, formData: GuaranteedFormData): string {
    if (!step) {
      return "Welcome! I'm here to help you through the guaranteed payment calculation process.";
    }

    const stepKey = step as keyof typeof STEP_GUIDANCE_PROMPTS;
    const stepPrompts = STEP_GUIDANCE_PROMPTS[stepKey];

    if (!stepPrompts) {
      return "I'm here to help you with your guaranteed payment calculation.";
    }

    // Return contextual help based on current step and form data
    if (typeof stepPrompts.contextualHelp === 'function') {
      return stepPrompts.contextualHelp(formData);
    } else if (typeof stepPrompts.welcome === 'function') {
      return stepPrompts.welcome(formData);
    } else if (typeof stepPrompts.welcome === 'string') {
      return stepPrompts.welcome;
    }

    return "I'm here to help you with your guaranteed payment calculation.";
  }

  /**
   * Generate a handoff summary
   */
  static generateHandoffSummary(formData: GuaranteedFormData): string {
    return generateHandoffSummary(formData);
  }

  /**
   * Get step-aware message for step changes
   */
  static getStepChangeMessage(step: GuaranteedAssistantStep): string {
    const stepMap: Record<string, { number: number; total: number; name: string }> = {
      'mode': { number: 1, total: 2, name: 'Payment Mode' },
      'amount': { number: 2, total: 2, name: 'Payment Amount' },
      'review': { number: 2, total: 2, name: 'Review' },
      'offer': { number: 2, total: 2, name: 'Your Offer' }
    };

    const stepData = stepMap[step || ''];
    if (stepData) {
      return `I see you're now on step ${stepData.number} of ${stepData.total} (${stepData.name}).\n\nWhat can I help you with here?`;
    }

    return "What can I help you with?";
  }

  /**
   * Get welcome message for a step
   */
  static getWelcomeMessage(step: GuaranteedAssistantStep, formData: GuaranteedFormData): string {
    if (!step) return "";

    const stepKey = step as keyof typeof STEP_GUIDANCE_PROMPTS;
    const stepPrompts = STEP_GUIDANCE_PROMPTS[stepKey];

    if (!stepPrompts) return "";

    let welcomeMessage = '';
    if (typeof stepPrompts.welcome === 'function') {
      welcomeMessage = stepPrompts.welcome(formData);
    } else if (typeof stepPrompts.welcome === 'string') {
      welcomeMessage = stepPrompts.welcome;
    }

    return welcomeMessage;
  }
}

