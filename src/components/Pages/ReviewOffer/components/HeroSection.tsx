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
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: BORDER_RADIUS.xxlarge,
            padding: `${SPACING.unit.xxxl} ${SPACING.unit.xl}`,
            boxShadow: BOX_SHADOWS.large,
            border: `1px solid ${COLORS.borders.light}`,
            textAlign: 'center'
          }}>
            {/* Privacy Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: SPACING.inline.sm,
              background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
              padding: `${SPACING.unit.xs} ${SPACING.unit.lg}`,
              borderRadius: BORDER_RADIUS.small,
              marginBottom: SPACING.stack.lg,
              border: '1px solid #a7f3d0'
            }}>
              <span style={{ fontSize: TYPOGRAPHY.fontSize.heading.h5 }}>🔒</span>
              <span style={{ 
                color: COLORS.primary.main, 
                fontWeight: TYPOGRAPHY.fontWeight.semibold, 
                fontSize: TYPOGRAPHY.fontSize.body.small 
              }}>
                100% PRIVATE & SECURE
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: TYPOGRAPHY.fontWeight.bold,
              color: COLORS.text.primary,
              marginBottom: SPACING.stack.lg,
              lineHeight: TYPOGRAPHY.lineHeight.tight
            }}>
              Review Your Offer with Complete Privacy
            </h1>
            
            <p style={{
              fontSize: TYPOGRAPHY.fontSize.body.large,
              color: COLORS.text.secondary,
              maxWidth: '600px',
              margin: `0 auto ${SPACING.stack.xl}`,
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
              color: COLORS.text.secondary
            }}>
              ✅ No personal info required • 💻 100% digital • 🛡️ State compliant
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

