/**
 * Hero Section Component - Social Media Page
 * 
 * Displays the hero section with title, description, and CTA buttons.
 * Uses design system tokens for consistent styling.
 * 
 * @component
 * @returns {JSX.Element} Rendered hero section
 * 
 * @example
 * <HeroSection />
 */

import Button from '@/src/components/shared/Button';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';

export default function HeroSection() {
  return (
    <section style={{
      background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
      paddingTop: SPACING.unit.xxxxl,
      paddingBottom: SPACING.unit.xxxl,
      paddingLeft: SPACING.unit.md,
      paddingRight: SPACING.unit.md,
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: TYPOGRAPHY.fontSize.body.small,
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              color: COLORS.primary.main,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: SPACING.unit.md
            }}>
              Connect With Us
            </div>
            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: TYPOGRAPHY.fontWeight.bold,
              color: COLORS.text.primary,
              marginBottom: SPACING.stack.lg,
              lineHeight: TYPOGRAPHY.lineHeight.tight
            }}>
              Social Media
            </h1>
            <p style={{
              fontSize: TYPOGRAPHY.fontSize.body.large,
              color: COLORS.text.secondary,
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
              marginBottom: SPACING.stack.xl
            }}>
              Follow us on social media to stay up to date with the latest news, tips, and updates from SmarterPayouts. We love connecting with our community!
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
                💰 Get Your Instant Quote
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
          </div>
        </div>
      </div>
    </section>
  );
}

