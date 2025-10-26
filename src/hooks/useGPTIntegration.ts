/**
 * 🎯 BACKUP: Original AI System (Before Mini-AI Connector Implementation)
 *
 * This is the original, working AI system before implementing the hybrid RAG system.
 * If any issues occur, comment out the new system and uncomment this backup.
 *
 * Original system prompt: SYSTEM_PROMPT from mainPrompts
 * Original functionality: Static knowledge base with direct responses
 * Original integration: Simple OpenAI API calls
 */

/**
 * 🎯 Enhanced GPT Integration with Vector Context
 *
 * This enhanced version adds vector-based context retrieval while maintaining
 * complete backward compatibility and safety mechanisms.
 */

import { TextMessage, Message } from './useConversationalForm';
import { sendToGpt } from './useChatGpt';
import { SYSTEM_PROMPT, getContextAwarePrompt, getIntentClassifierPrompt } from '../prompts/mainPrompts';
import { KNOWLEDGE_BASE } from '../prompts/knowledgeBase';
import { FAQ_INTEGRATION_CONTENT, getFAQContextHint } from '../prompts/faqIntegration';
import StepRenderer from '../components/calculator/StepRenderer';
import React from 'react';
import { DEFAULT_FEATURE_FLAGS } from '../../types/vector';

// Safe imports - only load if vector system is enabled
let vectorManager: any = null;
let isVectorAvailable = false;

try {
  if (DEFAULT_FEATURE_FLAGS.enableVectorAI) {
    const { vectorManager: vm } = require('../../lib/firebase/managers/VectorManager');
    vectorManager = vm;
    isVectorAvailable = true;
  }
} catch (error) {
  console.log('🔒 Vector system not available - using standard AI mode');
}

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

    // 🎯 Enhanced Context Retrieval (Safe Implementation)
    let retrievedContext = '';
    let contextSource = 'static'; // Default to static knowledge base

    try {
      if (isVectorAvailable && vectorManager && DEFAULT_FEATURE_FLAGS.enableVectorAI) {
        console.log('🔍 Searching vector knowledge base...');

        // For now, use a simple keyword-based search (MVP approach)
        // In production, this would use proper vector embeddings
        const searchQuery = userMessage.text.toLowerCase();

        // Simple relevance matching based on keywords
        if (searchQuery.includes('company') || searchQuery.includes('about') || searchQuery.includes('statistics')) {
          retrievedContext = `Company Statistics: 400+ happy clients served, $50M+ in future payments purchased, 4.9/5 customer rating, founded in 2015, licensed in all 50 states.`;
          contextSource = 'company_data';
        } else if (searchQuery.includes('process') || searchQuery.includes('how') || searchQuery.includes('step')) {
          retrievedContext = `4-Step Process: 1) Get instant quote (no personal info), 2) Review transparent terms, 3) Legal process (we handle everything), 4) Receive funds in 2-5 days after court approval.`;
          contextSource = 'process_data';
        } else if (searchQuery.includes('contact') || searchQuery.includes('phone') || searchQuery.includes('email')) {
          retrievedContext = `Contact Information: Phone: +1 (561) 583-1280, SMS: +1 (561) 583-1280, Email: info@smarterpayouts.com.`;
          contextSource = 'contact_data';
        }

        if (retrievedContext) {
          console.log(`✅ Retrieved context from ${contextSource}`);
        }
      }
    } catch (error) {
      console.log('⚠️ Vector context unavailable, using static knowledge:', error instanceof Error ? error.message : 'Unknown error');
      // Safe fallback - continue with static knowledge base
    }

    // Generate FAQ context hint based on user's message
    const faqContextHint = getFAQContextHint(userMessage.text);

    // Always include the system prompt to ensure contextual awareness
    const systemPrompt = {
      role: 'system' as const,
      content: `You are Mint, the friendly conversational AI assistant for SmarterPayouts.

${retrievedContext ? `🔍 RETRIEVED CONTEXT (${contextSource.toUpperCase()}):
${retrievedContext}

` : ''}🎯 MISSION: Help people understand their early payout options through friendly, natural conversations.

🚨 MANDATORY: Direct Response Priority - HIGHEST PRIORITY
- If the user's question matches ANY direct response below, respond with ONLY that exact answer
- NO additional text, contact info, follow-ups, explanations, or next steps
- Return the direct response as a complete, standalone answer
- Do NOT combine with other information, questions, or suggestions
- Do NOT paraphrase - use the exact wording provided

📚 COMPLETE KNOWLEDGE BASE:
${KNOWLEDGE_BASE}

${FAQ_INTEGRATION_CONTENT}
${faqContextHint}

💬 CONVERSATION RULES (use only when direct responses don't apply):
- For FAQ questions: Reference the FAQ content above and provide clear, direct answers
- For process questions: Walk through our 4-step process with appropriate detail
- For company questions: Use our statistics and differentiators naturally
- For complex questions: Offer to connect them with a specialist for personalized help
- Keep responses concise (1-3 sentences maximum) unless explaining complex topics
- Be conversational but focus on education, not sales pressure

📞 Contact Information (DO NOT MENTION UNLESS EXPLICITLY ASKED):
- Only provide contact details if user specifically asks for phone, email, or contact methods
- Never add contact info to direct responses or FAQ answers
- Phone: +1 (561) 583-1280
- SMS: +1 (561) 583-1280
- Email: info@smarterpayouts.com
- Early Payout Calculator: Available on our website
- Free consultations available

🔥 DIRECT RESPONSES (ALWAYS PRIORITIZE THESE - use EXACTLY):

When user asks "What do you do?" or similar:
→ "We help individuals trigger their early payout option by converting future structured settlement payments into immediate lump-sum cash."

When user asks "Why work with us?" or "Why work with SmarterPayouts?" or "Why choose you?" or similar:
→ "We're the industry's first structured settlement company offering upfront pricing with no secrets or hidden fees, plus personalized service from dedicated specialists. We've served 400+ happy clients and purchased over $50 million in future payments."

When user asks "How fast?" or "How quickly?" or similar:
→ "Once court-approved, you receive funds within 2-5 business days."

When user asks "Do I need a lawyer?" or similar:
→ "No - we handle all court filings and legal work for you."

When user asks "Is it legal?" or "Is this legal?" or similar:
→ "Yes, it's fully legal and regulated with court approval required for every case."

When user asks "How do I get started?" or "How to start?" or similar:
→ "Use our Early Payout Calculator for an instant quote, then speak with your dedicated specialist."

When user asks "What types of payments?" or similar:
→ "We handle both guaranteed payments (fixed periods) and life-contingent payments (lifetime)."

When user asks "How much can I get?" or similar:
→ "Your quote depends on your specific payment details. Get an instant estimate using our calculator."

When user asks "What's the process?" or "How does it work?" or similar:
→ "4-step process: 1) Get instant quote, 2) Review transparent terms, 3) Legal process, 4) Receive funds in 2-5 days."

When user asks "How many customers?" or similar:
→ "We've served over 400 happy clients since 2015."

When user asks "How much have you done?" or similar:
→ "We've purchased over $50 million worth of future payments for our clients."

When user asks "How long have you been in business?" or similar:
→ "We were founded in 2015 and are licensed in all 50 states."

⚠️ CRITICAL REMINDER: When a direct response matches the user's question, STOP after that response. Do not add anything else. The direct responses are complete answers on their own.`
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