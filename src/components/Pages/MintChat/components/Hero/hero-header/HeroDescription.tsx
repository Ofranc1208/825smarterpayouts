import React from 'react';

/**
 * Hero Description Component for MintChat
 * 
 * Displays the descriptive text explaining the chat functionality
 * with optimal readability and user-friendly messaging.
 * 
 * @component HeroDescription
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Hero Description Component
 * 
 * Renders the description paragraph with proper typography
 * and constrained width for optimal reading experience.
 */
export default function HeroDescription() {
  return (
    <p style={{
      fontSize: "0.875rem",
      color: "#6b7280",
      maxWidth: "450px",
      margin: "0 auto 0.5rem",
      lineHeight: "1.4"
    }}>
      Get instant answers about your structured settlement. No personal information required.
    </p>
  );
}
