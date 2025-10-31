/**
 * useLiveChat Hook - Manages Live Chat with Specialists
 * 
 * This hook orchestrates the live chat functionality by:
 * - Initializing Firebase/Twilio connections
 * - Managing real-time message synchronization
 * - Handling specialist assignment and status
 * - Providing a clean interface for the chat UI
 * 
 * @example
 * const { 
 *   isLiveChatActive, 
 *   specialist, 
 *   sendLiveMessage, 
 *   endLiveChat 
 * } = useLiveChat(sessionId);
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { LiveChatService, SpecialistService } from '../../services/chat';
import type { LiveChatMessage, SpecialistProfile } from '../../services/chat';

interface UseLiveChatOptions {
  sessionId: string;
  userId: string;
  userInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  onMessage?: (message: LiveChatMessage) => void;
  onSpecialistAssigned?: (specialist: SpecialistProfile) => void;
  onSessionEnd?: () => void;
  customerId?: string;
}

interface UseLiveChatReturn {
  // State
  isLiveChatActive: boolean;
  isConnecting: boolean;
  specialist: SpecialistProfile | null;
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error';
  error: string | null;
  
  // Actions
  initializeLiveChat: () => Promise<string>;
  sendLiveMessage: (content: string) => Promise<void>;
  endLiveChat: () => Promise<void>;
  
  // Specialist info
  isSpecialistTyping: boolean;
}

export const useLiveChat = (options: UseLiveChatOptions): UseLiveChatReturn => {
  const {
    sessionId,
    userId,
    userInfo,
    onMessage,
    onSpecialistAssigned,
    onSessionEnd,
    customerId
  } = options;

  // State
  const [isLiveChatActive, setIsLiveChatActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [specialist, setSpecialist] = useState<SpecialistProfile | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [error, setError] = useState<string | null>(null);
  const [isSpecialistTyping, setIsSpecialistTyping] = useState(false);

  // Services
  const liveChatService = useRef<LiveChatService | null>(null);
  const specialistService = useRef<SpecialistService | null>(null);
  
  // Cleanup refs
  const messageUnsubscribe = useRef<(() => void) | null>(null);
  const sessionUnsubscribe = useRef<(() => void) | null>(null);
  // Track the actual live chat session id created on initialization
  const liveSessionIdRef = useRef<string | null>(null);
  // Track which specialist we've already notified about to prevent duplicates
  const notifiedSpecialistId = useRef<string | null>(null);

  /**
   * Initialize live chat session
   */
  const initializeLiveChat = useCallback(async () => {
    try {
      setIsConnecting(true);
      setConnectionStatus('connecting');
      setError(null);
      notifiedSpecialistId.current = null; // Reset notification tracking

      // Initialize services if not already done
      if (!liveChatService.current) {
        liveChatService.current = new LiveChatService();
      }
      if (!specialistService.current) {
        specialistService.current = new SpecialistService();
      }

      // Create live chat session
      const createdSessionId = await liveChatService.current.createLiveChatSession(
        {
          ...userInfo,
          initialIntent: 'live_chat_request'
        },
        {
          botTranscript: [], // Will be populated from existing chat context
          priority: 'medium'
        },
        customerId ?? userId // Pass customerId, fallback to userId
      );

      // Persist created session id for subsequent actions
      liveSessionIdRef.current = createdSessionId;

      // Set up real-time message listener
      messageUnsubscribe.current = liveChatService.current.onMessage(
        createdSessionId,
        (message) => {
          // Handle typing indicators
          if (message.senderType === 'specialist') {
            setIsSpecialistTyping(false);
          }
          
          // Call the onMessage callback
          if (onMessage) {
            onMessage(message);
          }
        }
      );

      // Set up session status listener
      sessionUnsubscribe.current = liveChatService.current.onSessionUpdate(
        createdSessionId,
        async (updatedSession) => {
          // Check if specialist was assigned (prevent duplicate notifications)
          if (updatedSession.specialistId && updatedSession.specialistId !== notifiedSpecialistId.current) {
            const assignedSpecialist = await specialistService.current!.getSpecialist(
              updatedSession.specialistId
            );
            
            if (assignedSpecialist) {
              setSpecialist(assignedSpecialist);
              notifiedSpecialistId.current = updatedSession.specialistId;
              
              if (onSpecialistAssigned) {
                onSpecialistAssigned(assignedSpecialist);
              }
            }
          }

          // Check if session ended
          if (updatedSession.status === 'completed') {
            setIsLiveChatActive(false);
            
            if (onSessionEnd) {
              onSessionEnd();
            }
          }
        }
      );

      // DO NOT auto-assign specialist - wait for manual acceptance from dashboard
      // The specialist will be assigned when they accept the chat from the IncomingChatAlert
      
      // Mark as active (session is active, waiting for specialist)
      setIsLiveChatActive(true);
      setConnectionStatus('connected');
      setIsConnecting(false);
      
      // Return the sessionId so it can be used by the queue component
      return createdSessionId;

    } catch (err) {
      console.error('[useLiveChat] ❌ Failed to initialize live chat:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize live chat');
      setConnectionStatus('error');
      setIsConnecting(false);
      throw err; // Re-throw so caller can handle
    }
  }, [sessionId, userId, userInfo, onMessage, onSpecialistAssigned, onSessionEnd, specialist, customerId]);

  /**
   * Send a message to the specialist
   */
  const sendLiveMessage = useCallback(async (content: string) => {
    if (!liveChatService.current || !isLiveChatActive) {
      console.warn('[useLiveChat] ⚠️ Cannot send message: Live chat not active');
      return;
    }

    try {
      const sid = liveSessionIdRef.current ?? sessionId;
      await liveChatService.current.sendMessage(sid, content, userId, 'user');
    } catch (err) {
      console.error('[useLiveChat] ❌ Failed to send message:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
  }, [sessionId, userId, isLiveChatActive]);

  /**
   * End the live chat session
   */
  const endLiveChat = useCallback(async () => {
    if (!liveChatService.current || !isLiveChatActive) {
      return;
    }

    try {
      const sid = liveSessionIdRef.current ?? sessionId;
      await liveChatService.current.endLiveChatSession(sid, 'user_ended');
      
      setIsLiveChatActive(false);
      setSpecialist(null);
      setConnectionStatus('disconnected');
      notifiedSpecialistId.current = null;
      
      if (onSessionEnd) {
        onSessionEnd();
      }
    } catch (err) {
      console.error('[useLiveChat] ❌ Failed to end live chat:', err);
      setError(err instanceof Error ? err.message : 'Failed to end live chat');
    }
  }, [sessionId, isLiveChatActive, onSessionEnd]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      // Unsubscribe from listeners
      if (messageUnsubscribe.current) {
        messageUnsubscribe.current();
      }
      if (sessionUnsubscribe.current) {
        sessionUnsubscribe.current();
      }
      // Reset created session id reference
      liveSessionIdRef.current = null;
    };
  }, []);

  return {
    // State
    isLiveChatActive,
    isConnecting,
    specialist,
    connectionStatus,
    error,
    
    // Actions
    initializeLiveChat,
    sendLiveMessage,
    endLiveChat,
    
    // Specialist info
    isSpecialistTyping
  };
};

