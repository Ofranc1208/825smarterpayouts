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

  async handleChoice(choiceText: string): Promise<void> {
    switch (choiceText) {
      case 'Our Process':
        await this.handleOurProcessChoice();
        break;

      case 'General Questions':
        await this.handleGeneralQuestionsChoice(choiceText);
        break;

      case 'New Quote':
        await this.handleNewQuoteChoice();
        break;

      default:
        console.log('Unhandled choice:', choiceText);
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

  private async handleGeneralQuestionsChoice(choiceText: string): Promise<void> {
    const { advanceConversation } = this.deps;
    await advanceConversation({
      userMessageText: choiceText,
      botConfirmationText: "I'm here to help with any questions you have about structured settlements, selling your payments, or our services. What would you like to know?"
    });
    // Start general conversation mode - let the AI handle the rest
  }

  private async handleNewQuoteChoice(): Promise<void> {
    const { startConversationalForm } = this.deps;
    await startConversationalForm();
  }
}
