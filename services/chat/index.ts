/**
 * Chat Services - Centralized Exports
 *
 * Exports all chat-related services for easy importing
 * throughout the application.
 */

// Core live chat functionality
export { LiveChatService, liveChatService } from './LiveChatService';
export type { LiveChatSession, LiveChatMessage } from './LiveChatService';

// Specialist management
export { SpecialistService, specialistService } from './SpecialistService';
export type { SpecialistProfile, SpecialistAssignment } from './SpecialistService';

// Twilio Chat integration
export { TwilioChatService, twilioChatService } from './TwilioChatService';
export type { TwilioChatConfig, TwilioMessage } from './TwilioChatService';

// Re-export Firebase utilities for convenience
export { realtimeManager } from '../../lib/firebase/realtime';
export { firestoreManager } from '../../lib/firebase/firestore';

// Re-export types
export type {
  ChatSession,
  ChatMessage,
  Specialist,
  ChatQueue
} from '../../lib/firebase/realtime';

export type {
  ChatAnalytics
} from '../../lib/firebase/firestore';
