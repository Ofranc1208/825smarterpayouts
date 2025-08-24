"use client";

import React, { useRef } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { Message } from '../../hooks/useConversationalForm';
import ChatBubble from './ChatBubble';
import ChatbotTyping from '../../components/chatbot/ChatbotTyping';
import { useAutoScroll } from '../../hooks/useAutoScroll';
import { parseAIResponse } from '../../utils/parsing';

const ChatMessages = () => {
  const { visibleMessages, isTyping } = useChat();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Safety check: ensure visibleMessages is always an array
  const messages = Array.isArray(visibleMessages) ? visibleMessages : [];

  // Use robust auto-scroll hook with MutationObserver and smart scroll targeting
  useAutoScroll(containerRef, messages, [messages]);

  // Component hydrator - converts serializable component data back to JSX
  const hydrateComponent = (componentType: string, componentData: Record<string, any>) => {
    switch (componentType) {
      case 'CalculationLink':
        return (
          <div
            style={componentData.style}
            onClick={() => {
              window.location.href = componentData.href;
            }}
          >
            {componentData.text}
          </div>
        );
      case 'GuaranteedCalculationLink':
        return (
          <div
            style={{
              ...componentData.style,
              background: '#09b44d',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'center',
              fontWeight: '600',
              margin: '8px 0',
              boxShadow: '0 2px 8px rgba(9, 180, 77, 0.3)',
              transition: 'all 0.2s ease'
            }}
            onClick={() => {
              const url = componentData.sessionId 
                ? `${componentData.href}?sessionId=${componentData.sessionId}`
                : componentData.href;
              console.log('[GuaranteedCalculationLink] 🔍 Navigating with sessionId:', componentData.sessionId, 'URL:', url);
              window.location.href = url;
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(9, 180, 77, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(9, 180, 77, 0.3)';
            }}
          >
            {componentData.text}
          </div>
        );
      // Add more component types here as needed
      default:
        console.warn(`Unknown component type: ${componentType}`);
        return <div>Unknown component type: {componentType}</div>;
    }
  };

  // Master renderer for all message types
  const renderMessage = (msg: Message) => {
    switch (msg.type) {
      case 'text':
        return (
          <ChatBubble key={msg.id} sender={msg.sender}>
            {parseAIResponse(msg.text)}
          </ChatBubble>
        );
      case 'component':
        // Handle both legacy JSX components and new serializable components
        if (msg.component) {
          // Legacy JSX component
          return <div key={msg.id}>{msg.component}</div>;
        } else if (msg.componentType && msg.componentData) {
          // New serializable component - hydrate it
          return <div key={msg.id}>{hydrateComponent(msg.componentType, msg.componentData)}</div>;
        } else {
          console.warn('Component message missing both component and componentType/componentData:', msg);
          return null;
        }
      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, padding: '16px' }}
    >
      {messages.map(renderMessage)}
      {isTyping && <ChatbotTyping />}
    </div>
  );
};

export default ChatMessages; 