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
import { COLORS, TYPOGRAPHY } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';
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
  showBadge = false,
  badge
}: HeroHeaderProps): JSX.Element {
  const textAlign = align as React.CSSProperties['textAlign'];

  return (
    <>
      {/* Main Title */}
      <h1 id="hero-heading" style={{
        ...TEXT_PRESETS.heroTitle,
        color: COLORS.neutral.gray900,
        marginBottom: "1rem",
        textAlign,
        background: COLORS.titleGradients.grayToGreen,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }}>
        {title}
      </h1>

      {/* Description */}
      <p style={{
        fontSize: TYPOGRAPHY.fontSize.body.medium,
        color: COLORS.text.secondary,
        maxWidth: "600px",
        margin: textAlign === 'center' ? "0 auto 1.5rem" : "0 0 1.5rem",
        lineHeight: TYPOGRAPHY.lineHeight.relaxed,
        textAlign
      }}>
        {description}
      </p>
    </>
  );
}
