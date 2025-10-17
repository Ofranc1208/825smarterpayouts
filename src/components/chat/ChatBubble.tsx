"use client";

import React from 'react';
import { formatMessageText } from '../../utils/parsing';
import styles from './ChatBubble.module.css';

/**
 * Chat bubble component for displaying messages from different senders
 *
 * Features:
 * - Conditional styling based on sender type (user/bot/system)
 * - Smooth fade-in animation on render using CSS modules
 * - Responsive design with proper text wrapping
 * - Consistent visual hierarchy across chat interface
 * - CSS modules for proper styling architecture
 * - Markdown support for bold text (**text**)
 *
 * @component
 * @example
 * // User message
 * <ChatBubble sender="user">Hello, I need help with my payments</ChatBubble>
 *
 * // Bot response with bold text
 * <ChatBubble sender="bot">Let's explore your **Early Payout Options**</ChatBubble>
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
  // Build CSS classes using CSS modules approach
  const bubbleClasses = [
    styles.chatBubble,           // Base bubble styles
    styles[`chatBubble--${sender}`], // Sender-specific styles
    className                    // Additional custom classes
  ].filter(Boolean).join(' ');

  // Render text with markdown formatting support
  const renderTextWithFormatting = (text: string) => {
    const { text: cleanText, hasBold } = formatMessageText(text);

    if (!hasBold) {
      return text;
    }

    // Split by bold markers and render with formatting
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove the ** markers and make it bold
        const boldText = part.slice(2, -2);
        return <strong key={index}>{boldText}</strong>;
      }
      return part;
    });
  };

  // Handle both string and React element children
  const renderChildren = () => {
    if (typeof children === 'string') {
      return renderTextWithFormatting(children);
    }
    return children;
  };

  return (
    <div className={bubbleClasses}>
      {renderChildren()}
    </div>
  );
};

export default ChatBubble; 