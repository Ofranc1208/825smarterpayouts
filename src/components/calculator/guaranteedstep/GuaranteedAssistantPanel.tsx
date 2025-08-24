"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useGuaranteedAssistant } from '../../../contexts/GuaranteedAssistantContext';
import ChatBubble from '../../chat/ChatBubble';
import ChatbotTyping from '../../chatbot/ChatbotTyping';
import { GuaranteedAssistantInputBar } from './GuaranteedAssistantInputBar';

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

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 999,
          backdropFilter: 'blur(2px)'
        }}
        onClick={closeAssistant}
        aria-label="Close assistant panel"
      />
      
      {/* Panel */}
      <div className="assistantPanel" style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        maxWidth: '90%',
        height: '90vh',
        maxHeight: '750px',
        backgroundColor: '#ffffff',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        animation: 'slideIn 0.3s ease-out'
      }}>
      <div className="assistantHeader" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid #e0e0e0',
        background: 'linear-gradient(135deg, #22b455 0%, #1a9a47 100%)',
        flexShrink: 0,
        borderRadius: '16px 16px 0 0'
      }}>
        <div className="assistantTitle" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          margin: 0,
          fontSize: '16px',
          fontWeight: 600,
          color: '#ffffff'
        }}>
          <span style={{ fontSize: '18px' }}>🤖</span>
          <span>Guaranteed Payment Assistant</span>
        </div>
        <button 
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px'
          }}
          onClick={closeAssistant}
          aria-label="Close Assistant"
          onMouseEnter={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.backgroundColor = 'transparent';
          }}
        >
          ✕
        </button>
      </div>
      
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0
      }}>
        {isLoading ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            gap: '16px',
            color: '#666',
            fontSize: '14px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #22b455',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p>Loading your assistant...</p>
          </div>
        ) : (
          <>
            <div 
              ref={containerRef}
              className="messagesContainer"
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                padding: '16px',
                scrollBehavior: 'smooth',
                minHeight: 0
              }}
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
                <div style={{ padding: '8px 16px' }}>
                  <ChatbotTyping />
                </div>
              )}
            </div>
            
            <div className="inputContainer" style={{
              flexShrink: 0,
              padding: '12px 16px 16px 16px',
              borderTop: '1px solid #e0e0e0',
              backgroundColor: '#fafafa'
            }}>
              <GuaranteedAssistantInputBar />
            </div>
          </>
        )}
      </div>
    </div>
    
    {/* CSS Animations and Responsive Design */}
    <style jsx>{`
      @keyframes slideIn {
        from {
          transform: translate(-50%, -50%) scale(0.9);
          opacity: 0;
        }
        to {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @media (max-width: 768px) {
        .assistantPanel {
          width: 95% !important;
          height: 95vh !important;
          max-height: 650px !important;
        }
        
        .assistantHeader {
          padding: 10px 12px !important;
        }
        
        .assistantTitle {
          font-size: 15px !important;
        }
        
        .messagesContainer {
          padding: 12px !important;
        }
        
        .inputContainer {
          padding: 10px 12px 12px 12px !important;
        }
      }
    `}</style>
    </>
  );
};

export default GuaranteedAssistantPanel;
