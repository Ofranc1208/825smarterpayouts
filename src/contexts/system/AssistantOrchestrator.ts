// Assistant Orchestrator - Coordinates all assistant services
// ==========================================================

import { AssistantMessage, AssistantState, AssistantActions, AssistantFlowType, AssistantStep } from './types';
import { AssistantStorageService } from './AssistantStorageService';
import { AssistantMessageService } from './AssistantMessageService';
import { AssistantResponseService } from './AssistantResponseService';

export class AssistantOrchestrator {
  /**
   * Initialize assistant state from storage
   */
  static initializeState(): Partial<AssistantState> {
    const savedMessages = AssistantStorageService.loadMessages();
    return {
      isOpen: false,
      messages: savedMessages,
      isTyping: false,
      currentStep: null,
      flowType: null
    };
  }

  /**
   * Create all assistant actions
   */
  static createActions(
    getState: () => AssistantState,
    setState: (updates: Partial<AssistantState>) => void
  ): AssistantActions {
    return {
      openAssistant: () => {
        console.log('[AssistantOrchestrator] Opening assistant');
        setState({ isOpen: true });
      },

      closeAssistant: () => {
        console.log('[AssistantOrchestrator] Closing assistant');
        setState({ isOpen: false });
      },

      setIsTyping: (isTyping: boolean) => {
        setState({ isTyping });
      },

      sendMessage: async (text: string) => {
        if (!text.trim()) return;

        console.log('[AssistantOrchestrator] Sending message:', text);
        const currentState = getState();

        // Add user message
        const userMessage = AssistantMessageService.createUserMessage(
          text, 
          currentState.currentStep, 
          currentState.flowType
        );
        const updatedMessages = [...currentState.messages, userMessage];
        setState({ 
          messages: updatedMessages,
          isTyping: true 
        });

        try {
          // Simulate API delay
          await AssistantResponseService.simulateApiDelay();

          // Check for simulated error
          if (AssistantResponseService.shouldSimulateError()) {
            throw new Error('Simulated API error');
          }

          // Generate response
          const responseText = AssistantResponseService.getContextAwareResponse(
            text, 
            currentState.flowType, 
            currentState.currentStep
          );

          const aiMessage = AssistantMessageService.createBotMessage(
            responseText,
            currentState.currentStep,
            currentState.flowType
          );

          const finalMessages = [...updatedMessages, aiMessage];
          setState({ 
            messages: finalMessages,
            isTyping: false 
          });

          // Save to storage
          AssistantStorageService.saveMessages(finalMessages);

        } catch (error) {
          console.error('[AssistantOrchestrator] Send message error:', error);
          
          const errorMessage = AssistantMessageService.createErrorMessage(
            "Sorry, I'm having trouble connecting. Please try again.",
            currentState.currentStep,
            currentState.flowType
          );

          const errorMessages = [...updatedMessages, errorMessage];
          setState({ 
            messages: errorMessages,
            isTyping: false 
          });

          // Save to storage
          AssistantStorageService.saveMessages(errorMessages);
        }
      },

      addWelcomeMessage: () => {
        const currentState = getState();
        
        // Check for duplicates using current state
        if (AssistantMessageService.hasWelcomeMessage(currentState.messages)) {
          console.log('[AssistantOrchestrator] Welcome message already exists, skipping');
          return;
        }

        console.log('[AssistantOrchestrator] Adding welcome message for flowType:', currentState.flowType);

        const welcomeMessage = AssistantMessageService.createWelcomeMessage(
          currentState.flowType,
          currentState.currentStep
        );

        const updatedMessages = [...currentState.messages, welcomeMessage];
        setState({ messages: updatedMessages });

        // Save to storage
        AssistantStorageService.saveMessages(updatedMessages);
      },

      addBotMessage: (text: string) => {
        const currentState = getState();
        console.log('[AssistantOrchestrator] Adding bot message:', text);

        const botMessage = AssistantMessageService.createBotMessage(
          text,
          currentState.currentStep,
          currentState.flowType
        );

        const updatedMessages = [...currentState.messages, botMessage];
        setState({ messages: updatedMessages });

        // Save to storage
        AssistantStorageService.saveMessages(updatedMessages);
      },

      addTestMessage: () => {
        console.log('[AssistantOrchestrator] Adding test message');
        const currentState = getState();
        
        const testMessage = AssistantMessageService.createTestMessage(
          currentState.currentStep,
          currentState.flowType
        );

        const updatedMessages = [...currentState.messages, testMessage];
        setState({ messages: updatedMessages });

        // Simulate bot response
        setTimeout(() => {
          const responseState = getState();
          const botResponse = AssistantMessageService.createBotMessage(
            'Thanks for the test message! I can help you with any questions about this calculation step.',
            responseState.currentStep,
            responseState.flowType
          );

          const finalMessages = [...responseState.messages, botResponse];
          setState({ messages: finalMessages });
          AssistantStorageService.saveMessages(finalMessages);
        }, 1000);
      },

      testErrorHandling: () => {
        console.log('[AssistantOrchestrator] Testing error handling');
        const currentState = getState();
        
        const testMessage = AssistantMessageService.createTestMessage(
          currentState.currentStep,
          currentState.flowType
        );

        const updatedMessages = [...currentState.messages, testMessage];
        setState({ 
          messages: updatedMessages,
          isTyping: true 
        });

        // Simulate error after delay
        setTimeout(() => {
          const errorState = getState();
          const errorMessage = AssistantMessageService.createErrorMessage(
            "Sorry, I'm having trouble connecting. Please try again.",
            errorState.currentStep,
            errorState.flowType
          );

          const finalMessages = [...errorState.messages, errorMessage];
          setState({ 
            messages: finalMessages,
            isTyping: false 
          });

          AssistantStorageService.saveMessages(finalMessages);
        }, 1000);
      },

      setCurrentStep: (step: AssistantStep) => {
        console.log('[AssistantOrchestrator] Setting current step:', step);
        setState({ currentStep: step });
      },

      setFlowType: (flowType: AssistantFlowType) => {
        console.log('[AssistantOrchestrator] Setting flow type:', flowType);
        setState({ flowType });
      },

      clearMessages: () => {
        console.log('[AssistantOrchestrator] Clearing all messages');
        setState({ messages: [] });
        AssistantStorageService.clearMessages();
      }
    };
  }

  /**
   * Handle messages persistence
   */
  static handleMessagesPersistence(messages: AssistantMessage[]): void {
    if (messages.length > 0) {
      AssistantStorageService.saveMessages(messages);
    }
  }
}
