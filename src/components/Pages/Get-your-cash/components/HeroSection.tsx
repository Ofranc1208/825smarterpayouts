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
import { StatCard } from './shared';
import { statsData } from '../data';
import { SITE_STATS } from '../../../../../app/config/siteConfig';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function HeroSection() {
  // CTA Buttons configuration (matching GetAQuote pattern)
  const ctaButtons = [
    {
      id: "instant-offer",
      text: "💰 Get Your Instant Offer",
      href: "/pricing-calculator",
      variant: "technology-primary" as const,
      size: "xl" as const,
      enhancedHover: true
    },
    {
      id: "mint-ai",
      text: "💬 Ask Mint AI",
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
        padding: SPACING.section.hero,
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
        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: SPACING.inline.sm,
          background: COLORS.radialGradients.greenLight,
          border: `1px solid ${COLORS.borders.green}`,
          borderRadius: BORDER_RADIUS.large,
          padding: `${SPACING.inline.xs} ${SPACING.inline.md}`,
          marginBottom: SPACING.stack.lg,
          fontSize: TYPOGRAPHY.fontSize.body.xsmall,
          fontWeight: TYPOGRAPHY.fontWeight.semibold,
          color: COLORS.primary.main,
          boxShadow: BOX_SHADOWS.small,
          letterSpacing: '1px',
          textTransform: "uppercase" as const
        }}>
          💰 GET YOUR CASH
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
          Get Your Cash — Your Way
        </h1>
        
        {/* Subtitle */}
        <p style={{
          ...TEXT_PRESETS.heroSubtitle,
          color: COLORS.text.secondary,
          maxWidth: "700px",
          margin: `0 auto ${SPACING.stack.xl}`
        }}>
          Choose how you want to receive your structured settlement funds. <strong style={{ color: COLORS.primary.dark }}>Fast, secure, and always on your terms.</strong>
        </p>

        {/* CTA Buttons (using shared component) */}
        <div style={{ marginBottom: SPACING.stack.xl }}>
          <HeroCTA buttons={ctaButtons} align="center" layout="horizontal" />
        </div>

        {/* Quick Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: SPACING.inline.md,
          marginTop: SPACING.stack.lg,
          paddingTop: SPACING.stack.lg,
          borderTop: `1px solid ${COLORS.neutral.gray200}`,
          maxWidth: '600px',
          margin: `${SPACING.stack.xl} auto 0`
        }}>
          {statsData.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* Compliance Badge */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: SPACING.stack.xl
        }}>
          <a href={SITE_STATS.compliance.link} style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: SPACING.inline.sm,
              background: COLORS.radialGradients.greenLight,
              border: `1px solid ${COLORS.borders.green}`,
              borderRadius: BORDER_RADIUS.xxlarge,
              padding: `${SPACING.inline.md} ${SPACING.inline.xl}`,
              fontSize: TYPOGRAPHY.fontSize.body.default,
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              color: COLORS.primary.dark,
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              boxShadow: BOX_SHADOWS.small
            }}
            title={SITE_STATS.compliance.description}>
              <span style={{ fontSize: TYPOGRAPHY.fontSize.heading.h5 }}>✅</span>
              <span>{SITE_STATS.compliance.value} State & Federal Compliant</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
