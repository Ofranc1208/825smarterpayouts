/**
 * Hero Section - Testimonials Page (Clean Design)
 *
 * Displays a clean, modern hero section with:
 * - Direct title without badges for cleaner look
 * - Large gradient title with enhanced typography
 * - Enhanced rating display with integrated stats
 * - Modern CTA buttons with improved spacing
 * - Subtle background decorative elements
 * - Glassmorphism rating card with backdrop blur effects
 */

'use client';

import React from 'react';
import StarRating from './shared/StarRating';
import HeroCTA from '@/src/components/Pages/AboutUs/components/HeroSection/HeroCTA';
import { COLORS, TYPOGRAPHY, SPACING } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function HeroSection() {
  // CTA Buttons configuration (matching GetAQuote pattern exactly)
  const ctaButtons = [
    {
      id: "instant-offer",
      text: "💰 Get Your Instant Quote",
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
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      padding: `${SPACING.unit.xxxxl} 0`,
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '30%',
        right: '15%',
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto',
        padding: SPACING.container.padding,
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
            {/* Modern Title */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: TYPOGRAPHY.fontWeight.bold,
              background: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #22c55e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: SPACING.stack.lg,
              lineHeight: TYPOGRAPHY.lineHeight.tight,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Real Client Experiences
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: TYPOGRAPHY.fontSize.body.xlarge,
              color: COLORS.text.secondary,
              maxWidth: "800px",
              margin: `0 auto ${SPACING.stack.xl}`,
              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
              fontWeight: TYPOGRAPHY.fontWeight.medium
            }}>
              These testimonials were shared directly with us by clients who experienced our <strong style={{ color: '#22c55e' }}>transparent settlement process</strong>. Every story reflects genuine experiences from people who trusted us with their financial needs.
            </p>

            {/* Enhanced Rating Display - 40% Smaller */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: SPACING.inline.md,
              marginBottom: SPACING.stack.lg,
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              padding: `${SPACING.unit.md} ${SPACING.unit.lg}`,
              borderRadius: '1.5rem',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.08)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <StarRating rating={5} size="medium" />
                <div style={{
                  color: COLORS.text.primary,
                  fontWeight: TYPOGRAPHY.fontWeight.bold,
                  fontSize: TYPOGRAPHY.fontSize.body.medium,
                  marginTop: SPACING.stack.xs
                }}>
                  4.9/5
                </div>
              </div>
              <div style={{
                width: '1px',
                height: '2rem',
                background: 'linear-gradient(to bottom, transparent, #22c55e, transparent)'
              }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: TYPOGRAPHY.fontSize.heading.h4,
                  fontWeight: TYPOGRAPHY.fontWeight.bold,
                  color: '#22c55e',
                  lineHeight: 1
                }}>
                  400+
                </div>
                <div style={{
                  color: COLORS.text.secondary,
                  fontSize: '0.7rem',
                  fontWeight: TYPOGRAPHY.fontWeight.medium,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Happy Clients
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ marginTop: SPACING.stack.lg }}>
              <HeroCTA buttons={ctaButtons} align="center" layout="horizontal" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

