import { TextMessage, Message } from './useConversationalForm';
import { sendToGpt } from './useChatGpt';
import { SYSTEM_PROMPT, getContextAwarePrompt, getIntentClassifierPrompt } from '../prompts/mainPrompts';
import StepRenderer from '../components/calculator/StepRenderer';
import React from 'react';

interface UseGPTIntegrationProps {
  visibleMessages: Message[];
}

// Unique ID generator to prevent duplicate keys
let messageCounter = 0;
const generateUniqueId = () => {
  messageCounter += 1;
  return `msg-${Date.now()}-${messageCounter}`;
};

export const useGPTIntegration = ({ visibleMessages }: UseGPTIntegrationProps) => {
  /**
   * Intent classification using the new prompt and non-streaming API call
   */
  const fetchIntent = async (snapshot: any, userInput: string) => {
    const prompt = getIntentClassifierPrompt(snapshot, userInput);
    try {
      const res = await fetch('/api/chat-gpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'system', content: prompt }] }),
      });
      if (!res.ok) throw new Error('Intent API error');
      const data = await res.json();
      // Try to parse the response as JSON
      try {
        if (typeof data.content === 'string') {
          return JSON.parse(data.content);
        }
        return data.content;
      } catch (err) {
        return { intent: 'AMBIGUOUS', value: userInput };
      }
    } catch (err) {
      return { intent: 'AMBIGUOUS', value: userInput };
    }
  };

  /**
   * Streaming GPT response for conversational answers
   * onStream: (partialText: string) => void
   * onComplete: (finalText: string) => void
   * Accepts dependencies as arguments instead of using context hooks
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
    const allMessages = [...visibleMessages, userMessage];
    const conversationMessages = allMessages
      .filter((msg): msg is TextMessage => msg.type === 'text')
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
    const hasFormComponents = allMessages.some(msg => msg.type === 'component');
    const isInFormFlow = hasFormComponents;
    const enhancedSystemPrompt = {
      role: 'system' as const,
      content: getContextAwarePrompt({
        isInFormFlow,
        messageCount: conversationMessages.length,
        hasFormComponents,
        userQuestion: userMessage.text
      })
    };
    const gptMessages = [enhancedSystemPrompt, ...conversationMessages];

    // Streaming fetch
    const res = await fetch('/api/chat-gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: gptMessages, stream: true }),
    });
    if (!res.body) {
      onComplete && onComplete('');
      return;
    }
    const reader = res.body.getReader();
    let fullText = '';
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (value) {
        const chunk = new TextDecoder().decode(value);
        fullText += chunk;
        onStream(fullText);
      }
    }
    // Bulletproof parsing for the final message
    let finalContent = fullText; // Default to the raw message
    try {
      if (fullText.trim().startsWith('{') && fullText.trim().endsWith('}')) {
        const parsedJson = JSON.parse(fullText);
        if (parsedJson && typeof parsedJson.content === 'string') {
          finalContent = parsedJson.content;
        }
      }
    } catch (e) {
      console.error('AI response parsing error:', e);
      finalContent = fullText;
    }
    onComplete && onComplete(finalContent);
    triggerReprompt();

    // Insert StepRenderer into chat after AI response is complete
    setVisibleMessages(prev => [
      ...prev,
      {
        id: `step-${Date.now()}`,
        type: 'component',
        component: React.createElement(StepRenderer, { stepId: currentStep || '' }),
      }
    ]);
  };

  return {
    processMessageWithGPT,
    fetchIntent,
  };
}; 