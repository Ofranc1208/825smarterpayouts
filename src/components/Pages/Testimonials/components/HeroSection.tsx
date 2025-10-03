/**
 * Hero Section - Testimonials Page
 * 
 * Displays the main hero section with:
 * - Page title and subtitle
 * - Overall rating display
 * - CTA buttons using shared HeroCTA component
 * - Gradient background
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
      background: COLORS.backgrounds.slateGradient,
      padding: SPACING.section.hero,
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto',
        padding: SPACING.container.padding
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            textAlign: 'center'
          }}>
            {/* Badge */}
            <div style={{
              fontSize: TYPOGRAPHY.fontSize.body.small,
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              color: COLORS.primary.dark,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: SPACING.stack.sm
            }}>
              Client Success Stories
            </div>

            {/* Title */}
            <h1 style={{
              ...TEXT_PRESETS.heroTitle,
              color: COLORS.neutral.gray900,
              marginBottom: SPACING.stack.md,
              background: COLORS.titleGradients.grayToGreen,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              What Our Clients Are Saying
            </h1>

            {/* Subtitle */}
            <p style={{
              ...TEXT_PRESETS.heroSubtitle,
              color: COLORS.text.secondary,
              maxWidth: "700px",
              margin: `0 auto ${SPACING.stack.lg}`
            }}>
              Real feedback from real people. Discover why clients trust SmarterPayouts for a <strong style={{ color: COLORS.primary.dark }}>transparent, no-pressure experience</strong>.
            </p>

            {/* Rating Display */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: SPACING.inline.md,
              marginBottom: SPACING.stack.xl
            }}>
              <StarRating rating={5} size="large" />
              <span style={{ 
                color: COLORS.text.secondary, 
                fontWeight: TYPOGRAPHY.fontWeight.semibold,
                fontSize: TYPOGRAPHY.fontSize.body.large
              }}>
                4.9/5 from 400+ clients
              </span>
            </div>

            {/* CTA Buttons */}
            <div style={{ marginBottom: SPACING.stack.xl }}>
              <HeroCTA buttons={ctaButtons} align="center" layout="horizontal" />
            </div>

            {/* Trust Indicators / Social Proof */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: SPACING.inline.xl,
              flexWrap: 'wrap',
              marginTop: SPACING.stack.xl,
              paddingTop: SPACING.stack.lg,
              borderTop: `1px solid ${COLORS.neutral.gray200}`
            }}>
              {/* Total Reviews */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: TYPOGRAPHY.fontSize.heading.h3,
                  fontWeight: TYPOGRAPHY.fontWeight.bold,
                  color: COLORS.primary.dark,
                  marginBottom: SPACING.stack.xs
                }}>
                  400+
                </div>
                <div style={{
                  fontSize: TYPOGRAPHY.fontSize.body.small,
                  color: COLORS.text.tertiary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: TYPOGRAPHY.fontWeight.medium
                }}>
                  Happy Clients
                </div>
              </div>

              {/* Average Rating */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: TYPOGRAPHY.fontSize.heading.h3,
                  fontWeight: TYPOGRAPHY.fontWeight.bold,
                  color: COLORS.primary.dark,
                  marginBottom: SPACING.stack.xs
                }}>
                  4.9/5
                </div>
                <div style={{
                  fontSize: TYPOGRAPHY.fontSize.body.small,
                  color: COLORS.text.tertiary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: TYPOGRAPHY.fontWeight.medium
                }}>
                  Average Rating
                </div>
              </div>

              {/* Court Approved */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: TYPOGRAPHY.fontSize.heading.h3,
                  fontWeight: TYPOGRAPHY.fontWeight.bold,
                  color: COLORS.primary.dark,
                  marginBottom: SPACING.stack.xs
                }}>
                  100%
                </div>
                <div style={{
                  fontSize: TYPOGRAPHY.fontSize.body.small,
                  color: COLORS.text.tertiary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: TYPOGRAPHY.fontWeight.medium
                }}>
                  Court Approved
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

