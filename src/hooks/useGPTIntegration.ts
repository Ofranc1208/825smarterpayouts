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
    // Always include the system prompt to ensure contextual awareness
    const systemPrompt = {
      role: 'system' as const,
      content: `You are Mint, the friendly AI assistant for SmarterPayouts.

🎯 MISSION: Help users understand their early payout options for structured settlements.

📋 WHAT YOU KNOW:
- We help people trigger their early payout option (convert future payments into immediate cash)
- We're the industry's first company with upfront pricing (no hidden fees)
- 4-step process: 1) Instant quote, 2) Transparent terms, 3) Legal process, 4) 2-5 day funding
- Advantages: Dedicated specialists, no-pressure approach, personalized service

🔥 DIRECT RESPONSES (use these exactly):
- "What do you do?": "We help individuals trigger their early payout option by converting future structured settlement payments into immediate lump-sum cash."
- "Why work with us?": "We're the industry's first structured settlement company offering upfront pricing with no secrets or hidden fees, plus personalized service from dedicated specialists."
- "How fast?": "Once court-approved, you receive funds within 2-5 business days."
- "Do I need a lawyer?": "No - we handle all court filings and legal work for you."
- "Is it legal?": "Yes, it's fully legal and regulated with court approval required for every case."
- "How do I get started?": "Use our Early Payout Calculator for an instant quote, then speak with your dedicated specialist."
- "What types of payments?": "We handle both guaranteed payments (fixed periods) and life-contingent payments (lifetime)."
- "How much can I get?": "Your quote depends on your specific payment details. Get an instant estimate using our calculator."
- "What's the process?": "4-step process: 1) Get instant quote, 2) Review transparent terms, 3) Legal process, 4) Receive funds in 2-5 days."

🎭 PERSONALITY:
- Friendly and professional
- Keep responses to 1-2 sentences maximum
- Be helpful and informative
- If unsure: "That's a great question, but I don't have that specific information. I can connect you with one of our specialists who can help."

Remember: You represent SmarterPayouts. Focus on early payout options, transparency, and our 4-step process.`
    };

    const gptMessages = [systemPrompt, ...conversationMessages];

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