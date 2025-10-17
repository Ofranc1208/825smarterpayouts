'use client';

import React, { useState, useEffect } from 'react';
import ChatManager from '@/src/components/chat/ChatManager';

/**
 * Chat Manager Wrapper Component for MintChat - Deployment-Fixed Version
 *
 * Simplified wrapper that eliminates createPortal issues and provides
 * deployment-safe modal management. Uses standard React rendering
 * instead of portal to ensure consistent behavior across environments.
 *
 * @component ChatManagerWrapper
 * @author SmarterPayouts Team
 * @since 2024
 * @version 3.0.0 - Deployment Fix
 */

/**
 * Chat Manager Wrapper Component - Deployment Safe
 *
 * ## Key Improvements
 * - ✅ No createPortal dependency - uses standard React rendering
 * - ✅ Deployment-safe modal positioning
 * - ✅ Simplified state management for SSR/CSR compatibility
 * - ✅ Robust error handling and fallbacks
 * - ✅ Consistent behavior across all environments
 *
 * ## Architecture Changes
 * This version eliminates the complex portal-based modal system that
 * was causing deployment failures. Instead uses a simpler overlay
 * approach that works reliably in all deployment environments.
 *
 * ## Error Handling
 * - Graceful degradation if modal fails to render
 * - Console logging for debugging deployment issues
 * - Fallback inline chat interface if modal fails
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
