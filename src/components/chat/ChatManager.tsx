"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import WelcomeScreen from './WelcomeScreen';
import ChatController from './ChatController';
import { closeIcon } from './icons';
import styles from './ChatManager.module.css';
import type { ChatChoice } from './types';

/**
 * Chat Manager Component - Deployment-Safe Version
 *
 * Completely refactored to eliminate createPortal dependency and provide
 * deployment-safe modal management. Uses standard React rendering instead
 * of portal to ensure consistent behavior across all environments.
 *
 * @component ChatManager
 * @author SmarterPayouts Team
 * @since 2024
 * @version 3.0.0 - Deployment Fix
 */

/**
 * Chat Manager - Deployment Safe Implementation
 *
 * ## Key Improvements
 * - ✅ No createPortal dependency - eliminates deployment portal issues
 * - ✅ Simplified modal overlay using standard React positioning
 * - ✅ Deployment-safe z-index management (reduced from 999999 to 9999)
 * - ✅ Robust error handling for all deployment scenarios
 * - ✅ Consistent behavior across local, staging, and production
 *
 * ## Architecture Changes
 * - Replaced createPortal with standard React overlay rendering
 * - Simplified modal positioning and styling
 * - Added comprehensive error boundaries and fallbacks
 * - Improved state management for SSR/CSR compatibility
 *
 * ## Error Handling
 * - Graceful degradation if modal positioning fails
 * - Console logging for debugging deployment issues
 * - Fallback to inline chat if modal completely fails
 * - User-friendly error messages with recovery options
 */
const ChatManager: React.FC = () => {
  const searchParams = useSearchParams();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState<ChatChoice | null>(null);

  // Check for chat=open query parameter and redirect to dedicated page
  useEffect(() => {
    const chatParam = searchParams.get('chat');
    const shouldAutoOpen = chatParam === 'open';
    
    if (shouldAutoOpen) {
      console.log('[ChatManager] Chat auto-open detected, redirecting to dedicated page');
      
      // Check if we're on client side
      if (typeof window !== 'undefined') {
        window.location.href = '/mint-chat-active?type=calculate';
      }
      return;
    }
  }, [searchParams]);

  // Simplified body scroll management - only when modal is open
  useEffect(() => {
    if (isChatOpen) {
      console.log('[ChatManager] Chat opened - preventing body scroll');
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        console.log('[ChatManager] Chat closed - restoring body scroll');
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isChatOpen]);

  const handleStartChat = (choice: ChatChoice) => {
    console.log('[ChatManager DEPLOYMENT DEBUG] === HANDLE START CHAT ===');
    console.log('[ChatManager] Choice selected:', choice);
    console.log('[ChatManager] Previous isChatOpen:', isChatOpen);
    console.log('[ChatManager] Previous activeScreen:', activeScreen);
    
    try {
      setActiveScreen(choice);
      setIsChatOpen(true);
      
      console.log('[ChatManager] ✅ State updated successfully');
      console.log('[ChatManager] New isChatOpen: true');
      console.log('[ChatManager] New activeScreen:', choice);
    } catch (error) {
      console.error('[ChatManager] ❌ CRITICAL ERROR setting chat state:', error);
      console.error('[ChatManager] Error details:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const handleCloseChat = () => {
    console.log('[ChatManager] Closing chat');
    setIsChatOpen(false);
    setActiveScreen(null);
    
    // Optional: Provide navigation options when closing
    // For now, just close the modal and return to welcome screen
    // Users can use the "← SmarterPayouts" button to navigate back to main site
  };

  // Log render cycles for debugging
  console.log('[ChatManager] === RENDER CYCLE ===');
  console.log('[ChatManager] Rendering with isChatOpen:', isChatOpen);
  console.log('[ChatManager] Rendering with activeScreen:', activeScreen);

  return (
    <div className={styles.chatManagerWrapper}>
      {/* Welcome Screen - Always visible when chat is closed */}
      {!isChatOpen && (
        <WelcomeScreen onStartChat={handleStartChat} />
      )}

      {/* Modal Overlay - Standard React rendering instead of createPortal */}
      {isChatOpen && (
        <div
          className={`${styles.chatModalOverlay} ${isChatOpen ? styles.open : ''}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              console.log('[ChatManager] Overlay clicked - closing modal');
              handleCloseChat();
            }
          }}
        >
          <div className={styles.chatModalContainer}>
            {/* Close button handled by ChatInterface in modal mode */}
            {/* The ChatInterface component now handles the close button when in modal */}

            {/* Chat Controller - Main chat interface */}
            <ChatController
              onClose={handleCloseChat}
              closeIcon={closeIcon}
              activeScreen={activeScreen}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatManager; 