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

export default function HeroSection() {
  return (
    <section
      aria-label="Terms page hero section"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)',
        paddingTop: SPACING.unit.xxxl,
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
            {/* Legal Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: SPACING.inline.sm,
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              paddingTop: SPACING.unit.xs,
              paddingBottom: SPACING.unit.xs,
              paddingLeft: SPACING.unit.xl,
              paddingRight: SPACING.unit.xl,
              borderRadius: BORDER_RADIUS.small,
              marginBottom: SPACING.stack.lg,
              border: '1px solid #fbbf24'
            }}>
              <span style={{ fontSize: TYPOGRAPHY.fontSize.heading.h5 }}>📋</span>
              <span style={{
                color: COLORS.accent.goldDarker,
                fontWeight: TYPOGRAPHY.fontWeight.semibold,
                fontSize: TYPOGRAPHY.fontSize.body.small
              }}>
                LEGAL TERMS
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: TYPOGRAPHY.fontWeight.bold,
              color: COLORS.text.primary,
              marginBottom: SPACING.stack.md,
              lineHeight: TYPOGRAPHY.lineHeight.tight
            }}>
              Terms and Conditions
            </h1>

            <p style={{
              fontSize: TYPOGRAPHY.fontSize.body.large,
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
                💰 Get Your Quote
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
                💬 Ask Mint AI
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
              <span>📍 Platform Services</span>
              <span>•</span>
              <span>🔒 User Rights</span>
              <span>•</span>
              <span>⚖️ State Compliance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

