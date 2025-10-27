/**
 * Hero Section Component - Review Offer Page
 * 
 * Displays the main hero content with privacy badge, title, description, and CTA buttons.
 * Uses design system tokens for consistent styling and shared Button components.
 * 
 * @component
 * @returns {JSX.Element} Rendered hero section with privacy focus
 * 
 * @example
 * <HeroSection />
 */

import Button from '@/src/components/shared/Button/Button';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';

export default function HeroSection() {
  return (
    <section
      aria-label="Review offer hero section"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)',
        paddingTop: SPACING.unit.xl,
        paddingBottom: SPACING.unit.xl,
        paddingLeft: SPACING.unit.md,
        paddingRight: SPACING.unit.md,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: TYPOGRAPHY.fontWeight.bold,
          color: COLORS.text.primary,
          marginBottom: SPACING.stack.md,
          lineHeight: TYPOGRAPHY.lineHeight.tight
        }}>
          Review Your Offer with Complete Privacy
        </h1>

        <p style={{
          fontSize: TYPOGRAPHY.fontSize.body.large,
          color: COLORS.text.secondary,
          maxWidth: '600px',
          margin: `0 auto ${SPACING.stack.lg}`,
          lineHeight: TYPOGRAPHY.lineHeight.relaxed
        }}>
          Get a quote without sharing personal information. Our process is fully digital, confidential, and secure.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: SPACING.inline.md,
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: SPACING.stack.lg
        }}>
          <Button
            as="a"
            href="/mint-intelligent-chat"
            variant="technology-primary"
            size="lg"
            enhancedHover={true}
            shimmer={true}
          >
            🔒 Get Your Instant Offer
          </Button>

          <Button
            as="a"
            href="/mint-intelligent-chat"
            variant="technology-secondary"
            size="lg"
            enhancedHover={true}
            shimmer={true}
            shimmerDelay={1}
          >
            💬 Chat with Mint AI
          </Button>
        </div>

        {/* Trust Indicators */}
        <div style={{
          fontSize: TYPOGRAPHY.fontSize.body.small,
          color: COLORS.text.secondary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: SPACING.inline.sm,
          flexWrap: 'wrap'
        }}>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: SPACING.inline.xs,
            fontWeight: 'bold',
            color: COLORS.primary.dark
          }}>
            ✅ No personal info required
          </span>
          <span style={{ color: COLORS.borders.medium }}>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: SPACING.inline.xs }}>
            💻 100% digital
          </span>
          <span style={{ color: COLORS.borders.medium }}>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: SPACING.inline.xs }}>
            🛡️ State compliant
          </span>
        </div>
      </div>
    </section>
  );
}

