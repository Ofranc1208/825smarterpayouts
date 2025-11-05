/**
 * Google Rating Hero Section
 * 
 * Modern hero section with vibrant yellow accent for 4.9 rating
 */

'use client';

import React from 'react';
import HeroCTA from '@/src/components/Pages/AboutUs/components/HeroSection/HeroCTA';
import LightTrustBadge from './LightTrustBadge';
import { COLORS, SPACING } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export function HeroSection() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #ecfdf5 100%)',
      padding: `${SPACING.unit.xl} 0`,
      position: "relative",
      overflow: "hidden"
    }}>

      <div style={{
        ...SPACING.container.styles,
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: '900px',
            textAlign: 'center'
          }}>
            <h1 style={{
              ...TEXT_PRESETS.heroTitle,
              marginBottom: SPACING.unit.sm,
              lineHeight: "1.3",
              color: COLORS.neutral.gray900,
              background: COLORS.titleGradients.grayToGreen,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Our Rating on Google
            </h1>
            <p style={{
              ...TEXT_PRESETS.bodyLarge,
              maxWidth: "700px",
              margin: `0 auto ${SPACING.unit.lg}`,
              color: COLORS.text.secondary,
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              fontWeight: '400',
              lineHeight: '1.6'
            }}>
              Our 4.9★ rating reflects user reviews and publicly available data on Google.
            </p>
            
            {/* Rating Badge Display */}
            <div style={{ 
              marginTop: SPACING.unit.lg,
              marginBottom: SPACING.unit.lg,
              display: 'flex',
              justifyContent: 'center'
            }}>
              <LightTrustBadge 
                rating="4.9"
                reviewCount="250"
                category="Finance"
                alignment="center"
              />
            </div>

            {/* CTA Buttons */}
            <div style={{
              marginTop: SPACING.unit.xl
            }}>
              <HeroCTA 
                buttons={[
                  {
                    id: "calculator",
                    text: "Early Payout Calculator",
                    href: "/main",
                    variant: "technology-primary" as const
                  },
                  {
                    id: "process",
                    text: "How Our Process Works",
                    href: "/get-a-quote",
                    variant: "technology-secondary" as const
                  }
                ]} 
                align="center" 
                layout="horizontal" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

