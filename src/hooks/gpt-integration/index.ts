/**
 * GPT Integration Module - Orchestrator
 * 
 * Central export point for all GPT integration modules.
 * This follows the Orchestra pattern where each module has a single responsibility
 * and can be tested, debugged, and maintained independently.
 * 
 * @module gpt-integration
 */

// Context Management
export {
  retrieveVectorContext,
  generateContextHints,
  type RetrievedContext,
  type ContextHints
} from './ContextRetriever';

// System Prompt Construction
export {
  buildSystemPrompt,
  type SystemPromptConfig
} from './SystemPromptBuilder';

// Conversation Formatting
export {
  formatConversationMessages,
  hasFormFlow,
  type FormattedMessage
} from './ConversationFormatter';

// Streaming Response Handling
export {
  processStreamingResponse,
  makeStreamingAPICall,
  type StreamingCallbacks
} from './StreamingHandler';

// Intent Classification
export {
  classifyIntent,
  type IntentResult
} from './IntentClassifier';

// Message Generation
export {
  generateUniqueId,
  resetMessageCounter
} from './MessageGenerator';

