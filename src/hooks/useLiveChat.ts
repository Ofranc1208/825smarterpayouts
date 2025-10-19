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
}

interface UseLiveChatReturn {
  // State
  isLiveChatActive: boolean;
  isConnecting: boolean;
  specialist: SpecialistProfile | null;
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error';
  error: string | null;
  
  // Actions
  initializeLiveChat: () => Promise<void>;
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
    onSessionEnd
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

  /**
   * Initialize live chat session
   */
  const initializeLiveChat = useCallback(async () => {
    try {
      setIsConnecting(true);
      setConnectionStatus('connecting');
      setError(null);

      console.log('[useLiveChat] 🚀 Initializing live chat...', { sessionId, userId });

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
        }
      );

      console.log('[useLiveChat] ✅ Live chat session created:', createdSessionId);

      // Set up real-time message listener
      messageUnsubscribe.current = liveChatService.current.onMessage(
        createdSessionId,
        (messages) => {
          console.log('[useLiveChat] 📨 New messages received:', messages);
          
          // Process each message
          messages.forEach(message => {
            // Handle typing indicators
            if (message.senderType === 'specialist') {
              setIsSpecialistTyping(false);
            }
            
            // Call the onMessage callback
            if (onMessage) {
              onMessage(message);
            }
          });
        }
      );

      // Set up session status listener
      sessionUnsubscribe.current = liveChatService.current.onSessionUpdate(
        createdSessionId,
        async (updatedSession) => {
          console.log('[useLiveChat] 🔄 Session updated:', updatedSession);

          // Check if specialist was assigned
          if (updatedSession.specialistId && !specialist) {
            const assignedSpecialist = await specialistService.current!.getSpecialist(
              updatedSession.specialistId
            );
            
            if (assignedSpecialist) {
              setSpecialist(assignedSpecialist);
              console.log('[useLiveChat] 👤 Specialist assigned:', assignedSpecialist);
              
              if (onSpecialistAssigned) {
                onSpecialistAssigned(assignedSpecialist);
              }
            }
          }

          // Check if session ended
          if (updatedSession.status === 'completed') {
            console.log('[useLiveChat] ✅ Session completed');
            setIsLiveChatActive(false);
            
            if (onSessionEnd) {
              onSessionEnd();
            }
          }
        }
      );

      // Assign a specialist
      console.log('[useLiveChat] 🔍 Finding available specialist...');
      const assignedSpecialistId = await liveChatService.current.assignSpecialist(createdSessionId);
      
      if (assignedSpecialistId) {
        const assignedSpecialist = await specialistService.current.getSpecialist(assignedSpecialistId);
        setSpecialist(assignedSpecialist);
        
        if (onSpecialistAssigned && assignedSpecialist) {
          onSpecialistAssigned(assignedSpecialist);
        }
      }

      // Mark as active
      setIsLiveChatActive(true);
      setConnectionStatus('connected');
      setIsConnecting(false);

      console.log('[useLiveChat] ✅ Live chat initialized successfully');

    } catch (err) {
      console.error('[useLiveChat] ❌ Failed to initialize live chat:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize live chat');
      setConnectionStatus('error');
      setIsConnecting(false);
    }
  }, [sessionId, userId, userInfo, onMessage, onSpecialistAssigned, onSessionEnd, specialist]);

  /**
   * Send a message to the specialist
   */
  const sendLiveMessage = useCallback(async (content: string) => {
    if (!liveChatService.current || !isLiveChatActive) {
      console.warn('[useLiveChat] ⚠️ Cannot send message: Live chat not active');
      return;
    }

    try {
      console.log('[useLiveChat] 📤 Sending message:', content);
      
      await liveChatService.current.sendMessage(sessionId, content, userId, 'user');

      console.log('[useLiveChat] ✅ Message sent successfully');
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
      console.log('[useLiveChat] 🛑 Ending live chat session...');
      
      await liveChatService.current.endLiveChatSession(sessionId, 'user_ended');
      
      setIsLiveChatActive(false);
      setSpecialist(null);
      setConnectionStatus('disconnected');
      
      console.log('[useLiveChat] ✅ Live chat ended successfully');
      
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
      console.log('[useLiveChat] 🧹 Cleaning up live chat...');
      
      // Unsubscribe from listeners
      if (messageUnsubscribe.current) {
        messageUnsubscribe.current();
      }
      if (sessionUnsubscribe.current) {
        sessionUnsubscribe.current();
      }
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

