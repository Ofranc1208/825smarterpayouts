"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useAssistant } from '../../../contexts/AssistantContext';
import ChatBubble from '../../chat/ChatBubble';
import ChatbotTyping from '../../chatbot/ChatbotTyping';
import { AssistantInputBar } from './AssistantInputBar';

const AssistantPanel: React.FC = () => {
  const { isOpen, closeAssistant, messages, isTyping, setIsTyping, addWelcomeMessage } = useAssistant();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasShownInitialAnimation, setHasShownInitialAnimation] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Improved auto-scroll implementation with user interaction detection
  useEffect(() => {
    if (containerRef.current && !isHovered) {
      console.log('Auto-scrolling to bottom, messages:', messages.length, 'isTyping:', isTyping);
      
      // Check if user is near the bottom before auto-scrolling
      const container = containerRef.current;
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 50;
      
      // Only auto-scroll if user is near the bottom (hasn't manually scrolled up)
      if (isNearBottom) {
        // Small delay to ensure DOM updates are complete
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }
        }, 150);
      }
    }
  }, [messages, isTyping, isHovered]);

  // Show loading state briefly when panel opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle initial animation sequence when panel opens for the first time
  useEffect(() => {
    if (isOpen && !hasShownInitialAnimation && messages.length === 0) {
      setHasShownInitialAnimation(true);
      
      // Step 1: Show typing animation
      setIsTyping(true);
      
      // Step 2: After 1.5 seconds, hide typing and add welcome message
      setTimeout(() => {
        setIsTyping(false);
        addWelcomeMessage();
      }, 1500);
    }
  }, [isOpen, hasShownInitialAnimation, messages.length, setIsTyping, addWelcomeMessage]);

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
      />
      
      {/* Panel */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: window.innerWidth <= 768 ? '95%' : '500px',
        maxWidth: '90%',
        height: window.innerWidth <= 768 ? '95vh' : '90vh',
        maxHeight: window.innerWidth <= 768 ? '650px' : '750px',
        backgroundColor: '#ffffff',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        animation: 'slideIn 0.3s ease-out',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: window.innerWidth <= 768 ? '8px 12px' : '10px 16px',
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#09b44d',
          flexShrink: 0,
          borderRadius: '16px 16px 0 0'
        }}>
          <h3 style={{
            margin: 0,
            fontSize: window.innerWidth <= 768 ? '15px' : '16px',
            fontWeight: 600,
            color: '#ffffff'
          }}>Help Assistant</h3>
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
              backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={closeAssistant}
            aria-label="Close assistant"
          >
            ×
          </button>
        </div>
        
        {/* Message Display Area with Auto-Scroll */}
        <div 
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            flex: 1,
            padding: window.innerWidth <= 768 ? '20px 16px 16px 16px' : '24px 20px 20px 20px',
            overflowY: 'auto',
            overflowX: 'hidden',
            minHeight: 0,
            scrollBehavior: 'smooth'
          }}
        >
          {isLoading ? (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100px',
              color: '#666',
              fontSize: '14px'
            }}>
              Loading conversation...
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {messages.map((message) => (
                <ChatBubble 
                  key={message.id} 
                  sender={message.sender}
                >
                  {message.text}
                </ChatBubble>
              ))}
              {isTyping && <ChatbotTyping />}
            </div>
          )}
        </div>

        {/* Input Bar */}
        <AssistantInputBar />
      </div>

      {/* CSS Animation Keyframes */}
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
      `}</style>
    </>
  );
};

export default AssistantPanel; 