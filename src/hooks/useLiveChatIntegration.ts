/**
 * useLiveChatIntegration - Custom Hook for Live Chat Integration
 * 
 * Extracted from ChatContext to improve separation of concerns.
 * Handles all live chat state, callbacks, and specialist assignment logic.
 */

import { useState, useRef, useMemo } from 'react';
import { useLiveChat } from './useLiveChat';
import type { LiveChatMessage, SpecialistProfile } from '../../services/chat';
import type { Message } from './useConversationalForm';

interface UseLiveChatIntegrationProps {
  sessionId: string;
  setVisibleMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const useLiveChatIntegration = ({
  sessionId,
  setVisibleMessages
}: UseLiveChatIntegrationProps) => {
  // State
  const [liveChatMode, setLiveChatMode] = useState(false);
  const [specialist, setSpecialist] = useState<SpecialistProfile | null>(null);
  
  // Track if we've already shown the specialist assigned message
  const shownSpecialistMessageRef = useRef<string | null>(null);
  // Track known message IDs to prevent duplicates
  const knownMessageIds = useRef<Set<string>>(new Set());

  // Memoize live chat callbacks to prevent re-renders
  const liveChatCallbacks = useMemo(() => ({
    onMessage: (message: LiveChatMessage) => {
      console.log('[useLiveChatIntegration] 📨 Live chat message received:', message);
      
      // Deduplicate messages
      if (knownMessageIds.current.has(message.id)) {
        console.log('[useLiveChatIntegration] ⏭️ Duplicate message detected, skipping:', message.id);
        return;
      }
      
      knownMessageIds.current.add(message.id);
      
      // Convert LiveChatMessage to chat bubble format
      setVisibleMessages(prev => [...prev, {
        id: message.id,
        type: 'text',
        text: message.content,
        sender: message.senderType === 'user' ? 'user' : 'bot',
        timestamp: message.timestamp
      }]);
    },
    onSpecialistAssigned: (assignedSpecialist: SpecialistProfile) => {
      console.log('[useLiveChatIntegration] 👤 Specialist assigned:', assignedSpecialist);
      
      // Prevent duplicate messages for the same specialist
      if (shownSpecialistMessageRef.current === assignedSpecialist.id) {
        console.log('[useLiveChatIntegration] ⏭️ Already shown message for this specialist, skipping');
        return;
      }
      
      setSpecialist(assignedSpecialist);
      shownSpecialistMessageRef.current = assignedSpecialist.id;
      
      // Add system message about specialist
      setVisibleMessages(prev => [...prev, {
        id: `specialist-assigned-${Date.now()}`,
        type: 'text',
        text: `✅ Connected to ${assignedSpecialist.name}. How can I help you today?`,
        sender: 'bot'
      }]);
    },
    onSessionEnd: () => {
      console.log('[useLiveChatIntegration] 🛑 Live chat session ended');
      setLiveChatMode(false);
      setSpecialist(null);
      shownSpecialistMessageRef.current = null;
      
      // Add system message about session end
      setVisibleMessages(prev => [...prev, {
        id: `session-ended-${Date.now()}`,
        type: 'text',
        text: 'Chat session ended. Thank you for contacting us!',
        sender: 'bot'
      }]);
    }
  }), [setVisibleMessages]); // Only depend on setVisibleMessages since we use functional updates

  // Initialize live chat with callbacks
  const liveChat = useLiveChat({
    sessionId,
    userId: sessionId, // Using sessionId as userId for now
    userInfo: {},
    ...liveChatCallbacks,
    customerId: sessionId // Pass sessionId as customerId
  });

  // Activate live chat mode
  const activateLiveChatMode = () => {
    console.log('[useLiveChatIntegration] 🚀 Activating live chat mode');
    setLiveChatMode(true);
  };

  // Send message to specialist
  const sendMessageToSpecialist = async (message: string) => {
    console.log('[useLiveChatIntegration] 📤 Sending message to specialist:', message);
    // Send to specialist via live chat service (no optimistic append)
    await liveChat.sendLiveMessage(message);
  };

  return {
    // State
    liveChatMode,
    specialist,
    
    // Actions
    activateLiveChatMode,
    sendMessageToSpecialist,
    
    // Live chat service methods
    initializeLiveChat: liveChat.initializeLiveChat,
    endLiveChat: liveChat.endLiveChat,
    
    // Status
    connectionStatus: liveChat.connectionStatus,
    isSpecialistTyping: liveChat.isSpecialistTyping
  };
};

