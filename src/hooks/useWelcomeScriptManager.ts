/**
 * useWelcomeScriptManager - Custom Hook for Welcome Script Management
 * 
 * Extracted from ChatContext to improve separation of concerns.
 * Handles welcome script selection and synchronization based on mode.
 */

import { useEffect } from 'react';
import { useWelcomeScript } from './useWelcomeScript';
import { useSpecialistWelcomeScript } from './useSpecialistWelcomeScript';
import { useProcessWelcomeScript } from './useProcessWelcomeScript';
import type { Message } from './useConversationalForm';

interface UseWelcomeScriptManagerProps {
  mode: 'calculate' | 'specialist' | 'process';
  visibleMessages: Message[];
  setVisibleMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  onCalculate: () => void;
  onInitialChoice: (choice: string) => void;
  onSpecialistChoice: (choice: 'live_chat' | 'sms' | 'phone_call' | 'appointment') => void;
  onProcessTopicClick?: (topic: string) => void;
}

export const useWelcomeScriptManager = ({
  mode,
  visibleMessages,
  setVisibleMessages,
  setIsTyping,
  onCalculate,
  onInitialChoice,
  onSpecialistChoice,
  onProcessTopicClick
}: UseWelcomeScriptManagerProps) => {
  
  // Initialize welcome scripts for all modes
  const regularWelcomeScript = useWelcomeScript({
    onCalculate,
    onChoice: onInitialChoice,
    initialMessages: visibleMessages
  });

  const specialistWelcomeScript = useSpecialistWelcomeScript({
    onChoice: onSpecialistChoice,
    initialMessages: visibleMessages
  });

  const processWelcomeScript = useProcessWelcomeScript({
    onTopicClick: onProcessTopicClick || (() => {}),
    initialMessages: visibleMessages
  });

  // Select the appropriate welcome script based on mode
  const activeWelcomeScript = mode === 'specialist' ? specialistWelcomeScript : 
                              mode === 'process' ? processWelcomeScript : regularWelcomeScript;

  // Sync welcome script state with context
  useEffect(() => {
    console.log('[useWelcomeScriptManager] Syncing visible messages for mode:', mode);
    setVisibleMessages(activeWelcomeScript.visibleMessages);
  }, [activeWelcomeScript.visibleMessages, setVisibleMessages, mode]);

  useEffect(() => {
    console.log('[useWelcomeScriptManager] Syncing typing state:', activeWelcomeScript.isTyping);
    setIsTyping(activeWelcomeScript.isTyping);
  }, [activeWelcomeScript.isTyping, setIsTyping]);

  return {
    isTyping: activeWelcomeScript.isTyping,
    visibleMessages: activeWelcomeScript.visibleMessages
  };
};

