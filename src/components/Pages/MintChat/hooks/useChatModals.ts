'use client';

import { useState, useCallback } from 'react';
import { ChatMessage } from './useChatStorage';

/**
 * Self-contained chat modals hook for Mint Chat
 * 
 * Manages all modal and overlay states in the chat widget including:
 * - Live rep prompt management
 * - Connection menu state
 * - Camera and attachment menu states
 * - Hand-off request handling
 * 
 * @component MintChat
 * @author SmarterPayouts Team
 * @since 2024
 */

/**
 * Custom hook for managing all modal and overlay states in the chat widget
 * 
 * @param logHandOffRequest - Function to log hand-off requests
 * @param messages - Current chat messages
 * @param setMessages - Function to update messages
 * @param setError - Function to set error state
 * @returns Object containing all modal states and handlers
 */
export const useChatModals = (
  logHandOffRequest: (data: { chatId: string; transcript: ChatMessage[] }) => Promise<void>,
  messages: ChatMessage[],
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  setError: (error: string | null) => void
) => {
  // Live rep prompt state
  const [showLiveRepPrompt, setShowLiveRepPrompt] = useState(false);
  const [isHandOffLoading, setIsHandOffLoading] = useState(false);

  // Connection menu state
  const [showConnectionMenu, setShowConnectionMenu] = useState(false);

  // Camera and attachment states
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);

  // Live rep prompt handlers
  const handleLiveRepConfirm = useCallback(async () => {
    setShowLiveRepPrompt(false);
    setIsHandOffLoading(true);
    
    try {
      await logHandOffRequest({ chatId: 'static-chat-id', transcript: messages });
      
      // Add confirmation message to chat
      const confirmationMessage: ChatMessage = {
        id: Date.now().toString(),
        content: "Thank you! A specialist has been notified and will be in touch shortly.",
        sender: 'system',
        timestamp: new Date(),
        type: 'system',
      };
      setMessages(prev => [...prev, confirmationMessage]);
    } catch (error) {
      console.error('Failed to log hand-off request:', error);
      setError('Failed to connect with specialist. Please try again.');
    } finally {
      setIsHandOffLoading(false);
    }
  }, [logHandOffRequest, messages, setMessages, setError]);

  const handleLiveRepDecline = useCallback(() => {
    setShowLiveRepPrompt(false);
  }, []);

  // Camera handlers
  const handleCameraOpen = useCallback(() => {
    setIsCameraOpen(true);
  }, []);

  const handleCameraClose = useCallback(() => {
    setIsCameraOpen(false);
  }, []);

  // Attachment menu handlers
  const openAttachmentMenu = useCallback(() => {
    setIsAttachmentMenuOpen(true);
  }, []);

  const closeAttachmentMenu = useCallback(() => {
    setIsAttachmentMenuOpen(false);
  }, []);

  const handleTakePhoto = useCallback(() => {
    closeAttachmentMenu();
    handleCameraOpen();
  }, [closeAttachmentMenu, handleCameraOpen]);

  const handleChooseFromLibrary = useCallback((triggerFileInput: () => void) => {
    closeAttachmentMenu();
    triggerFileInput();
  }, [closeAttachmentMenu]);

  // Connection menu handlers
  const openConnectionMenu = useCallback(() => {
    setShowConnectionMenu(true);
  }, []);

  const closeConnectionMenu = useCallback(() => {
    setShowConnectionMenu(false);
  }, []);

  return {
    // States
    showLiveRepPrompt,
    isHandOffLoading,
    showConnectionMenu,
    isCameraOpen,
    isAttachmentMenuOpen,

    // Setters
    setShowLiveRepPrompt,
    setShowConnectionMenu,

    // Handlers
    handleLiveRepConfirm,
    handleLiveRepDecline,
    handleCameraOpen,
    handleCameraClose,
    openAttachmentMenu,
    closeAttachmentMenu,
    handleTakePhoto,
    handleChooseFromLibrary,
    openConnectionMenu,
    closeConnectionMenu,
  };
};
