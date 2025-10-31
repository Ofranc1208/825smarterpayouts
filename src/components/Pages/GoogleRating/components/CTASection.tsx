/**
 * Google Rating CTA Section
 * 
 * Final call-to-action section with multiple buttons
 */

'use client';

import React from 'react';
import HeroCTA from '@/src/components/Pages/AboutUs/components/HeroSection/HeroCTA';
import { COLORS, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';

export function CTASection() {
  return (
    <section style={{
      padding: `${SPACING.unit.xl} 0`,
      textAlign: 'center',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #ecfdf5 100%)',
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
        background: `radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
                     radial-gradient(circle at 80% 20%, rgba(255, 180, 0, 0.06) 0%, transparent 50%)`,
        pointerEvents: "none"
      }}></div>

      <div style={SPACING.container.styles}>
        <div style={{
          background: COLORS.backgrounds.white,
          borderRadius: BORDER_RADIUS.xxlarge,
          padding: `${SPACING.unit.xl} ${SPACING.unit.lg}`,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(5, 150, 105, 0.1)',
          border: `1px solid rgba(5, 150, 105, 0.15)`,
          maxWidth: "900px",
          margin: "0 auto",
          position: 'relative',
          zIndex: 1
        }}>
          {/* Title */}
          <h2 style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: SPACING.stack.sm,
            lineHeight: "1.3",
            color: COLORS.text.secondary
          }}>
            Experience the Same Trusted Service
          </h2>
          
          {/* Subtitle */}
          <p style={{
            fontSize: "1rem",
            color: COLORS.text.secondary,
            maxWidth: '650px',
            margin: `0 auto ${SPACING.stack.md}`,
            lineHeight: "1.7"
          }}>
            Ready to get started? Join the hundreds of happy users and find your settlement's true value now.
          </p>
          
          {/* CTA Buttons */}
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

          {/* Trust Badge */}
          <div style={{
            marginTop: SPACING.stack.md,
            padding: SPACING.card.compact,
            background: '#f0fdf4',
            borderRadius: BORDER_RADIUS.large,
            border: '1px solid #d1fae5',
            display: 'inline-block'
          }}>
            <p style={{
              margin: 0,
              fontSize: '0.875rem',
              fontWeight: '600',
              color: COLORS.primary.main,
              display: 'flex',
              alignItems: 'center',
              gap: SPACING.unit.xs
            }}>
              <span style={{ fontSize: '0.875rem', color: COLORS.primary.main }}>✓</span>
              <strong>100% Court-Approved & Compliant</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

