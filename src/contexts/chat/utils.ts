/**
 * Chat Context Utilities - Orchestra Pattern
 * 
 * Shared utilities for the chat system
 */

// Unique ID generator to prevent duplicate keys
let messageCounter = 0;

export const generateUniqueId = (): string => {
  messageCounter += 1;
  return `msg-${Date.now()}-${messageCounter}`;
};

export const createBotMessage = (text: string, id?: string) => ({
  id: id || generateUniqueId(),
  type: 'text' as const,
  text,
  sender: 'bot' as const,
  createdAt: new Date().toISOString(),
});

export const createUserMessage = (text: string) => ({
  id: generateUniqueId(),
  type: 'text' as const,
  text,
  sender: 'user' as const,
  createdAt: new Date().toISOString(),
});
