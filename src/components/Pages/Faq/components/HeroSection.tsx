/**
 * FAQ Hero Section
 * 
 * Hero section with title, description, and primary CTA
 * Uses HeroCTA component for consistent button styling
 */

'use client';

import React from 'react';
import HeroCTA from '@/src/components/Pages/AboutUs/components/HeroSection/HeroCTA';
import { COLORS, SPACING } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export function HeroSection() {
  const ctaButtons = [
    {
      id: "instant-offer",
      text: "💰 Get Your Instant Offer",
      href: "/pricing-calculator",
      variant: "technology-primary" as const,
      size: "xl" as const,
      enhancedHover: true
    }
  ];

  return (
    <section style={{
      background: COLORS.backgrounds.slateGradient,
      padding: `${SPACING.unit.xxl} 0 ${SPACING.unit.xl}`,
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        ...SPACING.container.styles,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            textAlign: 'center'
          }}>
            <h1 style={{
              ...TEXT_PRESETS.heroTitle,
              color: COLORS.neutral.gray900,
              marginBottom: SPACING.unit.lg,
              lineHeight: "1.2",
              background: COLORS.titleGradients.grayToGreen,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Frequently Asked Questions
            </h1>
            <p style={{
              ...TEXT_PRESETS.bodyLarge,
              maxWidth: "600px",
              margin: `0 auto ${SPACING.unit.xl}`,
            }}>
              Everything you need to know about selling your structured settlement, the court approval process, and how to get your cash quickly and securely.
            </p>
            
            {/* CTA Buttons using HeroCTA component */}
            <div style={{ marginBottom: SPACING.unit.xl }}>
              <HeroCTA buttons={ctaButtons} align="center" layout="horizontal" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


