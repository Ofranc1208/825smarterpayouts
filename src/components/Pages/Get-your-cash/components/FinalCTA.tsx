/**
 * Final CTA Section - Get Your Cash Page
 * 
 * White card on green background with:
 * - Title with gradient text
 * - Subtitle
 * - CTA buttons using HeroCTA
 * - Trust badge footer
 * - Matches GetAQuote page pattern EXACTLY
 */

'use client';

import React from 'react';
import HeroCTA from '@/src/components/Pages/AboutUs/components/HeroSection/HeroCTA';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function FinalCTA() {
  // CTA Buttons configuration (matching GetAQuote pattern)
  const ctaButtons = [
    {
      id: "instant-offer",
      text: "💰 Get Your Instant Offer",
      href: "/pricing-calculator",
      variant: "technology-primary" as const
    },
    {
      id: "mint-ai",
      text: "💬 Chat with Mint AI",
      href: "/mint-intelligent-chat",
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
            ...TEXT_PRESETS.sectionTitle,
            background: COLORS.titleGradients.grayToGreen,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: SPACING.stack.md
          }}>
            Ready to Get Your Cash Your Way?
          </h2>
          
          {/* Subtitle */}
          <p style={{
            ...TEXT_PRESETS.sectionSubtitle,
            color: COLORS.text.secondary,
            maxWidth: '650px',
            margin: `0 auto ${SPACING.stack.xxl}`
          }}>
            Get your instant offer now and choose exactly how you want to receive your funds. Fast, secure, and always on your terms.
          </p>
          
          {/* CTA Buttons - Using Shared HeroCTA Component */}
          <div style={{ marginBottom: SPACING.stack.lg }}>
            <HeroCTA buttons={ctaButtons} align="center" layout="horizontal" />
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
              <strong>Payment options in 24-72 hours or less</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

