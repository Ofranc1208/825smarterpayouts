"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useGuaranteedAssistant } from '../../../contexts/GuaranteedAssistantContext';
import ChatBubble from '../../chat/ChatBubble';
import ChatbotTyping from '../../chatbot/ChatbotTyping';
import { GuaranteedAssistantInputBar } from './GuaranteedAssistantInputBar';
import styles from './GuaranteedAssistantPanel.module.css';

const GuaranteedAssistantPanel: React.FC = () => {
  const { 
    isOpen, 
    closeAssistant, 
    messages, 
    isTyping,
    currentStep,
    showWelcomeMessage,
    getStepGuidance
  } = useGuaranteedAssistant();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasShownInitialAnimation, setHasShownInitialAnimation] = useState(false);
  const [showInitialTyping, setShowInitialTyping] = useState(false);
  const [hasShownWelcomeForStep, setHasShownWelcomeForStep] = useState<string | null>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      console.log('[GuaranteedAssistantPanel] Auto-scrolling to bottom, messages:', messages.length, 'isTyping:', isTyping);
      
      // Small delay to ensure DOM updates are complete
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [messages, isTyping]);

  // Show loading state briefly when panel opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    } else {
      // Reset welcome tracking when panel closes
      setHasShownWelcomeForStep(null);
      setHasShownInitialAnimation(false);
    }
  }, [isOpen]);

  // Handle initial welcome message when panel opens or step changes
  useEffect(() => {
    if (isOpen && !hasShownInitialAnimation && messages.length === 0) {
      setHasShownInitialAnimation(true);
      console.log('[GuaranteedAssistantPanel] 👋 Showing welcome message for step:', currentStep || 'general');
      
      // Show initial typing indicator
      setShowInitialTyping(true);
      
      // Show contextual welcome message after typing animation
      const timer = setTimeout(() => {
        setShowInitialTyping(false);
        if (currentStep) {
          showWelcomeMessage();
        } else {
          // Fallback message if currentStep is not available yet
          console.log('[GuaranteedAssistantPanel] ⚠️ No currentStep available, showing general welcome');
          // We could add a general welcome message here or wait for currentStep to be set
        }
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length, hasShownInitialAnimation, currentStep, showWelcomeMessage]);

  // Show welcome message when currentStep becomes available (delayed initial load)
  useEffect(() => {
    if (isOpen && hasShownInitialAnimation && currentStep && messages.length === 0 && hasShownWelcomeForStep !== currentStep) {
      console.log('[GuaranteedAssistantPanel] 🎯 CurrentStep now available, showing welcome for:', currentStep);
      
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        showWelcomeMessage();
        setHasShownWelcomeForStep(currentStep);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, isOpen, hasShownInitialAnimation, messages.length, showWelcomeMessage, hasShownWelcomeForStep]);

  // Show contextual guidance when step changes (for existing conversations)
  useEffect(() => {
    if (isOpen && hasShownInitialAnimation && currentStep && messages.length > 0 && hasShownWelcomeForStep !== currentStep) {
      console.log('[GuaranteedAssistantPanel] 🔄 Step changed to:', currentStep);
      
      // Small delay to avoid overwhelming the user
      const timer = setTimeout(() => {
        showWelcomeMessage();
        setHasShownWelcomeForStep(currentStep);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, isOpen, hasShownInitialAnimation, messages.length, showWelcomeMessage, hasShownWelcomeForStep]);

  // Prevent body scroll when guaranteed assistant panel is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Prevent body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
      
      return () => {
        // Restore body scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={styles.assistantBackdrop}
        onClick={closeAssistant}
        aria-label="Close assistant panel"
      />
      
      {/* Panel */}
      <div className={styles.assistantPanel}>
      <div className={styles.assistantHeader}>
        <div className={styles.assistantTitle}>
          <span className={styles.assistantIcon}>🤖</span>
          <span>Guaranteed Payment Assistant</span>
        </div>
        <button
          className={styles.closeButton}
          onClick={closeAssistant}
          aria-label="Close Assistant"
        >
          ✕
        </button>
      </div>
      
      <div className={styles.assistantContent}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Loading your assistant...</p>
          </div>
        ) : (
          <>
            <div
              ref={containerRef}
              className={styles.messagesContainer}
            >
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  sender={message.sender === 'assistant' ? 'bot' : (message.sender as 'user' | 'system')}
                >
                  {message.text}
                </ChatBubble>
              ))}
              {(isTyping || showInitialTyping) && (
                <div className={styles.typingContainer}>
                  <ChatbotTyping />
                </div>
              )}
            </div>
            
            <div className={styles.inputContainer}>
              <GuaranteedAssistantInputBar />
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default GuaranteedAssistantPanel;
