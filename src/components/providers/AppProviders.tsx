"use client";

import React, { ReactNode, useState, useCallback, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChatProvider } from '../../contexts/ChatContext';
import { CalculatorProvider } from '../../contexts/CalculatorContext';

// Import message types from the unified location
import { Message, TextMessage, ComponentMessage } from '../../hooks/useConversationalForm';

// Unique ID generator to prevent duplicate keys
let messageCounter = 0;
const generateUniqueId = () => {
  messageCounter += 1;
  return `msg-${Date.now()}-${messageCounter}`;
};

// Session ID generator
const generateSessionId = () => {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// This component's purpose is to organize all context providers
// for our self-contained system with session persistence.
function AppProvidersContent({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string>('');
  const isInitialized = useRef(false);
  
  // Initialize session with persistence
  const [visibleMessages, setVisibleMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') return [];
    
    // Try to get session ID from URL
    const urlSessionId = new URLSearchParams(window.location.search).get('sessionId');
    
    if (urlSessionId) {
      // Load existing session from localStorage
      const savedMessages = localStorage.getItem(`chat-session-${urlSessionId}`);
      if (savedMessages) {
        try {
          return JSON.parse(savedMessages);
        } catch (error) {
          console.error('Failed to parse saved messages:', error);
        }
      }
    }
    
    return [];
  });

  // Initialize session ID
  useEffect(() => {
    if (!isInitialized.current) {
      const urlSessionId = searchParams.get('sessionId');
      if (urlSessionId) {
        setSessionId(urlSessionId);
      } else {
        // Create new session
        const newSessionId = generateSessionId();
        setSessionId(newSessionId);
        // Update URL without causing a reload
        const url = new URL(window.location.href);
        url.searchParams.set('sessionId', newSessionId);
        window.history.replaceState({}, '', url.toString());
      }
      isInitialized.current = true;
    }
  }, [searchParams]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (sessionId && visibleMessages.length > 0) {
      try {
        // Save all messages including serializable component messages
        // Filter out only legacy JSX components that can't be serialized
        const serializableMessages = visibleMessages.map(msg => {
          if (msg.type === 'component' && msg.component && !msg.componentType) {
            // Legacy JSX component - skip it
            return null;
          }
          if (msg.type === 'component' && msg.componentType) {
            // New serializable component - save without the JSX component prop
            return {
              id: msg.id,
              type: msg.type,
              componentType: msg.componentType,
              componentData: msg.componentData
            };
          }
          // Text message - save as-is
          return msg;
        }).filter(Boolean); // Remove null entries
        
        localStorage.setItem(`chat-session-${sessionId}`, JSON.stringify(serializableMessages));
      } catch (error) {
        console.error('Failed to save messages to localStorage:', error);
      }
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

    console.log('[AppProviders] 🔍 Rendering with sessionId:', sessionId, 'URL:', window.location.href);

  // Don't render until sessionId is ready
  if (!sessionId) {
    return null; // or a loading spinner
  }

  return (
    <CalculatorProvider logUserChoiceAsMessage={logUserChoiceAsMessage}>
      <ChatProvider 
        visibleMessages={visibleMessages} 
        setVisibleMessages={setVisibleMessages} 
        logUserChoiceAsMessage={logUserChoiceAsMessage}
        sessionId={sessionId}
      >
        {children}
      </ChatProvider>
    </CalculatorProvider>
  );
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        color: '#666',
        fontSize: '0.9rem'
      }}>
        Loading...
      </div>
    }>
      <AppProvidersContent>{children}</AppProvidersContent>
    </Suspense>
  );
} 