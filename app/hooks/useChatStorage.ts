/* 
 * ===================================================================
 * useChatStorage.ts - DEPRECATED
 * ===================================================================
 * This hook has been moved to src/hooks/useChatStorage.ts
 * All chat storage and Firebase integration functionality is now handled from the src directory
 * This file can be safely deleted after testing confirms stability
 * 
 * Migration completed: [Current Date]
 * Components affected: All chat components that use message persistence
 * Features moved:
 * - ChatMessage interface and utilities
 * - Firebase Firestore integration
 * - Message saving/loading functionality
 * - Hand-off request logging
 * - Message conversion utilities (convertToStoredMessage, convertToMessage)
 * - Message filtering utilities (filterValidMessages, deduplicateMessages)
 * - OpenAI message formatting (toOpenAIMessages)
 * - Complete useChatStorage hook with all methods
 * ===================================================================
 */ 