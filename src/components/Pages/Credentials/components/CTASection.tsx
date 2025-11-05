/**
 * CTA Section Component - Credentials Page
 * 
 * Displays the final call-to-action with buttons.
 * Uses design system tokens and shared Button components.
 * Fully accessible with semantic HTML and proper ARIA labels.
 * 
 * @component
 * @returns {JSX.Element} Rendered CTA section with action buttons
 * 
 * @example
 * <CTASection />
 */

import Button from '@/src/components/shared/Button';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function CTASection() {
  return (
    <section 
      aria-label="Call to action section"
      style={{
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
              Ready to Get Started?
            </h2>
            <p style={{
              fontSize: TYPOGRAPHY.fontSize.body.medium,
              marginBottom: SPACING.stack.lg,
              color: COLORS.text.secondary,
              maxWidth: '600px',
              margin: `0 auto ${SPACING.stack.lg}`
            }}>
              Get your instant quote from a verified, trustworthy structured settlement company.
            </p>
            <div style={{
              display: "flex",
              gap: SPACING.inline.lg,
              justifyContent: "center",
              flexWrap: "wrap"
            }}>
              <Button
                as="a"
                href="/mint-chat-active?type=calculate&source=credentials-cta"
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
          </div>
        </div>
      </div>
    </section>
  );
}

