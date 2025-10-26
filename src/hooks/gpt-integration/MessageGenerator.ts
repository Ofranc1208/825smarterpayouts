/**
 * Message Generator Module
 * 
 * Responsible for generating unique message IDs and
 * creating message objects for the chat interface.
 * 
 * @module MessageGenerator
 */

// Unique ID generator to prevent duplicate keys
let messageCounter = 0;

/**
 * Generates a unique message ID
 * Uses timestamp and counter to ensure uniqueness
 */
export function generateUniqueId(): string {
  messageCounter += 1;
  return `msg-${Date.now()}-${messageCounter}`;
}

/**
 * Resets the message counter
 * Useful for testing or when starting a new session
 */
export function resetMessageCounter(): void {
  messageCounter = 0;
}

