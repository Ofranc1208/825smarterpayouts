/**
 * Hero CTA Component
 * 
 * Reusable call-to-action buttons component for the hero section.
 * Features hover animations, accessibility enhancements, and
 * flexible layout options.
 * 
 * @component HeroCTA
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import React from 'react';
import Link from 'next/link';
import type { HeroCTAProps } from './types';

/**
 * Hero CTA buttons component
 * 
 * @param {HeroCTAProps} props - Component props
 * @returns {JSX.Element} Hero CTA buttons
 */
export default function HeroCTA({
  buttons,
  align = 'center',
  layout = 'horizontal',
  gap = '1rem'
}: HeroCTAProps): JSX.Element {
  const justifyContent = align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';
  const flexDirection = layout === 'vertical' ? 'column' : 'row';

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div style={{
      display: "flex",
      gap,
      justifyContent,
      flexWrap: "wrap",
      flexDirection
    }}>
      {buttons.map((button) => (
        <Link 
          key={button.id}
          href={button.href}
          aria-label={button.ariaLabel}
          style={{
            display: "inline-block",
            background: button.gradient,
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {button.text}
        </Link>
      ))}
    </div>
  );
}
