"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useGuaranteedAssistant } from '../../../contexts/GuaranteedAssistantContext';
import { GuaranteedAssistantBackdrop, GuaranteedMessageContainer } from './assistant-components';
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
    addBotMessage,
    clearMessages
  } = useGuaranteedAssistant();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasShownInitialAnimation, setHasShownInitialAnimation] = useState(false);
  const [showInitialTyping, setShowInitialTyping] = useState(false);
  const [hasShownWelcomeForStep, setHasShownWelcomeForStep] = useState<string | null>(null);
  const [lastStepShown, setLastStepShown] = useState<string | null>(null);
  
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

  // Handle initial welcome message when panel opens (simplified like LCP)
  useEffect(() => {
    if (isOpen && !hasShownInitialAnimation && messages.length === 0) {
      console.log('[GuaranteedAssistantPanel] Starting initial animation sequence');
      console.log('[GuaranteedAssistantPanel] Current step:', currentStep);
      setHasShownInitialAnimation(true);
      
      // Show typing animation
      setShowInitialTyping(true);
      
      // After 1.5 seconds, hide typing and add welcome message
      setTimeout(() => {
        console.log('[GuaranteedAssistantPanel] Adding welcome message after animation');
        console.log('[GuaranteedAssistantPanel] Current step at welcome time:', currentStep);
        setShowInitialTyping(false);
        
        // Always show a step-aware welcome message
        const effectiveStep = currentStep || 'mode'; // Default to mode if no step
        const stepMap: Record<string, { number: number; total: number; name: string }> = {
          'mode': { number: 1, total: 2, name: 'Payment Mode' },
          'amount': { number: 2, total: 2, name: 'Payment Amount' },
          'review': { number: 2, total: 2, name: 'Review' },
          'offer': { number: 2, total: 2, name: 'Your Offer' }
        };
        
        const stepData = stepMap[effectiveStep];
        if (stepData) {
          const welcomeMessage = `Hi! I'm your Guaranteed Payments assistant.

I see you're now on step ${stepData.number} of ${stepData.total} (${stepData.name}).

If you have any questions about any steps, please let me know.`;
          
          addBotMessage(welcomeMessage);
          setLastStepShown(effectiveStep);
        } else {
          // Fallback if step mapping fails
          addBotMessage(`Hi! I'm your Guaranteed Payments assistant.

I see you're now on step 1 of 2 (Payment Mode).

If you have any questions about any steps, please let me know.`);
          setLastStepShown('mode');
        }
      }, 1500);
    }
  }, [isOpen, hasShownInitialAnimation, messages.length, currentStep, addBotMessage]);

  // Add step-aware message when step changes and panel is open (matching LCP pattern)
  useEffect(() => {
    if (isOpen && currentStep && currentStep !== lastStepShown && messages.length > 0) {
      console.log('[GuaranteedAssistantPanel] Step changed from', lastStepShown, 'to', currentStep);
      setLastStepShown(currentStep);

      const stepMap: Record<string, { number: number; total: number; name: string }> = {
        'mode': { number: 1, total: 2, name: 'Payment Mode' },
        'amount': { number: 2, total: 2, name: 'Payment Amount' },
        'review': { number: 2, total: 2, name: 'Review' },
        'offer': { number: 2, total: 2, name: 'Your Offer' }
      };

      const stepData = stepMap[currentStep];
      if (stepData) {
        const stepMessage = `I see you're now on step ${stepData.number} of ${stepData.total} (${stepData.name}).\n\nWhat can I help you with here?`;

        setTimeout(() => {
          addBotMessage(stepMessage);
        }, 300);
      }
    }
  }, [isOpen, currentStep, lastStepShown, addBotMessage]); // Removed messages.length to prevent repeated triggers

  // Note: Removed body scroll prevention to avoid black overlay issues
  // The backdrop handles modal behavior without interfering with body styles

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop Component */}
      <GuaranteedAssistantBackdrop onClose={closeAssistant} />
      
      {/* Panel */}
      <div className={styles.panel}>
        {/* Header with inline styling like LCP */}
        <div className={styles.header}>
          <h3 className={styles.title}>Guaranteed Payment Assistant</h3>
          <div className={styles.headerButtons}>
            <button
              className={styles.resetButton}
              onClick={clearMessages}
              aria-label="Reset chat session"
              title="Reset chat session"
              type="button"
            >
              ↻
            </button>
            <button
              className={styles.closeButton}
              onClick={closeAssistant}
              aria-label="Close assistant"
              type="button"
            >
              ×
            </button>
          </div>
        </div>
        
        {/* Message Display Area */}
        <div className={styles.messagesContainer}>
          {isLoading ? (
            <div className={styles.loadingContainer}>
              Loading conversation...
            </div>
          ) : (
            <div className={styles.messagesWrapper}>
              <GuaranteedMessageContainer
                messages={messages}
                isTyping={isTyping || showInitialTyping}
                isLoading={false}
              />
            </div>
          )}
        </div>

        {/* Input Bar */}
        <GuaranteedAssistantInputBar />
      </div>
    </>
  );
};

export default GuaranteedAssistantPanel;
