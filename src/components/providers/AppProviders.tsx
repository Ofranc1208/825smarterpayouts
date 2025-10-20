"use client";

import React, { ReactNode, useState, useCallback, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChatProvider } from '../../contexts/ChatContext';
import { CalculatorProvider } from '../../contexts/CalculatorContext';

// Import message types from the unified location
import { Message, TextMessage } from '../../hooks/useConversationalForm';

// Import orchestra pattern managers and components
import { sessionManager } from './managers/SessionManager';
import { messagePersistenceManager } from './managers/MessagePersistenceManager';
import LoadingScreen from './components/LoadingScreen';
import styles from './AppProviders.module.css';

// Unique ID generator to prevent duplicate keys
let messageCounter = 0;
const generateUniqueId = () => {
  messageCounter += 1;
  return `msg-${Date.now()}-${messageCounter}`;
};

// This component's purpose is to organize all context providers
// for our self-contained system with session persistence.
function AppProvidersContent({ children, mode }: { children: ReactNode; mode?: 'calculate' | 'specialist' }) {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string>('');
  const isInitialized = useRef(false);
  
  // Initialize session with persistence using MessagePersistenceManager
  const [visibleMessages, setVisibleMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') return [];
    
    // Try to get session ID from URL and load messages
    const urlSessionId = sessionManager.getSessionIdFromUrl();
    if (urlSessionId) {
      return messagePersistenceManager.loadMessages(urlSessionId);
    }
    
    return [];
  });

  // Initialize session ID using SessionManager
  useEffect(() => {
    if (!isInitialized.current) {
      const initializedSessionId = sessionManager.initializeSessionId();
      setSessionId(initializedSessionId);
      isInitialized.current = true;
    }
  }, [searchParams]);

  // Save messages to localStorage whenever they change using MessagePersistenceManager
  useEffect(() => {
    if (sessionId && visibleMessages.length > 0) {
      messagePersistenceManager.saveMessages(sessionId, visibleMessages);
    }
  }, [visibleMessages, sessionId]);

  // Function to log user choices as messages in chat
  const logUserChoiceAsMessage = useCallback((text: string) => {
    const userChoiceMessage: TextMessage = {
      id: generateUniqueId(),
      type: 'text',
      text: text,
      sender: 'user',
    };
    setVisibleMessages(prev => [...prev, userChoiceMessage]);
  }, [setVisibleMessages]);

  // Provide session ID to child components
  const contextValue = {
    sessionId,
    visibleMessages,
    setVisibleMessages,
    logUserChoiceAsMessage
  };

  // Safe logging that works in both SSR and client
  if (typeof window !== 'undefined') {
    console.log('[AppProviders] 🔍 Rendering with sessionId:', sessionId, 'URL:', window.location.href);
  }

  // Don't render until sessionId is ready - show LoadingScreen component
  if (!sessionId) {
    return <LoadingScreen message="Connecting..." />;
  }

  return (
    <CalculatorProvider logUserChoiceAsMessage={logUserChoiceAsMessage}>
      <ChatProvider 
        visibleMessages={visibleMessages} 
        setVisibleMessages={setVisibleMessages} 
        logUserChoiceAsMessage={logUserChoiceAsMessage}
        sessionId={sessionId}
        mode={mode}
      >
        {children}
      </ChatProvider>
    </CalculatorProvider>
  );
}

export function AppProviders({ children, mode }: { children: ReactNode; mode?: 'calculate' | 'specialist' }) {
  return (
    <Suspense fallback={
      <div className={styles.suspenseFallback}>
        Loading...
      </div>
    }>
      <AppProvidersContent mode={mode}>{children}</AppProvidersContent>
    </Suspense>
  );
} 