/**
 * Hero Section Component - State Laws Overview Page
 * 
 * Displays the main hero area with title, description, CTA buttons, and key statistics.
 * Uses design system tokens for consistent styling across the application.
 * 
 * @component
 * @returns {JSX.Element} Rendered hero section with title, CTAs, and stats grid
 * 
 * @example
 * <HeroSection />
 */

import Button from '@/src/components/shared/Button';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function HeroSection() {
  return (
    <section style={{
      background: COLORS.backgrounds.slateGradient,
      padding: `${SPACING.unit.md} 0 ${SPACING.unit.xxxl}`
    }}>
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto',
        padding: SPACING.container.padding
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h1 style={{
            ...TEXT_PRESETS.heroTitle,
            background: COLORS.titleGradients.grayToGreen,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: SPACING.stack.md,
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)'
          }}>
            State Laws Overview
          </h1>
          
          <p style={{
            fontSize: TYPOGRAPHY.fontSize.body.medium,
            color: COLORS.text.secondary,
            marginBottom: SPACING.stack.xl,
            lineHeight: TYPOGRAPHY.lineHeight.relaxed,
            maxWidth: "700px",
            margin: `0 auto ${SPACING.stack.xl}`
          }}>
            Structured settlement sales are legal across all 50+ states through our trusted affiliate partners. Each state has specific court requirements and approval processes.
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
              Get Your Instant Quote
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

