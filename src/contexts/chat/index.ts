/**
 * Chat Context Orchestra Pattern - Index
 * 
 * Clean exports for the orchestrated chat system
 */

export { ChatProvider, useChat } from './ChatContext';
export type { ChatContextType, ChatProviderProps } from './types';

// Internal orchestrators (for testing/debugging)
export { MessageOrchestrator } from './MessageOrchestrator';
export { TextMessageProcessor } from './TextMessageProcessor';
export { FileMessageProcessor } from './FileMessageProcessor';
export { CalculationLinkManager } from './CalculationLinkManager';
export { generateUniqueId, createBotMessage, createUserMessage } from './utils';
