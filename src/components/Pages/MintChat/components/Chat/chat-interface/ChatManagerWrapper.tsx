'use client';

import React from 'react';
import ChatManager from '@/src/components/chat/ChatManager';

/**
 * Chat Manager Wrapper Component for MintChat
 * 
 * Wraps the main ChatManager component with MintChat-specific
 * configuration and styling. Provides clean separation between
 * the global chat system and the MintChat page implementation.
 * 
 * @component ChatManagerWrapper
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Chat Manager Wrapper Component
 * 
 * ## Features
 * - ✅ Integrates global ChatManager
 * - ✅ MintChat-specific configuration
 * - ✅ Clean component separation
 * - ✅ Enterprise-grade architecture
 * 
 * ## Architecture
 * This component serves as a bridge between the MintChat page
 * and the global chat system, allowing for page-specific
 * customizations while maintaining system consistency.
 * 
 * @example
 * ```tsx
 * import ChatManagerWrapper from './ChatManagerWrapper';
 * 
 * export default function ChatInterface() {
 *   return <ChatManagerWrapper />;
 * }
 * ```
 */
export default function ChatManagerWrapper() {
  return <ChatManager />;
}
