'use client';

import React, { useState, useCallback } from 'react';

/**
 * Calculator CTA Button Component for YouTube Channel
 * 
 * Interactive calculator button with hover effects,
 * accessibility features, and consistent branding.
 * 
 * @component CalculatorCTAButton
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface CalculatorCTAButtonProps {
  /** Calculator URL */
  calculatorUrl?: string;
  /** Button text */
  text?: string;
  /** Button icon */
  icon?: string;
  /** Accessibility label */
  ariaLabel?: string;
}

/**
 * Calculator CTA Button Component
 * 
 * ## Features
 * - ✅ Interactive hover effects
 * - ✅ Accessibility compliance
 * - ✅ Internal link handling
 * - ✅ Consistent SmarterPayouts branding
 * 
 * @param props - Component props
 * @returns JSX element for calculator CTA button
 * 
 * @example
 * ```tsx
 * <CalculatorCTAButton 
 *   calculatorUrl="/pricing-calculator"
 *   text="Calculate Value"
 * />
 * ```
 */
export default function CalculatorCTAButton({
  calculatorUrl = "/pricing-calculator",
  text = "Calculate Value",
  icon = "📊",
  ariaLabel = "Use our calculator to estimate your settlement value"
}: CalculatorCTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = useCallback((hovered: boolean) => {
    setIsHovered(hovered);
  }, []);

  const buttonStyles: React.CSSProperties = {
    background: isHovered 
      ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
      : 'linear-gradient(135deg, #09b44d 0%, #059669 100%)',
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
      href={calculatorUrl}
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
