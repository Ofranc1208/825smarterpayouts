/**
 * CTA Section Component
 * Final call-to-action section at bottom of pages with optimized spacing
 *
 * NO CSS FILES - All styles inline
 * Uses COLORS from shared/styles
 * Reduced padding for cleaner, more compact layout
 */

'use client';
import React from 'react';
import Button from '@/src/components/shared/Button';
import { COLORS, TYPOGRAPHY, SPACING } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';
import type { CTASectionProps } from '../types';

export const CTASection: React.FC<CTASectionProps> = ({
  title = "Ready to Get Started?",
  subtitle = "Get your instant quote or chat with Mint AI to learn more about your structured settlement options."
}) => {
  return (
    <section style={{
      background: COLORS.backgrounds.greenLight,
      padding: `${SPACING.unit.xl} 0`,
      textAlign: 'center',
      borderTop: `1px solid ${COLORS.neutral.gray200}`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
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
        padding: `0 ${SPACING.unit.md}`,
        position: 'relative',
        zIndex: 1
      }}>
        <h2 style={{
          ...TEXT_PRESETS.heroTitle,
          fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
          color: COLORS.neutral.gray900,
          marginBottom: SPACING.stack.md,
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
          marginBottom: SPACING.stack.lg,
          maxWidth: '600px',
          margin: `0 auto ${SPACING.stack.lg}`,
          lineHeight: TYPOGRAPHY.lineHeight.relaxed
        }}>
          {subtitle}
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Button
            as="a"
            href="/mint-chat-active?type=calculate&source=info-hub-cta"
            variant="technology-primary"
            size="sm"
            enhancedHover={true}
            shimmer={true}
          >
            💰 Get Your Instant Quote
          </Button>
          <Button
            as="a"
            href="/mint-intelligent-chat?chat=open&feature=calculator"
            variant="mint-chat"
            size="sm"
            enhancedHover={true}
            shimmer={true}
            shimmerDelay={1}
          >
            💬 Chat with Mint AI
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

