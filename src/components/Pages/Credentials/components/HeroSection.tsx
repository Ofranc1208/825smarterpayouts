/**
 * Hero Section Component - Credentials Page
 *
 * Displays the hero section with title, description, and CTA buttons.
 * Uses design system tokens for consistent styling and shared Button components.
 * Fully accessible with semantic HTML and proper ARIA labels.
 *
 * @component
 * @returns {JSX.Element} Rendered hero section with CTAs
 *
 * @example
 * <HeroSection />
 */

import Button from '@/src/components/shared/Button';
import { COLORS, TYPOGRAPHY, SPACING } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function HeroSection() {
  return (
    <section 
      aria-label="Credentials page hero section"
      style={{
      background: COLORS.backgrounds.slateGradient,
      paddingTop: SPACING.unit.xl,
      paddingBottom: SPACING.unit.xl,
      paddingLeft: SPACING.unit.md,
      paddingRight: SPACING.unit.md,
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
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            textAlign: 'center'
          }}>
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
              Our Credentials
            </h1>
            <p style={{
              fontSize: TYPOGRAPHY.fontSize.body.medium,
              color: COLORS.text.secondary,
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
              marginBottom: SPACING.stack.lg
            }}>
              Verified Florida corporation with full legal standing and SSL certification.
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
                href="/mint-chat-active?type=calculate&source=credentials-hero"
                variant="technology-primary"
                size="lg"
                enhancedHover={true}
                shimmer={true}
              >
                💰 Get Your Instant Quote
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
        </div>
      </div>
    </section>
  );
}

