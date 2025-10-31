/**
 * 🎼 GUARANTEED ASSISTANT ORCHESTRATOR
 * 
 * Central orchestrator for the Guaranteed Assistant system.
 * Coordinates all services and manages state transitions.
 */

import { GuaranteedAssistantState, GuaranteedAssistantActions, GuaranteedAssistantStep } from './types';
import { GuaranteedStorageService } from './GuaranteedStorageService';
import { GuaranteedMessageService } from './GuaranteedMessageService';
import { GuaranteedResponseService } from './GuaranteedResponseService';
import { GuaranteedFormData } from '../../components/calculator/guaranteedstep/utils/guaranteedTypes';

export class GuaranteedOrchestrator {
  /**
   * Initialize the assistant state
   */
  static initializeState(sessionId: string, formData: GuaranteedFormData): GuaranteedAssistantState {
    // Load messages from storage
    const storedMessages = GuaranteedStorageService.loadMessages(sessionId);

    return {
      isOpen: false,
      messages: storedMessages,
      isTyping: false,
      currentStep: null,
      formData,
      sessionId
    };
  }

  /**
   * Create orchestrated actions
   */
  static createActions(
    getState: () => GuaranteedAssistantState,
    setState: (updates: Partial<GuaranteedAssistantState>) => void
  ): GuaranteedAssistantActions {
    return {
      // ============================================================================
      // PANEL ACTIONS
      // ============================================================================

      openAssistant: () => {
        setState({ isOpen: true });
      },

      closeAssistant: () => {
        setState({ isOpen: false });
      },

      // ============================================================================
      // MESSAGE ACTIONS
      // ============================================================================

      sendMessage: async (text: string) => {
        if (!text.trim()) return;

        const currentState = getState();

        try {
          // Add user message
          const userMessage = GuaranteedMessageService.createUserMessage(
            text,
            currentState.currentStep || undefined,
            currentState.formData
          );
          const updatedMessages = [...currentState.messages, userMessage];
          setState({ messages: updatedMessages });
          GuaranteedStorageService.saveMessages(currentState.sessionId, updatedMessages);

          // Set typing indicator
          setState({ isTyping: true });

          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1500));

          // Generate response
          const response = GuaranteedResponseService.generateResponse(
            text,
            currentState.currentStep,
            currentState.formData
          );

          const assistantMessage = GuaranteedMessageService.createAssistantMessage(
            response,
            currentState.currentStep || undefined,
            currentState.formData
          );

          const finalMessages = [...updatedMessages, assistantMessage];
          setState({ messages: finalMessages, isTyping: false });
          GuaranteedStorageService.saveMessages(currentState.sessionId, finalMessages);

        } catch (error) {
          console.error('[GuaranteedOrchestrator] Send message error:', error);
          setState({ isTyping: false });
          
          // Add error message
          const errorMessage = GuaranteedMessageService.createErrorMessage(
            "Sorry, I'm having trouble connecting. Please try again.",
            currentState.currentStep || undefined,
            currentState.formData
          );
          const errorMessages = [...currentState.messages, errorMessage];
          setState({ messages: errorMessages });
          GuaranteedStorageService.saveMessages(currentState.sessionId, errorMessages);
        }
      },

      sendContextualMessage: async (text: string) => {
        if (!text.trim()) return;

        const currentState = getState();

        try {
          // Add user message with context
          const userMessage = GuaranteedMessageService.createUserMessage(
            text,
            currentState.currentStep || undefined,
            currentState.formData
          );
          const updatedMessages = [...currentState.messages, userMessage];
          setState({ messages: updatedMessages });
          GuaranteedStorageService.saveMessages(currentState.sessionId, updatedMessages);

          // Set typing indicator
          setState({ isTyping: true });

          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1200));

          // Generate contextual response
          const response = GuaranteedResponseService.generateResponse(
            text,
            currentState.currentStep,
            currentState.formData
          );

          const assistantMessage = GuaranteedMessageService.createMessage(
            response,
            'text',
            'assistant',
            {
              step: currentState.currentStep || undefined,
              formData: currentState.formData,
              contextAware: true
            }
          );

