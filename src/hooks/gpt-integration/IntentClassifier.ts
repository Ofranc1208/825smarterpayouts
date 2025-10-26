/**
 * Intent Classifier Module
 * 
 * Responsible for classifying user intent during form flows
 * to determine if the user is answering a form question or
 * asking a general question.
 * 
 * @module IntentClassifier
 */

import { getIntentClassifierPrompt } from '../../prompts/mainPrompts';

export interface IntentResult {
  intent: 'FORM_ANSWER' | 'ASK_QUESTION' | 'SPEAK_TO_AGENT' | 'AMBIGUOUS';
  value: string;
}

/**
 * Classifies user intent using GPT
 * Returns structured intent information for routing
 */
export async function classifyIntent(
  snapshot: any,
  userInput: string
): Promise<IntentResult> {
  try {
    const prompt = getIntentClassifierPrompt(snapshot, userInput);
    
    const response = await fetch('/api/chat-gpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        messages: [{ role: 'system', content: prompt }] 
      }),
    });

    if (!response.ok) {
      throw new Error('Intent API error');
    }

    const data = await response.json();

    // Parse the response
    return parseIntentResponse(data.content, userInput);
  } catch (error) {
    console.error('Intent classification error:', error);
    return { intent: 'AMBIGUOUS', value: userInput };
  }
}

/**
 * Parses the intent response from GPT
 * Handles both JSON and plain text responses
 */
function parseIntentResponse(content: any, fallbackValue: string): IntentResult {
  try {
    // If already an object, return it
    if (typeof content === 'object' && content.intent) {
      return content as IntentResult;
    }

    // If string, try to parse as JSON
    if (typeof content === 'string') {
      const parsed = JSON.parse(content);
      if (parsed.intent) {
        return parsed as IntentResult;
      }
    }

    // Fallback to ambiguous
    return { intent: 'AMBIGUOUS', value: fallbackValue };
  } catch (error) {
    console.error('Intent parsing error:', error);
    return { intent: 'AMBIGUOUS', value: fallbackValue };
  }
}

