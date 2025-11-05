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
      href: "/mint-intelligent-chat?chat=open&feature=calculator",
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
        padding: `${SPACING.unit.xl} 0`,
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
        {/* Hero Heading */}
        <h1
          id="hero-heading"
          style={{
            ...TEXT_PRESETS.heroTitle,
            color: COLORS.neutral.gray900,
            marginBottom: SPACING.stack.sm,
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
          margin: `0 auto ${SPACING.stack.lg}`
        }}>
          <strong style={{ color: COLORS.primary.dark }}>Free cash offer in 60 seconds.</strong> No personal info required. No pressure.
        </p>

        {/* CTA Buttons (using shared component) */}
        <div style={{ marginBottom: SPACING.stack.lg }}>
          <HeroCTA buttons={ctaButtons} align="center" layout="horizontal" />
        </div>

      </div>
    </section>
  );
}
