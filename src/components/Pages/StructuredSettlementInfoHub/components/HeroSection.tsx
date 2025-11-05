/**
 * Hero Section Component for Info Hub Pages
 * Reusable hero with gradient background and optimized spacing
 *
 * NO CSS FILES - All styles inline
 * Uses COLORS from shared/styles
 * Optimized padding for cleaner layout
 */

'use client';
import React from 'react';
import Button from '@/src/components/shared/Button';
import { COLORS, TYPOGRAPHY, SPACING } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

interface HeroSectionProps {
  badge?: string;
  title: string;
  subtitle: string;
  showCTAs?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge = "Knowledge Center",
  title,
  subtitle,
  showCTAs = true
}) => {
  return (
    <section style={{
      background: COLORS.backgrounds.slateGradient,
      padding: `${SPACING.unit.xl} 0`,
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        background: `radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
                     radial-gradient(circle at 80% 20%, rgba(255, 180, 0, 0.06) 0%, transparent 50%)`,
        pointerEvents: "none"
      }}></div>
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto',
        padding: `0 ${SPACING.unit.md}`,
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          fontSize: TYPOGRAPHY.fontSize.body.small,
          fontWeight: TYPOGRAPHY.fontWeight.semibold,
          color: COLORS.primary.main,
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: SPACING.stack.sm
        }}>
          {badge}
        </div>
        <h1 style={{
          ...TEXT_PRESETS.heroTitle,
          color: COLORS.neutral.gray900,
          marginBottom: SPACING.stack.lg,
          lineHeight: "1.3",
          background: COLORS.titleGradients.grayToGreen,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          {title}
        </h1>
        <p style={{
          fontSize: TYPOGRAPHY.fontSize.body.medium,
          color: COLORS.text.secondary,
          maxWidth: "600px",
          margin: `0 auto ${SPACING.stack.lg}`,
          lineHeight: TYPOGRAPHY.lineHeight.relaxed
        }}>
          {subtitle}
        </p>
        {showCTAs && (
          <div style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <Button
              as="a"
              href="/mint-chat-active?type=calculate&source=info-hub-hero"
              variant="technology-primary"
              size="sm"
              enhancedHover={true}
              shimmer={true}
            >
              💰 Get Your Quote
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
        )}
      </div>
    </section>
  );
};

export default HeroSection;

