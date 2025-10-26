/**
 * Choice Handler - Orchestrator Pattern
 *
 * Handles all initial user choices and routes them to appropriate flows.
 * Extracted from ChatContext for better separation of concerns.
 */

import React from 'react';
import ContactOptions from '../../../../components/chat/ContactOptions';

export interface ChoiceHandlerDependencies {
  advanceConversation: (transition: {
    userMessageText: string;
    botConfirmationText: string;
  }) => Promise<void>;
  setVisibleMessages: React.Dispatch<React.SetStateAction<any[]>>;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  startConversationalForm: () => Promise<void>;
  handleSpecialistChoice: (choice: 'live_chat' | 'sms' | 'phone_call' | 'appointment') => Promise<void>;
}

// Unique ID generator
let messageCounter = 0;
const generateUniqueId = () => {
  messageCounter += 1;
  return `process-${Date.now()}-${messageCounter}`;
};

export class ChoiceHandler {
  constructor(private deps: ChoiceHandlerDependencies) {}

  /**
   * Main choice router - intelligently routes between internal flows and GPT passthrough
   * 
   * Internal flows (pre-scripted): 'Our Process', 'New Quote'
   * GPT passthrough (direct AI): Everything else (specific questions, suggestions)
   */
  async handleChoice(choiceText: string): Promise<void> {
    console.log('[ChoiceHandler] Routing choice:', choiceText);

    // Define choices that use internal flows (pre-scripted responses)
    const internalFlowChoices = ['Our Process', 'New Quote'];
    
    if (internalFlowChoices.includes(choiceText)) {
      // Route to internal flow handlers
      switch (choiceText) {
        case 'Our Process':
          await this.handleOurProcessChoice();
          break;

        case 'New Quote':
          await this.handleNewQuoteChoice();
          break;
      }
    } else {
      // Pass all other choices directly to GPT for intelligent responses
      // This includes: 'Why work with SmarterPayouts?', 'Compare An Offer', etc.
      console.log('[ChoiceHandler] Passing to GPT for direct response:', choiceText);
      await this.handleGPTPassthrough(choiceText);
    }
  }

  private async handleOurProcessChoice(): Promise<void> {
    const { setVisibleMessages, setIsTyping } = this.deps;

    // Define all messages in the flow (same pattern as useWelcomeScript)
    const processMessages = [
      {
        id: generateUniqueId(),
        type: 'text' as const,
        text: 'Our Process',
        sender: 'user' as const,
      },
      {
        id: generateUniqueId(),
        type: 'text' as const,
        text: "Sure! Here's our process in simpler terms:",
        sender: 'bot' as const,
      },
      {
        id: generateUniqueId(),
        type: 'text' as const,
        text: "Step 1: Use our AI calculator to get an instant quote without sharing any personal info.",
        sender: 'bot' as const,
      },
      {
        id: generateUniqueId(),
        type: 'text' as const,
        text: "Step 2: Review our clear terms with no hidden fees, and discuss everything with your dedicated specialist.",
        sender: 'bot' as const,
      },
      {
        id: generateUniqueId(),
        type: 'text' as const,
        text: "Step 3: Our legal team takes care of all the necessary court filings and keeps you updated.",
        sender: 'bot' as const,
      },
      {
        id: generateUniqueId(),
        type: 'text' as const,
        text: "Step 4: Once approved, you'll receive your money quickly, usually within 2-5 business days via secure transfer or certified check.",
        sender: 'bot' as const,
      },
      {
        id: generateUniqueId(),
        type: 'text' as const,
        text: "Ready to get started? Here's how to reach us:",
        sender: 'bot' as const,
      },
    ];

    // Reveal messages sequentially with typing indicators (same pattern as useWelcomeScript)
    for (let i = 0; i < processMessages.length; i++) {
      // Show typing indicator
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Hide typing and show message
      setIsTyping(false);
      setVisibleMessages(prev => [...prev, processMessages[i]]);
      
      // Small delay between messages for readability
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Finally, add the ContactOptions component
    await new Promise(resolve => setTimeout(resolve, 500));
    const contactOptionsMessage = {
      id: generateUniqueId(),
      type: 'component' as const,
      component: React.createElement(ContactOptions),
    };
    setVisibleMessages(prev => [...prev, contactOptionsMessage]);
  }

  /**
   * GPT Passthrough Handler - Forwards exact question text to AI
   * 
   * This method passes the original question directly to GPT without modification,
   * allowing the AI to use its DIRECT RESPONSES for exact matches.
   * 
   * Examples:
   * - "Why work with SmarterPayouts?" → AI uses direct response
   * - "How fast can I get my money?" → AI uses direct response
   * - "Compare An Offer" → AI provides helpful conversational response
   */
  private async handleGPTPassthrough(choiceText: string): Promise<void> {
    const { advanceConversation } = this.deps;
    
    console.log('[ChoiceHandler] GPT Passthrough - Original question:', choiceText);
    
    // Pass the exact question text as both user message and bot confirmation
    // This ensures the AI receives the exact question and can match it to DIRECT RESPONSES
    await advanceConversation({
      userMessageText: choiceText,
      botConfirmationText: choiceText // Pass through the exact question
    });
    
    console.log('[ChoiceHandler] ✅ Question forwarded to GPT for direct response');
  }

  private async handleNewQuoteChoice(): Promise<void> {
    const { startConversationalForm } = this.deps;
    await startConversationalForm();
  }
}
