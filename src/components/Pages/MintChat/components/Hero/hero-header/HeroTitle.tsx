import React from 'react';

/**
 * Hero Title Component for MintChat
 * 
 * Displays the main "Chat with Mint AI Assistant" title with
 * responsive typography and optimal readability.
 * 
 * @component HeroTitle
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Hero Title Component
 * 
 * Renders the main heading with responsive font sizing
 * and proper semantic markup for accessibility.
 */
export default function HeroTitle() {
  return (
    <h1 style={{
      fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "0.5rem",
      lineHeight: "1.2"
    }}>
      Chat with Mint AI Assistant
    </h1>
  );
}
