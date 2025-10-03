/**
 * CTA Section Component - Resources Page
 *
 * Final call-to-action section with buttons for chatting with Mint AI or calculating settlement value.
 * Uses design system tokens and shared Button components for consistency.
 *
 * @component
 * @returns {JSX.Element} Rendered CTA section
 *
 * @example
 * <CTASection />
 */

'use client';
import React from 'react';
import Button from '@/src/components/shared/Button/Button';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';

export default function CTASection() {
  return (
    <section
      aria-label="Final call to action"
      style={{
        paddingTop: SPACING.unit.xxl,
        paddingBottom: SPACING.unit.xxl,
        paddingLeft: SPACING.unit.md,
        paddingRight: SPACING.unit.md,
        textAlign: 'center',
        background: COLORS.backgrounds.greenLight,
        borderTop: `1px solid ${COLORS.neutral.gray200}`,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: `${COLORS.radialGradients.greenLight}, ${COLORS.radialGradients.greenLighter}`,
        backgroundPosition: '20% 80%, 80% 20%',
        backgroundSize: '50% 50%',
        backgroundRepeat: 'no-repeat',
        pointerEvents: 'none'
      }}></div>

      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          background: COLORS.backgrounds.white,
          borderRadius: BORDER_RADIUS.large,
          padding: SPACING.card.compact,
          boxShadow: BOX_SHADOWS.medium,
          border: `1px solid ${COLORS.neutral.gray200}`,
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          {/* Title with Gradient */}
          <h2 style={{
            fontSize: TYPOGRAPHY.fontSize.heading.h3,
            fontWeight: TYPOGRAPHY.fontWeight.bold,
            background: COLORS.titleGradients.grayToGreen,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: SPACING.stack.sm,
            lineHeight: TYPOGRAPHY.lineHeight.tight
          }}>
            Need Help with Your Structured Settlement?
          </h2>

          {/* Subtitle */}
          <p style={{
            fontSize: TYPOGRAPHY.fontSize.body.medium,
            color: COLORS.text.secondary,
            maxWidth: '600px',
            margin: `0 auto ${SPACING.stack.md}`,
            lineHeight: TYPOGRAPHY.lineHeight.normal
          }}>
            Get personalized guidance from Mint AI or calculate your settlement value.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: SPACING.inline.sm,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Button
              as="a"
              href="/mint-intelligent-chat"
              variant="technology-secondary"
              size="md"
              enhancedHover={true}
              shimmer={true}
            >
              💬 Chat with Mint AI
            </Button>

            <Button
              as="a"
              href="/pricing-calculator"
              variant="technology-primary"
              size="md"
              enhancedHover={true}
              shimmer={true}
              shimmerDelay={1}
            >
              📊 Calculate Value
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

