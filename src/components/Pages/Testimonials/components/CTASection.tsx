/**
 * CTA Section - Testimonials Page
 * 
 * Final call-to-action section with:
 * - Professional white card design
 * - Gradient text title
 * - Two CTA buttons using shared HeroCTA component
 * - Trust badge at bottom
 * - Matches GetAQuote page pattern
 */

'use client';

import HeroCTA from '@/src/components/Pages/AboutUs/components/HeroSection/HeroCTA';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function CTASection() {
  // CTA Buttons configuration (matching GetAQuote page pattern exactly)
  const ctaButtons = [
    {
      id: "instant-offer",
      text: "Get Your Instant Quote",
      href: "/pricing-calculator",
      variant: "technology-primary" as const
    },
    {
      id: "mint-ai",
      text: "Chat with Mint AI",
      href: "/mint-intelligent-chat?chat=open&feature=calculator",
      variant: "mint-chat" as const
    }
  ];

  return (
    <section style={{
      padding: SPACING.section.standard,
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
          padding: SPACING.card.standard,
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
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            color: COLORS.neutral.gray900,
            marginBottom: SPACING.stack.md,
            background: COLORS.titleGradients.grayToGreen,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center'
          }}>
            Ready to Experience the Difference?
          </h2>
          
          {/* Subtitle */}
          <p style={{
            fontSize: TYPOGRAPHY.fontSize.body.medium,
            color: COLORS.text.secondary,
            maxWidth: '600px',
            margin: `0 auto ${SPACING.stack.lg}`,
            lineHeight: TYPOGRAPHY.lineHeight.relaxed
          }}>
            Join hundreds of satisfied clients who chose transparency and simplicity. Get your instant quote or reach out to our team today.
          </p>
          
          {/* CTA Buttons - Using Shared HeroCTA Component */}
          <div style={{ marginBottom: SPACING.stack.lg }}>
            <HeroCTA buttons={ctaButtons} align="center" layout="horizontal" />
          </div>
          
          {/* Trust Badge Footer */}
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
              <strong>Trusted by 400+ satisfied clients</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

