/**
 * Hero Header Component
 * 
 * Reusable header component for the hero section with title,
 * subtitle, description, and optional badge. Features responsive 
 * typography and accessibility enhancements.
 * 
 * @component HeroHeader
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import React from 'react';
import MintBadge from '@/components/MintBadge';
import type { HeroHeaderProps } from './types';

/**
 * Hero section header component
 * 
 * @param {HeroHeaderProps} props - Component props
 * @returns {JSX.Element} Responsive hero header
 */
export default function HeroHeader({
  title,
  subtitle,
  description,
  align = 'center',
  showBadge = true,
  badge
}: HeroHeaderProps): JSX.Element {
  const textAlign = align as React.CSSProperties['textAlign'];

  return (
    <>
      {/* Mint Badge */}
      {showBadge && badge && (
        <MintBadge 
          variant={badge.variant} 
          style={{ marginBottom: "2rem" }} 
        />
      )}

      {/* Subtitle */}
      <div style={{
        fontSize: "0.875rem",
        fontWeight: "600",
        color: "#047857",
        textTransform: "uppercase",
        letterSpacing: "1px",
        marginBottom: "1rem",
        textAlign
      }}>
        {subtitle}
      </div>

      {/* Main Title */}
      <h1 id="hero-heading" style={{
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        fontWeight: "700",
        color: "#1f2937",
        marginBottom: "1.5rem",
        lineHeight: "1.2",
        textAlign
      }}>
        {title}
      </h1>

      {/* Description */}
      <p style={{
        fontSize: "1.125rem",
        color: "#374151",
        maxWidth: "600px",
        margin: textAlign === 'center' ? "0 auto 2rem" : "0 0 2rem",
        lineHeight: "1.6",
        textAlign
      }}>
        {description}
      </p>
    </>
  );
}
