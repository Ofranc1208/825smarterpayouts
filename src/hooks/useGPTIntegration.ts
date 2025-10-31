/**
 * 🎯 Enhanced GPT Integration Hook (Refactored with Orchestra Pattern)
 *
 * This hook orchestrates all GPT integration functionality by delegating
 * to specialized modules. Each module has a single responsibility and can
 * be tested, debugged, and maintained independently.
 *
 * Architecture:
 * - ContextRetriever: Fetches relevant context from various sources
 * - SystemPromptBuilder: Constructs comprehensive system prompts
 * - ConversationFormatter: Formats messages for GPT API
 * - StreamingHandler: Manages streaming responses
 * - IntentClassifier: Classifies user intent during form flows
 * - MessageGenerator: Generates unique message IDs
 *
 * @module useGPTIntegration
 */

import React from 'react';
import { TextMessage, Message } from './useConversationalForm';
import StepRenderer from '../components/calculator/StepRenderer';

// Import all specialized modules
import {
  retrieveVectorContext,
  generateContextHints,
  buildSystemPrompt,
  formatConversationMessages,
  hasFormFlow,
  processStreamingResponse,
  makeStreamingAPICall,
  classifyIntent,
  generateUniqueId
} from './gpt-integration';

interface UseGPTIntegrationProps {
  visibleMessages: Message[];
}

export const useGPTIntegration = ({ visibleMessages }: UseGPTIntegrationProps) => {
  /**
   * Intent classification - delegates to IntentClassifier module
   * Used during form flows to determine if user is answering or asking
   */
  const fetchIntent = async (snapshot: any, userInput: string) => {
    return classifyIntent(snapshot, userInput);
  };

  /**
   * Main GPT processing function - orchestrates all modules
   * Handles streaming responses and integrates context-aware prompts
   */
  const processMessageWithGPT = async (
    {
      userMessage,
      onStream,
      onComplete,
      setVisibleMessages,
      currentStep,
      triggerReprompt
    }: {
      userMessage: TextMessage,
      onStream: (partialText: string) => void,
      onComplete?: (finalText: string) => void,
      setVisibleMessages: React.Dispatch<React.SetStateAction<Message[]>>,
      currentStep: string | null,
      triggerReprompt: () => void
    }
  ) => {
    // Step 1: Format conversation messages
    const conversationMessages = formatConversationMessages(visibleMessages, userMessage);
    const isInFormFlow = hasFormFlow(visibleMessages);

    // Step 2: Retrieve vector context (if available)
    const retrievedContext = await retrieveVectorContext(userMessage.text);

    // Step 3: Generate context hints for all knowledge domains
    const contextHints = generateContextHints(userMessage.text);

    // Step 4: Build comprehensive system prompt
    const systemPrompt = buildSystemPrompt({
      retrievedContext: retrievedContext.content ? retrievedContext : undefined,
      contextHints
    });

    // Step 5: Combine system prompt with conversation
    const gptMessages = [systemPrompt, ...conversationMessages];

    // Step 6: Make streaming API call
    const response = await makeStreamingAPICall(gptMessages);

    // Step 7: Process streaming response
    const finalContent = await processStreamingResponse(response, {
      onStream,
      onComplete
    });

    // Step 8: Only trigger reprompt and insert StepRenderer if actually in a calculator flow
    // Only insert when we have a valid calculator step (not just any currentStep value)
    const isCalculatorStep = currentStep && (
      currentStep.startsWith('lcp_') || 
      ['mode', 'amount', 'dates', 'review', 'offer', 'increase'].includes(currentStep)
    );
    
    if (isCalculatorStep) {
      triggerReprompt();
      
      // Step 9: Insert StepRenderer component ONLY when in active calculator flow
      setVisibleMessages(prev => [
        ...prev,
        {
          id: `step-${Date.now()}`,
          type: 'component',
          component: React.createElement(StepRenderer, { stepId: currentStep }),
        }
      ]);
    }
  };

  return {
    processMessageWithGPT,
    fetchIntent,
  };
}; 