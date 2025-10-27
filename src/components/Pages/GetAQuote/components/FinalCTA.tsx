'use client';

import HeroCTA from '@/src/components/Pages/AboutUs/components/HeroSection/HeroCTA';
import { HERO_CTA_BUTTONS } from '@/src/components/Pages/AboutUs/components/HeroSection/data';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function FinalCTA() {
  return (
    <section style={{
      padding: `${SPACING.unit.lg} 0`,
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
            margin: `0 auto ${SPACING.stack.xl}`
          }}>
            Get your instant quote today or chat with our AI assistant for personalized guidance. <strong>No personal information required</strong> to get started.
          </p>
          
          {/* CTA Buttons - Using Shared Component */}
          <div style={{ marginBottom: SPACING.stack.md }}>
            <HeroCTA buttons={HERO_CTA_BUTTONS} align="center" layout="horizontal" />
          </div>
          
        </div>
      </div>
    </section>
  );
}
