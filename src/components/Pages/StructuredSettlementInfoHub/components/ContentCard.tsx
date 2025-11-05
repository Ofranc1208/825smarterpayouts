/**
 * Content Card Component
 * Displays featured content with CTA button
 * 
 * NO CSS FILES - All styles inline
 * Uses COLORS, BORDER_RADIUS, BOX_SHADOWS from shared/styles
 */

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import type { ContentCardProps } from '../types';

export const ContentCard: React.FC<ContentCardProps> = ({
  emoji,
  title,
  description,
  buttonText,
  buttonLink
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      style={{
        background: COLORS.backgrounds.white,
        padding: `${SPACING.unit.xl} ${SPACING.unit.lg}`,
        borderRadius: BORDER_RADIUS.large,
        boxShadow: isHovered ? BOX_SHADOWS.large : BOX_SHADOWS.medium,
        marginBottom: SPACING.stack.lg,
        border: `1px solid ${COLORS.neutral.gray200}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 style={{
        fontSize: TYPOGRAPHY.fontSize.heading.h3,
        fontWeight: TYPOGRAPHY.fontWeight.bold,
        color: COLORS.neutral.gray900,
        marginBottom: SPACING.stack.md,
        lineHeight: TYPOGRAPHY.lineHeight.tight,
        background: COLORS.titleGradients.grayToGreen,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }}>
        {title}
      </h2>
      <p style={{
        fontSize: TYPOGRAPHY.fontSize.body.medium,
        color: COLORS.text.secondary,
        lineHeight: TYPOGRAPHY.lineHeight.relaxed,
        marginBottom: SPACING.stack.lg
      }}>
        {description}
      </p>
      <Link 
        href={buttonLink} 
        style={{
          display: 'inline-block',
          background: isHovered ? COLORS.primary.gradient : COLORS.primary.main,
          color: COLORS.backgrounds.white,
          padding: `${SPACING.unit.md} ${SPACING.unit.xl}`,
          borderRadius: BORDER_RADIUS.medium,
          textDecoration: 'none',
          fontWeight: TYPOGRAPHY.fontWeight.semibold,
          fontSize: TYPOGRAPHY.fontSize.body.medium,
          boxShadow: isHovered ? BOX_SHADOWS.medium : BOX_SHADOWS.small,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-1px)' : 'translateY(0)'
        }}
      >
        {buttonText}
      </Link>
    </section>
  );
};

export default ContentCard;

