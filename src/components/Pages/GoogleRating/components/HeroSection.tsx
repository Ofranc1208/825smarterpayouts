/**
 * Google Rating Hero Section
 * 
 * Modern hero section with vibrant yellow accent for 4.9 rating
 */

'use client';

import React from 'react';
import { GoogleRatingBadge } from './GoogleRatingBadge';
import HeroCTA from '@/src/components/Pages/AboutUs/components/HeroSection/HeroCTA';
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
      {/* Decorative background elements */}
      <div style={{
        position: "absolute",
        top: "-100px",
        right: "-100px",
        width: "400px",
        height: "400px",
        background: "radial-gradient(circle, rgba(255, 214, 0, 0.1) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none"
      }}></div>
      <div style={{
        position: "absolute",
        bottom: "-50px",
        left: "-50px",
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none"
      }}></div>

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
              ...TEXT_PRESETS.h1,
              marginBottom: SPACING.unit.sm,
              lineHeight: "1.3",
              color: COLORS.text.secondary,
              fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
              fontWeight: '700'
            }}>
              SmarterPayouts: 4.9★ Rating on Google
            </h1>
            <p style={{
              ...TEXT_PRESETS.bodyLarge,
              maxWidth: "700px",
              margin: `0 auto ${SPACING.unit.lg}`,
              color: COLORS.text.secondary,
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              fontWeight: '500',
              lineHeight: '1.6'
            }}>
              See Why Hundreds of Structured Settlement Owners Trust Our AI-Powered Calculator
            </p>
            
            {/* Custom Rating Badge Display */}
            <div style={{ 
              marginTop: SPACING.unit.lg,
              marginBottom: SPACING.unit.lg,
              display: 'flex',
              justifyContent: 'center'
            }}>
              <GoogleRatingBadge 
                rating="4.9"
                reviewCount="250"
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

