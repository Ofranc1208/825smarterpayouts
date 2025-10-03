/**
 * Payment Method Card Component
 * 
 * Reusable card component for displaying payment methods
 * Supports 3 theme variants: green, amber, blue
 */

'use client';

import React from 'react';
import { PaymentMethod } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { createFloatHover } from '@/src/components/shared/styles/hoverEffects';

interface PaymentMethodCardProps {
  method: PaymentMethod;
}

// Theme color mappings
const themeColors = {
  green: {
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    border: '#bbf7d0',
    badgeGradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    iconGradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    title: '#047857',
    text: '#065f46',
    checkmark: '#059669'
  },
  amber: {
    background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    border: '#fbbf24',
    badgeGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    iconGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    title: '#d97706',
    text: '#92400e',
    checkmark: '#f59e0b'
  },
  blue: {
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    border: '#93c5fd',
    badgeGradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    iconGradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    title: '#2563eb',
    text: '#1e40af',
    checkmark: '#3b82f6'
  }
};

export default function PaymentMethodCard({ method }: PaymentMethodCardProps) {
  const colors = themeColors[method.theme];
  const floatHover = createFloatHover({ distance: 8 });

  return (
    <div 
      style={{
        background: colors.background,
        borderRadius: BORDER_RADIUS.xxlarge,
        padding: SPACING.card.standard,
        minHeight: '450px',
        border: `2px solid ${colors.border}`,
        textAlign: 'center',
        position: 'relative',
        boxShadow: BOX_SHADOWS.large,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        ...floatHover.style,
        transition: floatHover.transition,
        cursor: 'pointer'
      }}
      onMouseEnter={floatHover.onMouseEnter}
      onMouseLeave={floatHover.onMouseLeave}
    >
      {/* Badge (top-right) */}
      <div style={{
        position: 'absolute',
        top: SPACING.stack.md,
        right: SPACING.stack.md,
        background: colors.badgeGradient,
        color: COLORS.text.white,
        padding: `${SPACING.inline.xs} ${SPACING.inline.md}`,
        borderRadius: BORDER_RADIUS.large,
        fontSize: TYPOGRAPHY.fontSize.body.xsmall,
        fontWeight: TYPOGRAPHY.fontWeight.semibold,
        display: 'flex',
        alignItems: 'center',
        gap: SPACING.inline.xs,
        letterSpacing: '0.5px',
        textTransform: 'uppercase' as const
      }}>
        <span>{method.badge.emoji}</span>
        <span>{method.badge.text}</span>
      </div>

      {/* Top Section (Icon + Title + Description) */}
      <div style={{ flex: '1' }}>
        {/* Icon (circular) */}
        <div style={{
          background: colors.iconGradient,
          color: COLORS.text.white,
          borderRadius: BORDER_RADIUS.circle,
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: TYPOGRAPHY.fontSize.heading.h2,
          margin: `${SPACING.stack.md} auto ${SPACING.stack.lg}`,
          boxShadow: BOX_SHADOWS.medium
        }}>
          {method.icon}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: TYPOGRAPHY.fontSize.heading.h4,
          fontWeight: TYPOGRAPHY.fontWeight.bold,
          color: colors.title,
          marginBottom: SPACING.stack.sm,
          letterSpacing: '-0.5px'
        }}>
          {method.name}
        </h3>

        {/* Description */}
        <p style={{
          color: colors.text,
          marginBottom: SPACING.stack.lg,
          lineHeight: TYPOGRAPHY.lineHeight.relaxed,
          fontSize: TYPOGRAPHY.fontSize.body.default
        }}>
          {method.description}
        </p>
      </div>

      {/* Bottom Section (Benefits List) */}
      <div style={{
        background: COLORS.backgrounds.white,
        borderRadius: BORDER_RADIUS.medium,
        padding: SPACING.card.compact,
        border: `1px solid ${COLORS.neutral.gray200}`,
        boxShadow: BOX_SHADOWS.small
      }}>
        {method.benefits.map((benefit, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: SPACING.inline.sm,
            marginBottom: index < method.benefits.length - 1 ? SPACING.stack.sm : '0',
            textAlign: 'left'
          }}>
            <span style={{ 
              color: colors.checkmark, 
              fontSize: TYPOGRAPHY.fontSize.body.default,
              flexShrink: 0
            }}>✅</span>
            <span style={{
              fontSize: TYPOGRAPHY.fontSize.body.small,
              color: colors.title,
              fontWeight: TYPOGRAPHY.fontWeight.medium,
              lineHeight: TYPOGRAPHY.lineHeight.normal
            }}>
              {benefit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

