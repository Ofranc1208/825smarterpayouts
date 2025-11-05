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
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function HeroSection() {
  return (
    <section
      aria-label="Review offer hero section"
      style={{
        background: COLORS.backgrounds.slateGradient,
        padding: `${SPACING.unit.xl} 0`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern (matching Main page) */}
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        background: "radial-gradient(circle at 20% 80%, rgba(5, 150, 105, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.06) 0%, transparent 50%)",
        pointerEvents: "none"
      }}></div>
      
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto',
        padding: SPACING.container.paddingX,
        position: 'relative',
        zIndex: 1,
        textAlign: 'center'
      }}>
        <h1
          id="hero-heading"
          style={{
            ...TEXT_PRESETS.heroTitle,
            color: COLORS.neutral.gray900,
            marginBottom: SPACING.stack.sm,
            background: COLORS.titleGradients.grayToGreen,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          Review Your Offer
        </h1>

        <p style={{
          fontSize: TYPOGRAPHY.fontSize.body.large,
          color: COLORS.text.secondary,
          maxWidth: '600px',
          margin: `0 auto ${SPACING.stack.lg}`,
          lineHeight: TYPOGRAPHY.lineHeight.relaxed
        }}>
          Get a quote without sharing personal info. Fully digital, secure, and confidential.
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
            href="/mint-intelligent-chat?chat=open&feature=calculator"
            variant="technology-secondary"
            size="lg"
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
}

