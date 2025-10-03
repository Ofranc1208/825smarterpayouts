'use client';

import HeroCTA from '@/src/components/Pages/AboutUs/components/HeroSection/HeroCTA';
import { HERO_CTA_BUTTONS } from '@/src/components/Pages/AboutUs/components/HeroSection/data';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function FinalCTA() {
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
          {/* Title */}
          <h2 style={{
            ...TEXT_PRESETS.sectionTitle,
            background: COLORS.titleGradients.grayToGreen,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: SPACING.stack.md
          }}>
            Ready to Get Your Free Quote?
          </h2>
          
          {/* Subtitle */}
          <p style={{
            ...TEXT_PRESETS.sectionSubtitle,
            color: COLORS.text.secondary,
            maxWidth: '650px',
            margin: `0 auto ${SPACING.stack.xxl}`
          }}>
            Get your instant quote today or chat with our AI assistant for personalized guidance. No personal information required to get started.
          </p>
          
          {/* CTA Buttons - Using Shared Component */}
          <div style={{ marginBottom: SPACING.stack.lg }}>
            <HeroCTA buttons={HERO_CTA_BUTTONS} align="center" layout="horizontal" />
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
              }}>⚡</span>
              <strong>Instant quotes in 60 seconds or less</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
