'use client';

import React, { useState, useCallback } from 'react';

/**
 * Mint Chat CTA Button Component for YouTube Channel
 * 
 * Interactive Mint AI chat button with hover effects,
 * accessibility features, and consistent branding.
 * 
 * @component MintChatCTAButton
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface MintChatCTAButtonProps {
  /** Mint AI chat URL */
  mintChatUrl?: string;
  /** Button text */
  text?: string;
  /** Button icon */
  icon?: string;
  /** Accessibility label */
  ariaLabel?: string;
}

/**
 * Mint Chat CTA Button Component
 * 
 * ## Features
 * - ✅ Interactive hover effects
 * - ✅ Accessibility compliance
 * - ✅ Internal link handling
 * - ✅ Consistent Mint AI branding
 * 
 * @param props - Component props
 * @returns JSX element for Mint chat CTA button
 * 
 * @example
 * ```tsx
 * <MintChatCTAButton 
 *   mintChatUrl="/mint-intelligent-chat"
 *   text="Chat with Mint AI"
 * />
 * ```
 */
export default function MintChatCTAButton({
  mintChatUrl = "/mint-intelligent-chat",
  text = "Chat with Mint AI",
  icon = "💬",
  ariaLabel = "Chat with Mint AI Assistant for personalized guidance"
}: MintChatCTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = useCallback((hovered: boolean) => {
    setIsHovered(hovered);
  }, []);

  const buttonStyles: React.CSSProperties = {
    background: isHovered 
      ? 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)'
      : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  return (
    <a 
      href={mintChatUrl}
      aria-label={ariaLabel}
      style={buttonStyles}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onFocus={() => handleHover(true)}
      onBlur={() => handleHover(false)}
    >
      {text}
    </a>
  );
}
