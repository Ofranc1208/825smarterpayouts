'use client';

import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';
import HeroCTA from '@/src/components/Pages/AboutUs/components/HeroSection/HeroCTA';

export default function HeroSection() {
  // CTA Buttons configuration (matching Main page pattern)
  const ctaButtons = [
    {
      id: "instant-offer",
      text: "💰 Get Your Instant Quote",
      href: "/pricing-calculator",
      variant: "technology-primary" as const,
      size: "xl" as const,
      enhancedHover: true
    },
    {
      id: "mint-ai",
      text: "💬 Chat with Mint AI",
      href: "/mint-intelligent-chat",
      variant: "mint-chat" as const,
      size: "xl" as const,
      enhancedHover: true
    }
  ];

  return (
    <section 
      aria-labelledby="hero-heading"
      style={{
        background: COLORS.backgrounds.slateGradient,
        padding: `${SPACING.unit.xxxxl} 0`,
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Pattern (matching Main page) */}
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        background: "radial-gradient(circle at 20% 80%, rgba(5, 150, 105, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.06) 0%, transparent 50%)",
        pointerEvents: "none"
      }}></div>
      
      {/* Content Container */}
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto',
        padding: SPACING.container.paddingX,
        position: 'relative',
        zIndex: 1,
        textAlign: 'center'
      }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: SPACING.inline.sm,
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
          border: `1px solid ${COLORS.borders.green}`,
          borderRadius: BORDER_RADIUS.large,
          padding: `${SPACING.unit.xxs} ${SPACING.unit.md}`,
          marginBottom: SPACING.unit.lg,
          fontSize: TYPOGRAPHY.fontSize.body.xsmall,
          fontWeight: TYPOGRAPHY.fontWeight.semibold,
          color: COLORS.primary.main,
          boxShadow: "0 2px 8px rgba(5, 150, 105, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7)",
          letterSpacing: TYPOGRAPHY.letterSpacing.wider,
          textTransform: "uppercase" as const
        }}>
          ⚡ INSTANT QUOTES
        </div>
        
        {/* Hero Heading */}
        <h1 
          id="hero-heading"
          style={{
            ...TEXT_PRESETS.heroTitle,
            color: COLORS.neutral.gray900,
            marginBottom: SPACING.stack.md,
            background: COLORS.titleGradients.grayToGreen,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          Get Your Free Settlement Quote
        </h1>
        
        {/* Subtitle */}
        <p style={{
          ...TEXT_PRESETS.heroSubtitle,
          color: COLORS.text.secondary,
          maxWidth: "700px",
          margin: `0 auto ${SPACING.stack.xl}`
        }}>
          Get a <strong style={{ color: COLORS.primary.dark }}>free, no-obligation cash offer</strong> in 60 seconds. No personal information, no credit checks, no pressure. Just instant, accurate quotes.
        </p>

        {/* CTA Buttons (using shared component) */}
        <div style={{ marginBottom: SPACING.stack.xl }}>
          <HeroCTA buttons={ctaButtons} align="center" layout="horizontal" />
        </div>

        {/* Benefits Footer */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: SPACING.inline.md,
          flexWrap: "wrap" as const,
          fontSize: TYPOGRAPHY.fontSize.body.small,
          color: COLORS.text.secondary,
          padding: `${SPACING.unit.md} ${SPACING.unit.lg}`,
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(10px)",
          borderRadius: BORDER_RADIUS.large,
          border: `1px solid ${COLORS.borders.light}`,
          maxWidth: "600px",
          margin: "0 auto",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: SPACING.inline.xs }}>
            ✅ No personal info required
          </span>
          <span style={{ color: COLORS.borders.medium }}>•</span>
          <span style={{ display: "flex", alignItems: "center", gap: SPACING.inline.xs }}>
            ⚡ 60 second results
          </span>
          <span style={{ color: COLORS.borders.medium }}>•</span>
          <span style={{ display: "flex", alignItems: "center", gap: SPACING.inline.xs }}>
            🚫 No pressure
          </span>
        </div>
      </div>
    </section>
  );
}
