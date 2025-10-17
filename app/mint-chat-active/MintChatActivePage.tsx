'use client';

import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ChatController from '@/src/components/chat/ChatController';
import { closeIcon } from '@/src/components/chat/icons';
import { AppProviders } from '@/src/components/providers/AppProviders';
import type { ChatChoice } from '@/src/components/chat/types';
import styles from './MintChatActivePage.module.css';

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isClient, setIsClient] = React.useState(false);
  
  // Get chat type and source from URL parameters
  const chatType = searchParams.get('type') as ChatChoice || 'calculate';
  const source = searchParams.get('source') || 'direct';
  
  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
    
    // Log source for analytics
    if (source && source !== 'direct') {
      console.log(`[MintChatActivePage] Chat started from source: ${source}`);
    }
  }, [source]);
  
  // Handle chat close - return to main chat page
  const handleCloseChat = () => {
    console.log('[MintChatActivePage] Closing chat, returning to main page');
    router.push('/mint-intelligent-chat');
  };

  // Handle browser back button
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const handlePopState = () => {
      // If user hits back button, redirect to main chat page
      router.replace('/mint-intelligent-chat');
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  // Show loading state during SSR
  if (!isClient) {
    return (
      <div className={styles.activeChatContainer}>
        <div className={styles.chatWrapper}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontSize: '1.125rem',
            color: '#6b7280'
          }}>
            🤖 Loading Mint AI Assistant...
          </div>
        </div>
      </div>
    );
  }

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

export default MintChatActivePage;
