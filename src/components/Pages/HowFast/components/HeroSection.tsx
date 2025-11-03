/**
 * Hero Section Component - How Fast Page
 * 
 * Displays the page title, description, and CTA buttons.
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
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';

export default function HeroSection() {
  return (
    <section
      aria-label="How fast page hero section"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)',
        paddingTop: SPACING.unit.xl,
        paddingBottom: SPACING.unit.xl,
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
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: TYPOGRAPHY.fontWeight.bold,
              color: COLORS.text.primary,
              marginBottom: SPACING.stack.md,
              lineHeight: TYPOGRAPHY.lineHeight.tight
            }}>
              How Fast Can I Get My Money?
            </h1>
            <p style={{
              fontSize: TYPOGRAPHY.fontSize.body.large,
              color: COLORS.text.secondary,
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
              marginBottom: SPACING.stack.lg
            }}>
              Complete timeline guide for structured settlement payouts. Most clients receive funds in <strong>24-72 hours</strong> after court approval.
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
                href="/mint-chat-active?type=calculate&source=how-fast-hero"
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
      </div>
    </section>
  );
}
