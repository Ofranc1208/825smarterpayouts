/**
 * CTA Section Component - Terms Page
 *
 * Final call-to-action section encouraging users to get started.
 * Uses white card on green background pattern matching other refactored pages.
 *
 * @component
 * @returns {JSX.Element} Rendered final CTA section
 *
 * @example
 * <CTASection />
 */

'use client';
import React from 'react';
import Button from '@/src/components/shared/Button/Button';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function CTASection() {
  return (
    <section
      aria-label="Final call to action"
      style={{
        paddingTop: SPACING.unit.xxxxl,
        paddingBottom: SPACING.unit.xxxxl,
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
          borderRadius: BORDER_RADIUS.xxlarge,
          padding: SPACING.card.standard,
          boxShadow: BOX_SHADOWS.large,
          border: `1px solid ${COLORS.neutral.gray200}`,
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Title with Gradient */}
          <h2 style={{
            ...TEXT_PRESETS.heroTitle,
            background: COLORS.titleGradients.grayToGreen,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: SPACING.stack.md,
            fontSize: 'clamp(1.5rem, 3.5vw, 2rem)'
          }}>
            Ready to Get Started?
          </h2>

          {/* Subtitle */}
          <p style={{
            ...TEXT_PRESETS.sectionSubtitle,
            color: COLORS.text.secondary,
            maxWidth: '650px',
            margin: `0 auto ${SPACING.stack.xxl}`
          }}>
            Now that you understand our terms, get your instant quote and experience our Smarter Payouts AI-powered platform.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: SPACING.inline.md,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Button
              as="a"
              href="/pricing-calculator"
              variant="technology-primary"
              size="lg"
              enhancedHover={true}
              shimmer={true}
            >
              Get Your Quote
            </Button>

            <Button
              as="a"
              href="/mint-intelligent-chat?chat=open&feature=calculator"
              variant="technology-secondary"
              size="lg"
              enhancedHover={true}
              shimmer={true}
              shimmerDelay={1}
            >
              Chat with Mint AI
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

