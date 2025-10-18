/**
 * Chat Context - Legacy Compatibility Layer
 * 
 * This file now imports from the new orchestrated chat system
 * Maintains backward compatibility while using the new architecture
 */

// Re-export everything from the new orchestrated system
export { ChatProvider, useChat } from './chat';
export type { ChatContextType } from './chat'; 