/**
 * Conversation Formatter Module
 * 
 * Responsible for formatting conversation messages for GPT API
 * and managing conversation history.
 * 
 * @module ConversationFormatter
 */

import { Message, TextMessage } from '../useConversationalForm';

export interface FormattedMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Formats visible messages into GPT-compatible conversation format
 * Filters out non-text messages and converts to role-based format
 */
export function formatConversationMessages(
  visibleMessages: Message[],
  userMessage: TextMessage
): FormattedMessage[] {
  const allMessages = [...visibleMessages, userMessage];
  
  return allMessages
    .filter((msg): msg is TextMessage => msg.type === 'text')
    .map(msg => ({
      role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
      content: msg.text
    }));
}

/**
 * Checks if the conversation includes form components
 * Used to determine if user is in a form flow
 */
export function hasFormFlow(visibleMessages: Message[]): boolean {
  return visibleMessages.some(msg => msg.type === 'component');
}

