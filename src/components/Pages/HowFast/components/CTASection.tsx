'use client';

/**
 * CTA Section Component - How Fast Page
 * 
 * Displays final call-to-action with white card on green background.
 * Matches the GetAQuote/Get Your Cash pattern exactly.
 * Uses design system tokens and HeroCTA component.
 * 
 * @component
 * @returns {JSX.Element} Rendered CTA section with action buttons
 * 
 * @example
 * <CTASection />
 */

import Button from '@/src/components/shared/Button/Button';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function CTASection() {

  return (
    <section style={{
      paddingTop: SPACING.unit.lg,
      paddingBottom: SPACING.unit.lg,
      paddingLeft: SPACING.unit.md,
      paddingRight: SPACING.unit.md,
      textAlign: 'center',
      background: COLORS.backgrounds.greenLight,
      borderTop: `1px solid ${COLORS.neutral.gray200}`,
      overflow: "hidden",
      position: 'relative'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        background: `${COLORS.radialGradients.greenLight}, ${COLORS.radialGradients.greenLighter}`,
        backgroundPosition: "20% 80%, 80% 20%",
        backgroundSize: "50% 50%",
        backgroundRepeat: "no-repeat",
        pointerEvents: "none"
      }}></div>

      <div style={SPACING.container.styles}>
        <div style={{
          background: COLORS.backgrounds.white,
          borderRadius: BORDER_RADIUS.xxlarge,
          padding: SPACING.card.compact,
          boxShadow: BOX_SHADOWS.large,
          border: `1px solid ${COLORS.neutral.gray200}`,
          maxWidth: "800px",
          margin: "0 auto",
          position: 'relative',
          zIndex: 1
        }}>
          {/* Title with Gradient */}
          <h2 style={{
            ...TEXT_PRESETS.heroTitle,
            color: COLORS.neutral.gray900,
            marginBottom: SPACING.stack.sm,
            background: COLORS.titleGradients.grayToGreen,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Ready to Get Started?
          </h2>
          
          {/* Subtitle */}
          <p style={{
            ...TEXT_PRESETS.sectionSubtitle,
            color: COLORS.text.secondary,
            maxWidth: '650px',
            margin: `0 auto ${SPACING.stack.xl}`
          }}>
            Get your instant quote now and see exactly when you could have cash in hand. Ask Mint AI for personalized timing estimates!
          </p>
          
          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: SPACING.inline.md,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: SPACING.stack.md
          }}>
            <Button
              as="a"
              href="/mint-chat-active?type=calculate&source=how-fast-cta"
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
          
          {/* Footer Badge */}
          <div style={{
            background: COLORS.backgrounds.greenLight,
            borderRadius: BORDER_RADIUS.medium,
            padding: SPACING.card.compact,
            border: `1px solid ${COLORS.borders.green}`,
            maxWidth: "500px",
            margin: "0 auto"
          }}>
            <p style={{
              margin: "0",
              fontSize: TYPOGRAPHY.fontSize.body.medium,
              fontWeight: TYPOGRAPHY.fontWeight.medium,
              color: COLORS.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: SPACING.inline.sm
            }}>
              <span style={{
                fontSize: TYPOGRAPHY.fontSize.heading.h5,
                width: "24px",
                height: "24px",
                background: COLORS.primary.gradient,
                borderRadius: BORDER_RADIUS.circle,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: COLORS.text.white
              }}>✓</span>
              <strong>Get funds in 24-72 hours after approval</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
