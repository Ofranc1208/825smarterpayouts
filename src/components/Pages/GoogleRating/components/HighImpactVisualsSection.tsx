/**
 * High-Impact Visuals Section
 * 
 * Displays Google rating information and explains how ratings work
 */

'use client';

import React from 'react';
import { COLORS, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export function HighImpactVisualsSection() {

  return (
    <section style={{
      padding: `${SPACING.unit.xl} 0`,
      background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
      borderTop: `1px solid ${COLORS.neutral.gray200}`
    }}>
      <div style={{
        ...SPACING.container.styles,
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: SPACING.stack.xl
          }}>
            <h2 style={{
              ...TEXT_PRESETS.h2,
              color: COLORS.text.secondary,
              fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
              fontWeight: '700',
              marginBottom: SPACING.unit.sm
            }}>
              Google Rating
            </h2>
            <p style={{
              ...TEXT_PRESETS.body,
              color: COLORS.text.tertiary,
              fontSize: '1rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Our rating on Google is based on user reviews. Ratings are subject to change and reflect publicly available data on Google.
            </p>
          </div>

          {/* Rating Information */}
          <div style={{
            background: COLORS.backgrounds.white,
            borderRadius: BORDER_RADIUS.xxlarge,
            padding: SPACING.unit.xl,
            boxShadow: BOX_SHADOWS.medium,
            border: `1px solid ${COLORS.neutral.gray200}`,
            marginBottom: SPACING.stack.lg
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: COLORS.text.secondary,
              marginBottom: SPACING.stack.md,
              textAlign: 'center'
            }}>
              Understanding Google Ratings
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: SPACING.unit.md
            }}>
              <div style={{
                padding: SPACING.unit.md,
                background: '#f9fafb',
                borderRadius: BORDER_RADIUS.large,
                border: `1px solid ${COLORS.neutral.gray200}`
              }}>
                <p style={{
                  margin: 0,
                  fontSize: '0.9375rem',
                  color: COLORS.text.secondary,
                  lineHeight: '1.6'
                }}>
                  <strong>Ratings are based on user feedback.</strong> Our rating reflects reviews from users who have used our structured settlement calculator and services.
                </p>
              </div>
              
              <div style={{
                padding: SPACING.unit.md,
                background: '#f9fafb',
                borderRadius: BORDER_RADIUS.large,
                border: `1px solid ${COLORS.neutral.gray200}`
              }}>
                <p style={{
                  margin: 0,
                  fontSize: '0.9375rem',
                  color: COLORS.text.secondary,
                  lineHeight: '1.6'
                }}>
                  <strong>Ratings can change.</strong> As new reviews are added, the overall rating may increase or decrease over time.
                </p>
              </div>
              
              <div style={{
                padding: SPACING.unit.md,
                background: '#f9fafb',
                borderRadius: BORDER_RADIUS.large,
                border: `1px solid ${COLORS.neutral.gray200}`
              }}>
                <p style={{
                  margin: 0,
                  fontSize: '0.9375rem',
                  color: COLORS.text.secondary,
                  lineHeight: '1.6'
                }}>
                  <strong>Publicly available data.</strong> This information is displayed based on publicly available data on Google and is provided for informational purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