          const finalMessages = [...updatedMessages, assistantMessage];
          setState({ messages: finalMessages, isTyping: false });
          GuaranteedStorageService.saveMessages(currentState.sessionId, finalMessages);

        } catch (error) {
          console.error('[GuaranteedOrchestrator] Send contextual message error:', error);
          setState({ isTyping: false });
          
          // Add error message
          const errorMessage = GuaranteedMessageService.createErrorMessage(
            "Sorry, I'm having trouble connecting. Please try again.",
            currentState.currentStep || undefined,
            currentState.formData
          );
          const errorMessages = [...currentState.messages, errorMessage];
          setState({ messages: errorMessages });
          GuaranteedStorageService.saveMessages(currentState.sessionId, errorMessages);
        }
      },

      addUserChoice: (choice: string, step?: string) => {
        const currentState = getState();

        const choiceMessage = GuaranteedMessageService.createUserChoiceMessage(
          choice,
          step || currentState.currentStep || undefined,
          currentState.formData
        );

        const updatedMessages = [...currentState.messages, choiceMessage];
        setState({ messages: updatedMessages });
        GuaranteedStorageService.saveMessages(currentState.sessionId, updatedMessages);
      },

      addBotMessage: (text: string) => {
        const currentState = getState();

        const botMessage = GuaranteedMessageService.createBotMessage(
          text,
          currentState.currentStep || undefined,
          currentState.formData
        );

        const updatedMessages = [...currentState.messages, botMessage];
        setState({ messages: updatedMessages });
        GuaranteedStorageService.saveMessages(currentState.sessionId, updatedMessages);
      },

      addErrorMessage: (errorText?: string) => {
        const currentState = getState();
        const errorMessage = errorText || "Sorry, I'm having trouble connecting. Please try again.";

        const error = GuaranteedMessageService.createErrorMessage(
          errorMessage,
          currentState.currentStep || undefined,
          currentState.formData
        );

        const updatedMessages = [...currentState.messages, error];
        setState({ messages: updatedMessages });
        GuaranteedStorageService.saveMessages(currentState.sessionId, updatedMessages);
      },

      // ============================================================================
      // STEP ACTIONS
      // ============================================================================

      setCurrentStep: (step: GuaranteedAssistantStep) => {
        setState({ currentStep: step });
      },

      // ============================================================================
      // UTILITY ACTIONS
      // ============================================================================

      clearMessages: () => {
        const currentState = getState();
        setState({ messages: [] });
        GuaranteedStorageService.clearMessages(currentState.sessionId);
      },

      getStepGuidance: () => {
        const currentState = getState();
        return GuaranteedResponseService.getStepGuidance(currentState.currentStep, currentState.formData);
      },

      getSummaryForHandoff: () => {
        const currentState = getState();
        return GuaranteedResponseService.generateHandoffSummary(currentState.formData);
      },

      showWelcomeMessage: () => {
        const currentState = getState();
        if (!currentState.currentStep) return;

        const welcomeText = GuaranteedResponseService.getWelcomeMessage(
          currentState.currentStep,
          currentState.formData
        );

        if (welcomeText) {
          const welcomeMessage = GuaranteedMessageService.createWelcomeMessage(
            currentState.currentStep,
            currentState.formData
          );

          const updatedMessages = [...currentState.messages, welcomeMessage];
          setState({ messages: updatedMessages });
          GuaranteedStorageService.saveMessages(currentState.sessionId, updatedMessages);
        }
      },

      testErrorHandling: () => {
        setState({ isTyping: true });

        // Simulate error after delay
        setTimeout(() => {
          const currentState = getState();
          setState({ isTyping: false });

          const errorMessage = GuaranteedMessageService.createErrorMessage(
            "Test error: This is a simulated error for testing purposes.",
            currentState.currentStep || undefined,
            currentState.formData
          );

          const updatedMessages = [...currentState.messages, errorMessage];
          setState({ messages: updatedMessages });
          GuaranteedStorageService.saveMessages(currentState.sessionId, updatedMessages);
        }, 1000);
      },

      handoffToMainChat: () => {
        const currentState = getState();

        // Get the summary for handoff
        const summary = GuaranteedResponseService.generateHandoffSummary(currentState.formData);

        // Store the handoff data in localStorage for the main chat to pick up
        const handoffData = {
          timestamp: new Date().toISOString(),
          summary: summary,
          fromStep: currentState.currentStep,
          formData: currentState.formData,
          completedFlow: 'guaranteed'
        };

        localStorage.setItem('chat_handoff_data', JSON.stringify(handoffData));

        // Add a farewell message
        const handoffMessage = GuaranteedMessageService.createHandoffMessage(
          currentState.currentStep || undefined
        );

        const updatedMessages = [...currentState.messages, handoffMessage];
        setState({ messages: updatedMessages });
        GuaranteedStorageService.saveMessages(currentState.sessionId, updatedMessages);

        // Close the assistant after a delay
        setTimeout(() => {
          setState({ isOpen: false });

          // Navigate to main chat with handoff parameter
          const currentUrl = new URL(window.location.href);
          const currentSessionId = currentUrl.searchParams.get('sessionId') || currentState.sessionId;

          // If we're not already on the main chat page, navigate there
          if (!window.location.pathname.includes('mint-intelligent-chat')) {
            const handoffUrl = `/mint-intelligent-chat?sessionId=${currentSessionId}&handoff=guaranteed&chat=open`;
            window.location.href = handoffUrl;
          } else {
            // If we're already on the chat page, just trigger a reload with the parameters
            currentUrl.searchParams.set('sessionId', currentSessionId);
            currentUrl.searchParams.set('handoff', 'guaranteed');
            currentUrl.searchParams.set('chat', 'open');
            window.location.href = currentUrl.toString();
          }
        }, 2000);
      }
    };
  }
}

