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
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function HeroSection() {
  return (
    <section style={{
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
              Social Media
            </h1>
            <p style={{
              fontSize: TYPOGRAPHY.fontSize.body.medium,
              color: COLORS.text.secondary,
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
              marginBottom: SPACING.stack.lg
            }}>
              Connect with us for the latest updates, tips, and community discussions.
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
                href="/mint-chat-active?type=calculate&source=social-media-hero"
                variant="technology-primary"
                size="lg"
                enhancedHover={true}
                shimmer={true}
              >
                💰 Get Your Instant Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

