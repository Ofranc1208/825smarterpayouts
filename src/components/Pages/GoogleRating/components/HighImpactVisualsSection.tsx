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
              ...TEXT_PRESETS.heroTitle,
              color: COLORS.neutral.gray900,
              marginBottom: SPACING.unit.sm,
              background: COLORS.titleGradients.grayToGreen,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Google Rating
            </h2>
            <p style={{
              ...TEXT_PRESETS.body,
              color: COLORS.text.secondary,
              fontSize: '1rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Based on user reviews and publicly available data.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

