/**
 * Hero Section Component - Terms Page
 *
 * Displays the page title, description, legal badge, and CTA buttons.
 * Uses design system tokens for consistent styling and shared Button components.
 * Fully accessible with semantic HTML and proper ARIA labels.
 *
 * @component
 * @returns {JSX.Element} Rendered hero section with CTAs
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
      aria-label="Terms page hero section"
      style={{
        background: COLORS.backgrounds.slateGradient,
        paddingTop: SPACING.unit.md,
        paddingBottom: SPACING.unit.xxxl,
        paddingLeft: SPACING.unit.md,
        paddingRight: SPACING.unit.md,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: BORDER_RADIUS.xxlarge,
            padding: SPACING.card.comfortable,
            boxShadow: BOX_SHADOWS.large,
            border: `1px solid ${COLORS.borders.light}`,
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
              Terms and Conditions
            </h1>

            <p style={{
              fontSize: TYPOGRAPHY.fontSize.body.medium,
              color: COLORS.text.secondary,
              maxWidth: "600px",
              margin: `0 auto ${SPACING.stack.xl}`,
              lineHeight: TYPOGRAPHY.lineHeight.relaxed
            }}>
              Clear, fair, and user-focused policies for your peace of mind when using Smarter Payouts.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              gap: SPACING.inline.md,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: SPACING.stack.xl
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

            {/* Quick Nav */}
            <div style={{
              display: 'flex',
              gap: SPACING.inline.sm,
              justifyContent: 'center',
              flexWrap: 'wrap',
              fontSize: TYPOGRAPHY.fontSize.body.small,
              color: COLORS.primary.main
            }}>
              <span>Platform Services</span>
              <span>•</span>
              <span>User Rights</span>
              <span>•</span>
              <span>State Compliance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

