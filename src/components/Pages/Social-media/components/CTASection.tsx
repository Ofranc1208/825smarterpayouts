/**
 * CTA Section Component - Social Media Page
 * 
 * Displays the final call-to-action with buttons.
 * Uses design system tokens and shared Button components.
 * 
 * @component
 * @returns {JSX.Element} Rendered CTA section with action buttons
 * 
 * @example
 * <CTASection />
 */

'use client';
import Button from '@/src/components/shared/Button';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function CTASection() {
  return (
    <section style={{
      width: '100%',
      maxWidth: SPACING.container.maxWidth,
      margin: '0 auto',
      paddingTop: SPACING.unit.xl,
      paddingBottom: SPACING.unit.xl,
      paddingLeft: SPACING.unit.md,
      paddingRight: SPACING.unit.md,
      background: COLORS.backgrounds.white
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          textAlign: 'center',
          width: '100%'
        }}>
          <div style={{
            background: COLORS.backgrounds.white,
            borderRadius: BORDER_RADIUS.large,
            padding: `${SPACING.unit.xl} ${SPACING.card.standard}`,
            border: `1px solid ${COLORS.neutral.gray200}`,
            boxShadow: BOX_SHADOWS.medium
          }}>
            <h2 style={{
              ...TEXT_PRESETS.heroTitle,
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              marginBottom: SPACING.stack.md,
              color: COLORS.neutral.gray900,
              background: COLORS.titleGradients.grayToGreen,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Ready to Connect?
            </h2>
            <p style={{
              fontSize: TYPOGRAPHY.fontSize.body.medium,
              marginBottom: SPACING.stack.lg,
              color: COLORS.text.secondary,
              maxWidth: '600px',
              margin: `0 auto ${SPACING.stack.lg}`
            }}>
              Get your instant quote or chat with Mint AI for 24/7 assistance.
            </p>
            <div style={{
              display: "flex",
              gap: SPACING.inline.lg,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: SPACING.stack.md
            }}>
              <Button
                as="a"
                href="/mint-intelligent-chat?chat=open&feature=calculator"
                variant="technology-secondary"
                size="xl"
                enhancedHover={true}
                shimmer={true}
                shimmerDelay={1}
              >
                💬 Chat with Mint AI
              </Button>
              
              <Button
                as="a"
                href="/pricing-calculator"
                variant="technology-primary"
                size="xl"
                enhancedHover={true}
                shimmer={true}
              >
                💰 Get Your Quote
              </Button>
              
              <Button
                as="a"
                href="/contact"
                variant="outline"
                size="xl"
                enhancedHover={true}
              >
                📞 Contact Us
              </Button>
            </div>
            
            <div style={{
              padding: `${SPACING.unit.sm} ${SPACING.unit.lg}`,
              background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
              border: `1px solid ${COLORS.borders.light}`,
              borderRadius: BORDER_RADIUS.small,
              display: 'inline-block'
            }}>
              <span style={{
                fontSize: TYPOGRAPHY.fontSize.body.small,
                color: COLORS.text.secondary,
                fontWeight: TYPOGRAPHY.fontWeight.medium
              }}>
                ✨ Connect with thousands of satisfied clients
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
