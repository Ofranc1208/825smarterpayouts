"use client";

import React from 'react';

/**
 * Chat bubble component for displaying messages from different senders
 * 
 * Features:
 * - Conditional styling based on sender type (user/bot/system)
 * - Smooth fade-in animation on render
 * - Responsive design with proper text wrapping
 * - Consistent visual hierarchy across chat interface
 * 
 * @component
 * @example
 * // User message
 * <ChatBubble sender="user">Hello, I need help with my payments</ChatBubble>
 * 
 * // Bot response
 * <ChatBubble sender="bot">I'd be happy to help you with that!</ChatBubble>
 * 
 * // System notification
 * <ChatBubble sender="system">Calculation completed successfully</ChatBubble>
 */
interface ChatBubbleProps {
  /** Determines the visual style and alignment of the bubble */
  sender: 'system' | 'user' | 'bot';
  /** Content to display inside the chat bubble */
  children: React.ReactNode;
  /** Optional additional CSS classes for custom styling */
  className?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ sender, children, className }) => {
  // Base styles applied to all chat bubbles
  const baseStyles: React.CSSProperties = {
    maxWidth: '80%',
    minWidth: '60px',
    padding: '10px 14px',
    marginBottom: '8px',
    fontSize: '0.98rem',
    borderRadius: '16px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    textAlign: 'left',
    wordBreak: 'break-word',
    animation: 'fadeIn 0.5s ease-in-out'
  };

  // Conditional styles based on sender type
  const senderStyles: React.CSSProperties = {
    ...(sender === 'user' && {
      background: '#22b455',
      color: '#fff',
      alignSelf: 'flex-end',
      border: '1px solid #22b455'
    }),
    ...(sender === 'bot' && {
      background: '#f1f3f4',
      color: '#222',
      alignSelf: 'flex-start',
      border: '1px solid #ececec'
    }),
    ...(sender === 'system' && {
      background: '#e6f4ea',
      color: '#1976d2',
      fontWeight: '600',
      alignSelf: 'flex-start',
      border: '1px solid #b6f2d2'
    })
  };

  // Combine base styles with sender-specific styles
  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...senderStyles
  };

  return (
    <>
      {/* Preserve CSS animations using styled-jsx */}
      <style jsx>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
      
      <div 
        style={combinedStyles}
        className={className}
      >
        {children}
      </div>
    </>
  );
};

export default ChatBubble; 