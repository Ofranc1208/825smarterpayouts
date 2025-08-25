'use client';

import React, { useState, useCallback } from 'react';

/**
 * Subscribe Button Component for YouTube Channel Hero
 * 
 * Interactive YouTube subscribe button with hover effects,
 * accessibility features, and consistent styling.
 * 
 * @component SubscribeButton
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface SubscribeButtonProps {
  /** YouTube channel URL */
  channelUrl?: string;
  /** Button text */
  text?: string;
  /** Button icon */
  icon?: string;
  /** Accessibility label */
  ariaLabel?: string;
}

/**
 * Subscribe Button Component
 * 
 * ## Features
 * - ✅ Interactive hover effects
 * - ✅ Accessibility compliance
 * - ✅ External link handling
 * - ✅ Consistent YouTube branding
 * 
 * @param props - Component props
 * @returns JSX element for subscribe button
 * 
 * @example
 * ```tsx
 * <SubscribeButton 
 *   channelUrl="https://www.youtube.com/@smarterpayouts"
 *   text="Subscribe to Channel"
 * />
 * ```
 */
export default function SubscribeButton({
  channelUrl = "https://www.youtube.com/@smarterpayouts",
  text = "Subscribe to Channel",
  icon = "📺",
  ariaLabel = "Subscribe to SmarterPayouts YouTube Channel"
}: SubscribeButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = useCallback((hovered: boolean) => {
    setIsHovered(hovered);
  }, []);

  const buttonStyles: React.CSSProperties = {
    display: "inline-block",
    background: isHovered 
      ? "linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)"
      : "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    cursor: "pointer",
    border: "none",
    fontSize: "1rem",
    transition: "all 0.2s ease",
    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
    boxShadow: isHovered ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem"
  };

  return (
    <a 
      href={channelUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      style={buttonStyles}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onFocus={() => handleHover(true)}
      onBlur={() => handleHover(false)}
    >
      <span role="img" aria-hidden="true">{icon}</span>
      {text}
    </a>
  );
}
