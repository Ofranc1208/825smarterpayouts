/**
 * Mint AI Chat Tracking Utilities
 * Helper hooks for tracking AI assistant interactions
 * 
 * @module MintAITracking
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

import { useEffect, useCallback, useRef } from 'react';
import {
  trackMintChatStart,
  trackMintChatMessage,
  trackMintChatEnd,
} from '@/src/lib/analytics/gtag';

/**
 * Hook to track Mint AI chat sessions
 */
export function useMintChatTracking() {
  const sessionStartTime = useRef<number>(Date.now());
  const messageCount = useRef<number>(0);
  const hasTrackedStart = useRef<boolean>(false);

  // Track chat start on mount
  useEffect(() => {
    if (!hasTrackedStart.current) {
      trackMintChatStart();
      hasTrackedStart.current = true;
      sessionStartTime.current = Date.now();
    }

    // Track chat end on unmount
    return () => {
      const duration = Math.round((Date.now() - sessionStartTime.current) / 1000);
      trackMintChatEnd(duration);
    };
  }, []);

  // Track message sent
  const trackMessage = useCallback(() => {
    messageCount.current += 1;
    trackMintChatMessage(messageCount.current);
  }, []);

  return {
    trackMessage,
    messageCount: messageCount.current,
  };
}

/**
 * Example usage in Mint AI component:
 * 
 * ```tsx
 * 'use client';
 * import { useMintChatTracking } from '@/src/components/Analytics/MintAITracking';
 * 
 * export default function MintChatInterface() {
 *   const { trackMessage } = useMintChatTracking();
 *   
 *   const handleSendMessage = async (message: string) => {
 *     // Send message to AI
 *     await sendToAI(message);
 *     
 *     // Track the interaction
 *     trackMessage();
 *   };
 *   
 *   return <div>...</div>;
 * }
 * ```
 */

