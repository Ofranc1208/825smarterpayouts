/**
 * Stat Card Component
 * 
 * Displays a quick statistic in the hero section
 * Optionally clickable if href is provided
 */

'use client';

import React from 'react';
import { StatCard as StatCardType } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { createFloatHover } from '@/src/components/shared/styles/hoverEffects';

interface StatCardProps {
  stat: StatCardType;
}

export default function StatCard({ stat }: StatCardProps) {
  const floatHover = createFloatHover({ distance: 4 });

  const cardStyles: React.CSSProperties = {
    padding: `${SPACING.inline.md} ${SPACING.inline.sm}`,
    background: COLORS.backgrounds.greenLight,
    borderRadius: BORDER_RADIUS.medium,
    border: `1px solid ${COLORS.borders.green}`,
    textAlign: 'center',
    minHeight: '85px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: stat.href ? 'pointer' : 'default',
    boxShadow: BOX_SHADOWS.small,
    ...floatHover.style,
    transition: floatHover.transition
  };

  const content = (
    <>
      <div style={{
        fontSize: TYPOGRAPHY.fontSize.heading.h4,
        fontWeight: TYPOGRAPHY.fontWeight.bold,
        color: COLORS.primary.dark,
        lineHeight: TYPOGRAPHY.lineHeight.tight,
        marginBottom: SPACING.stack.xs
      }}>
        {stat.value}
      </div>
      <div style={{
        fontSize: TYPOGRAPHY.fontSize.body.xsmall,
        color: COLORS.text.tertiary,
        fontWeight: TYPOGRAPHY.fontWeight.medium,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px'
      }}>
        {stat.label}
      </div>
    </>
  );

  // If href is provided, wrap in an anchor tag
  if (stat.href) {
    return (
      <a href={stat.href} style={{ textDecoration: 'none' }}>
        <div
          style={cardStyles}
          title={`Click to see ${stat.label.toLowerCase()} details`}
          onMouseEnter={floatHover.onMouseEnter}
          onMouseLeave={floatHover.onMouseLeave}
        >
          {content}
        </div>
      </a>
    );
  }

  // Otherwise, just render the card
  return (
    <div 
      style={cardStyles}
      onMouseEnter={floatHover.onMouseEnter}
      onMouseLeave={floatHover.onMouseLeave}
    >
      {content}
    </div>
  );
}

