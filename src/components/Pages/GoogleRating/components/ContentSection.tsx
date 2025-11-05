/**
 * Google Rating Content Section
 * 
 * Simplified, layman-friendly content explaining the Google rating
 */

'use client';

import React from 'react';
import { COLORS, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export function ContentSection() {
  return (
    <section style={{
      padding: `${SPACING.unit.xl} 0`,
      background: COLORS.backgrounds.white
    }}>
      <div style={{
        ...SPACING.container.styles,
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {/* Key Differentiators - Skip the Sales Pitch */}
          <div style={{
            background: COLORS.backgrounds.white,
            borderRadius: BORDER_RADIUS.xxlarge,
            padding: `${SPACING.unit.xl} ${SPACING.unit.lg}`,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 180, 0, 0.1)',
            border: `2px solid rgba(255, 180, 0, 0.15)`,
            marginBottom: SPACING.stack.lg,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div>
              <h2 style={{
                ...TEXT_PRESETS.heroTitle,
                marginBottom: SPACING.stack.sm,
                color: COLORS.neutral.gray900,
                background: COLORS.titleGradients.grayToGreen,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                Why Our Rating Matters
              </h2>
              <p style={{
                ...TEXT_PRESETS.body,
                marginBottom: SPACING.stack.md,
                color: COLORS.text.secondary,
                lineHeight: '1.7',
                fontSize: '1rem'
              }}>
                Our high rating reflects our transparent, instant approach. No sales pressure, no hidden fees—just honest calculations.
              </p>
              
              {/* Comparison Section */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: SPACING.unit.md,
                marginTop: SPACING.stack.md
              }}>
                {/* Our Approach */}
                <div style={{
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
                  borderRadius: BORDER_RADIUS.large,
                  padding: SPACING.card.compact,
                  border: '2px solid rgba(34, 197, 94, 0.3)'
                }}>
                  <div style={{
                    fontSize: '1.25rem',
                    marginBottom: SPACING.unit.xs,
                    color: COLORS.primary.main
                  }}>✓</div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    marginBottom: SPACING.unit.xs,
                    color: COLORS.text.secondary
                  }}>
                    Our Approach
                  </h3>
                  <ul style={{
                    margin: 0,
                    paddingLeft: SPACING.unit.md,
                    fontSize: '0.875rem',
                    lineHeight: '1.7',
                    color: COLORS.text.secondary
                  }}>
                    <li>Instant AI-powered platform</li>
                    <li>No phone calls required</li>
                    <li>100% transparent pricing</li>
                    <li>No sales pressure</li>
                  </ul>
                </div>

                {/* Competitors' Approach */}
                <div style={{
                  background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                  borderRadius: BORDER_RADIUS.large,
                  padding: SPACING.card.compact,
                  border: '2px solid rgba(239, 68, 68, 0.2)'
                }}>
                  <div style={{
                    fontSize: '1.25rem',
                    marginBottom: SPACING.unit.xs,
                    color: '#ef4444'
                  }}>✗</div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    marginBottom: SPACING.unit.xs,
                    color: COLORS.text.secondary
                  }}>
                    Traditional Competitors
                  </h3>
                  <ul style={{
                    margin: 0,
                    paddingLeft: SPACING.unit.md,
                    fontSize: '0.875rem',
                    lineHeight: '1.7',
                    color: COLORS.text.secondary
                  }}>
                    <li>Lengthy phone-based processes</li>
                    <li>Pushy sales tactics</li>
                    <li>Hidden fees and rates</li>
                    <li>Pressure to commit quickly</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

          {/* Why Google Trusts Us - Simplified */}
          <div style={{
            background: COLORS.backgrounds.white,
            borderRadius: BORDER_RADIUS.xxlarge,
            padding: `${SPACING.unit.xl} ${SPACING.unit.lg}`,
            boxShadow: BOX_SHADOWS.medium,
            border: `1px solid ${COLORS.neutral.gray200}`,
            marginBottom: SPACING.stack.lg
          }}>
            <h2 style={{
              ...TEXT_PRESETS.heroTitle,
              marginBottom: SPACING.stack.sm,
              color: COLORS.neutral.gray900,
              background: COLORS.titleGradients.grayToGreen,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              What Our Rating Means
            </h2>
            <p style={{
              ...TEXT_PRESETS.body,
              marginBottom: SPACING.stack.md,
              color: COLORS.text.secondary,
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              Our rating reflects our commitment to transparency, security, and accuracy in structured settlement calculations.
            </p>
          </div>

          {/* What This Means for You - Simplified */}
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
            borderRadius: BORDER_RADIUS.xxlarge,
            padding: `${SPACING.unit.xl} ${SPACING.unit.lg}`,
            boxShadow: BOX_SHADOWS.medium,
            border: `1px solid ${COLORS.neutral.gray200}`,
            marginBottom: SPACING.stack.lg
          }}>
            <h2 style={{
              ...TEXT_PRESETS.heroTitle,
              marginBottom: SPACING.stack.sm,
              color: COLORS.neutral.gray900,
              background: COLORS.titleGradients.grayToGreen,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              What This Means for You
            </h2>
            <p style={{
              ...TEXT_PRESETS.body,
              marginBottom: SPACING.stack.md,
              color: COLORS.text.secondary,
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              Our rating reflects trusted service from a reputable company. You can count on accurate calculations, transparent pricing, and a modern, easy-to-use platform.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

