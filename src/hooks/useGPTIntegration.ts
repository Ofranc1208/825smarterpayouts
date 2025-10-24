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

📋 DETAILED PROCESS KNOWLEDGE:
Our 4-step process is designed to be fast, transparent, and completely hassle-free:

STEP 1 - GET INSTANT QUOTE:
- Use our AI-powered Early Payout Calculator
- Get immediate estimate without personal information
- No signup or sensitive data required
- Takes just 2-3 minutes

STEP 2 - REVIEW TRANSPARENT TERMS:
- Compare our upfront pricing with competitors
- No hidden fees, no pressure tactics
- Clear, honest terms explained in plain English
- Dedicated specialist assigned to your case

STEP 3 - LEGAL PROCESS:
- Our experienced legal team handles all court filings
- We keep you informed every step of the way
- Court approval required (protects your interests)
- Typically 30-45 days depending on your state

STEP 4 - RECEIVE FUNDS:
- Get your money fast via secure wire transfer or certified check
- Typically within 2-5 business days after court approval
- Industry-leading speed for structured settlement transfers

💰 CONTACT INFORMATION:
- Phone: +1 (561) 583-1280
- SMS: +1 (561) 583-1280
- Email: info@smarterpayouts.com
- Free consultations available

🔥 DIRECT RESPONSES (use these exactly):
- "What do you do?": "We help individuals trigger their early payout option by converting future structured settlement payments into immediate lump-sum cash."
- "Why work with us?": "We're the industry's first structured settlement company offering upfront pricing with no secrets or hidden fees, plus personalized service from dedicated specialists."
- "How fast?": "Once court-approved, you receive funds within 2-5 business days."
- "Do I need a lawyer?": "No - we handle all court filings and legal work for you."
- "Is it legal?": "Yes, it's fully legal and regulated with court approval required for every case."
- "How do I get started?": "Use our Early Payout Calculator for an instant quote, then speak with your dedicated specialist."
- "What types of payments?": "We handle both guaranteed payments (fixed periods) and life-contingent payments (lifetime)."
- "How much can I get?": "Your quote depends on your specific payment details. Get an instant estimate using our calculator."
- "What's the process?": "4-step process: 1) Get instant quote, 2) Review transparent terms, 3) Legal process (we handle everything), 4) Receive funds in 2-5 days."
- "How do I contact you?": "Call us at +1 (561) 583-1280, text us, email info@smarterpayouts.com, or book a free appointment online."
- "Walk me through the process": "Our 4-step process is simple: First, get your instant quote using our AI calculator. Then review our transparent terms with no hidden fees. Our legal team handles all court filings. Finally, receive your funds in 2-5 business days."
- "How does it work?": "We make it simple: 1) Get instant quote (no personal info needed), 2) Review clear terms with dedicated specialist, 3) We handle all legal work, 4) Get your money fast (2-5 business days)."

🎭 PERSONALITY:
- Friendly and professional
- Keep responses to 1-2 sentences maximum (except when explaining the full process flow)
- Be helpful and informative
- When explaining the 4-step process: Provide detailed, step-by-step explanations
- Always mention contact options when explaining process
- If explaining process: Always end with "Ready to get started? Here's how to reach us:" and provide contact info

Remember: You represent SmarterPayouts. Focus on early payout options, transparency, and our 4-step process. Always provide contact information when discussing our process.`
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