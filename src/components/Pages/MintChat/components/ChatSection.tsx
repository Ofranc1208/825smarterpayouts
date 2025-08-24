import React from 'react';
import ChatManager from '../../../chat/ChatManager';

/**
 * Chat Section Component for Mint Chat
 * 
 * Wraps the ChatManager component with appropriate styling
 * and layout for the main chat interface section.
 * 
 * @component ChatSection
 * @author SmarterPayouts Team
 * @since 2024
 */

/**
 * Chat Section Component
 * 
 * Provides the main chat interface section with proper
 * container styling and responsive layout.
 */
const ChatSection: React.FC = () => {
  return (
    <main style={{
      background: "linear-gradient(to bottom, #f9fafb 0%, #f3f4f6 100%)",
      minHeight: "auto",
      padding: "0 0 2rem"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1rem"
      }}>
        <ChatManager />
      </div>
    </main>
  );
};

export default ChatSection;
