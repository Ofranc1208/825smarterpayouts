/**
 * Chat Module - MintChat Enterprise Edition
 * 
 * Complete ultra-modular chat section implementation for MintChat.
 * Provides enterprise-grade architecture with clean separation of concerns
 * and optimal performance characteristics.
 * 
 * ## Module Structure
 * ```
 * Chat/
 * ├── chat-interface/       ← Chat manager and container components
 * │   ├── ChatManagerWrapper.tsx
 * │   ├── ChatContainer.tsx
 * │   └── index.tsx
 * ├── chat-controls/        ← Future chat controls (placeholder)
 * │   ├── ChatControlsPlaceholder.tsx
 * │   └── index.tsx
 * ├── chat-section/         ← Main section orchestrator
 * │   ├── ChatBackground.tsx
 * │   ├── MintChatSection.tsx
 * │   └── index.tsx
 * └── index.tsx            ← This export file
 * ```
 * 
 * ## Usage
 * ```tsx
 * // Default import (recommended)
 * import MintChatSection from '@/components/Pages/MintChat/components/Chat';
 * 
 * // Named import (alternative)
 * import { MintChatSection } from '@/components/Pages/MintChat/components/Chat';
 * 
 * // Granular imports for customization
 * import { ChatContainer, ChatManagerWrapper } from '@/components/Pages/MintChat/components/Chat';
 * ```
 * 
 * @module Chat
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// Main chat section component export
export { default } from './chat-section';
export { default as MintChatSection } from './chat-section';

// Sub-module exports for granular access
export { default as ChatContainer } from './chat-interface';
export { default as ChatControls } from './chat-controls';

// Individual component exports (for advanced customization)
export { ChatManagerWrapper } from './chat-interface';
export { ChatControlsPlaceholder } from './chat-controls';
export { ChatBackground } from './chat-section';
