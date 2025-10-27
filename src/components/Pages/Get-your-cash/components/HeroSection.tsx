/**
 * Hero Section - Get Your Cash Page
 * 
 * Main hero section with:
 * - Badge
 * - Title with gradient
 * - Subtitle
 * - CTA buttons (using HeroCTA)
 * - Benefits footer
 * - Matches GetAQuote page pattern EXACTLY
 */

'use client';

import React from 'react';
import HeroCTA from '@/src/components/Pages/AboutUs/components/HeroSection/HeroCTA';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function HeroSection() {
  // CTA Buttons configuration (matching GetAQuote pattern)
  const ctaButtons = [
    {
      id: "instant-offer",
      text: "Get Your Instant Offer",
      href: "/pricing-calculator",
      variant: "technology-primary" as const,
      size: "xl" as const,
      enhancedHover: true
    },
    {
      id: "mint-ai",
      text: "Ask Mint AI",
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
        padding: `${SPACING.unit.xl} 0`,
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Pattern (matching GetAQuote) */}
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
      
      {/* Content Container */}
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto',
        padding: SPACING.container.padding,
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
          Get Funded Your Way
        </h1>
        
        {/* Subtitle */}
        <p style={{
          ...TEXT_PRESETS.heroSubtitle,
          color: COLORS.text.secondary,
          maxWidth: "700px",
          margin: `0 auto ${SPACING.stack.lg}`
        }}>
          Choose how you want to receive your structured settlement funds. <strong style={{ color: COLORS.primary.dark }}>Fast, secure, and always on your terms.</strong>
        </p>

        {/* CTA Buttons (using shared component) */}
        <div style={{ marginBottom: SPACING.stack.lg }}>
          <HeroCTA buttons={ctaButtons} align="center" layout="horizontal" />
        </div>

      </div>
    </section>
  );
}
