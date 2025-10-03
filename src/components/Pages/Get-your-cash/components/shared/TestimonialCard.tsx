/**
 * Testimonial Card Component
 * 
 * Displays a client testimonial with quote, avatar, and details
 */

'use client';

import React from 'react';
import { Testimonial } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { createFloatHover } from '@/src/components/shared/styles/hoverEffects';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const floatHover = createFloatHover({ distance: 6 });

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div 
        style={{
          background: COLORS.backgrounds.white,
          borderRadius: BORDER_RADIUS.xxlarge,
          padding: SPACING.card.standard,
          textAlign: 'center',
          border: `1px solid ${COLORS.neutral.gray200}`,
          position: 'relative',
          boxShadow: BOX_SHADOWS.large,
          ...floatHover.style,
          transition: floatHover.transition,
          cursor: 'pointer'
        }}
        onMouseEnter={floatHover.onMouseEnter}
        onMouseLeave={floatHover.onMouseLeave}
      >
        {/* Large Quote Mark (decorative) */}
        <div style={{
          fontSize: TYPOGRAPHY.fontSize.heading.h1,
          color: COLORS.neutral.gray200,
          position: 'absolute',
          top: SPACING.stack.md,
          left: SPACING.card.standard,
          lineHeight: '1',
          userSelect: 'none' as const
        }}>
          "
        </div>

        {/* Quote Text */}
        <p style={{
          fontSize: TYPOGRAPHY.fontSize.body.large,
          fontStyle: 'italic',
          color: COLORS.text.primary,
          marginBottom: SPACING.stack.xl,
          lineHeight: TYPOGRAPHY.lineHeight.relaxed,
          position: 'relative',
          zIndex: 1,
          paddingTop: SPACING.stack.lg
        }}>
          {testimonial.text}
        </p>

        {/* Avatar + Name + Location */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: SPACING.inline.md
        }}>
          {/* Avatar with Initial */}
          <div style={{
            width: '48px',
            height: '48px',
            background: COLORS.primary.gradient,
            borderRadius: BORDER_RADIUS.circle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: COLORS.text.white,
            fontWeight: TYPOGRAPHY.fontWeight.bold,
            fontSize: TYPOGRAPHY.fontSize.body.large,
            boxShadow: BOX_SHADOWS.medium,
            flexShrink: 0
          }}>
            {testimonial.initial}
          </div>

          {/* Name and Location */}
          <div style={{ textAlign: 'left' }}>
            <div style={{
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              color: COLORS.text.primary,
              fontSize: TYPOGRAPHY.fontSize.body.default,
              marginBottom: SPACING.stack.xs
            }}>
              {testimonial.name}
            </div>
            <div style={{
              fontSize: TYPOGRAPHY.fontSize.body.small,
              color: COLORS.text.secondary
            }}>
              {testimonial.location} • {testimonial.paymentMethod}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

