/**
 * FAQ Hero Section
 * 
 * Hero section with title, description, and primary CTA
 * Uses HeroCTA component for consistent button styling
 */

'use client';

import React from 'react';
import HeroCTA from '@/src/components/Pages/AboutUs/components/HeroSection/HeroCTA';
import MintBadge from '../../../../../app/components/MintBadge';
import { COLORS, SPACING, TEXT_PRESETS } from '@/src/components/shared/styles';

export function HeroSection() {
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
      text: "💬 Chat with Mint AI",
      href: "/mint-intelligent-chat",
      variant: "mint-chat" as const,
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
            <MintBadge variant="compact" style={{ marginBottom: SPACING.unit.xl }} />
            <div style={{
              ...TEXT_PRESETS.eyebrow,
              marginBottom: SPACING.unit.md
            }}>
              Get Your Answers
            </div>
            <h1 style={{
              ...TEXT_PRESETS.h1,
              marginBottom: SPACING.unit.lg,
              lineHeight: "1.2"
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


