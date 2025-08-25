import React from 'react';

/**
 * Hero Background Component for MintChat
 * 
 * Provides the gradient background and decorative patterns
 * for the hero section with optimal visual appeal.
 * 
 * @component HeroBackground
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

/**
 * Hero Background Component
 * 
 * Renders the background gradient and pattern overlays
 * for the MintChat hero section.
 */
export default function HeroBackground() {
  return (
    <>
      {/* Main gradient background */}
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)"
      }} />
      
      {/* Background Pattern Overlay */}
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        background: "radial-gradient(circle at 20% 80%, rgba(5, 150, 105, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.06) 0%, transparent 50%)",
        pointerEvents: "none"
      }} />
    </>
  );
}