'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ChatController from '@/src/components/chat/ChatController';
import { closeIcon } from '@/src/components/chat/icons';
import { AppProviders } from '@/src/components/providers/AppProviders';
import type { ChatChoice } from '@/src/components/chat/types';
import styles from './MintChatActivePage.module.css';

/**
 * Chat Content Component (wrapped in Suspense)
 * Handles search params and chat logic
 */
const ChatContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get chat type and source from URL parameters
  const chatType = searchParams.get('type') as ChatChoice || 'calculate';
  const source = searchParams.get('source') || 'direct';
  
  // Log source for analytics (only once)
  useEffect(() => {
    if (source && source !== 'direct') {
      console.log(`[MintChatActivePage] Chat started from source: ${source}`);
    }
  }, [source]);
  
  // Handle chat close - ALWAYS return to mint-intelligent-chat welcome page
  const handleCloseChat = () => {
    console.log('[MintChatActivePage] Closing chat, returning to welcome page');
    // Use replace instead of push to avoid adding to history
    router.replace('/mint-intelligent-chat');
  };

  // Handle browser back button - ALWAYS go to mint-intelligent-chat
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      console.log('[MintChatActivePage] Back button pressed, redirecting to welcome page');
      router.replace('/mint-intelligent-chat');
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  // Render immediately - no loading state needed
  return (
    <AppProviders>
      <div className={styles.activeChatContainer}>
        <div className={styles.chatWrapper}>
          <ChatController
            onClose={handleCloseChat}
            closeIcon={closeIcon}
            activeScreen={chatType}
          />
        </div>
      </div>
    </AppProviders>
  );
};

/**
 * Mint Chat Active Page Component
 * 
 * Dedicated full-page chat experience without navigation distractions.
 * Provides an immersive chat environment with proper mobile optimization.
 * 
 * Features:
 * - Full-page chat interface
 * - No navigation bar (clean, focused experience)
 * - Mobile-optimized layout
 * - Safe area support for modern devices
 * - Proper return navigation to main chat page
 * 
 * @component MintChatActivePage
 * @author SmarterPayouts Team
 * @since 2024
 */
const MintChatActivePage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className={styles.activeChatContainer}>
        <div className={styles.chatWrapper}>
          {/* Professional loading screen matching SmarterPayouts design */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
            gap: '1.5rem'
          }}>
            {/* Animated spinner */}
            <div style={{
              width: '48px',
              height: '48px',
              border: '4px solid #e5e7eb',
              borderTop: '4px solid #22c55e',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <div style={{
              fontSize: '1.125rem',
              fontWeight: '500',
              color: '#374151',
              textAlign: 'center'
            }}>
              Connecting you with a specialist...
            </div>
            {/* Add keyframe animation */}
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
};

export default MintChatActivePage;
