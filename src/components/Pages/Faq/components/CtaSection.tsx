/**
 * CTA Section
 * 
 * Final call-to-action with white card on green background
 * Uses HeroCTA component for consistent button styling
 * Matches GetYourCash FinalCTA pattern
 */

'use client';

import React from 'react';
import HeroCTA from '@/src/components/Pages/AboutUs/components/HeroSection/HeroCTA';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export function CtaSection() {
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
            fontSize: "1.875rem",
            fontWeight: "700",
            background: COLORS.titleGradients.grayToGreen,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: SPACING.stack.md,
            lineHeight: "1.2"
          }}>
            Still Have Questions?
          </h2>
          
          {/* Subtitle */}
          <p style={{
            fontSize: "1rem",
            color: COLORS.text.secondary,
            maxWidth: '650px',
            margin: `0 auto ${SPACING.stack.xxl}`,
            lineHeight: "1.6"
          }}>
            Get your instant offer now or chat with Mint AI for 24/7 answers. We're here to help you understand every step of the process.
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
              }}>✅</span>
              <strong>100% Court-Approved & Compliant</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


