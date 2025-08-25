import React from 'react';

/**
 * Hero Subtitle Component for MintChat
 * 
 * Displays the "AI-Powered Assistant" subtitle with consistent
 * styling and branding colors.
 * 
 * @component HeroSubtitle
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Hero Subtitle Component
 * 
 * Renders the subtitle text with proper typography and spacing
 * for the MintChat hero section.
 */
export default function HeroSubtitle() {
  return (
    <div style={{
      fontSize: "0.75rem",
      fontWeight: "600",
      color: "#059669",
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginBottom: "0.25rem"
    }}>
      AI-Powered Assistant
    </div>
  );
}
