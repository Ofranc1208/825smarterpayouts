/**
 * Google Rating Compliance Section
 * 
 * Displays compliance note about Google rating transparency
 */

'use client';

import React from 'react';
import { COLORS, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export function ComplianceSection() {
  return (
    <section style={{
      padding: `${SPACING.unit.xl} 0 ${SPACING.unit.xxl}`,
      background: COLORS.backgrounds.white,
      borderTop: `1px solid ${COLORS.neutral.gray200}`
    }}>
      <div style={{
        ...SPACING.container.styles,
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: `${SPACING.unit.lg} ${SPACING.unit.xl}`,
          background: COLORS.backgrounds.lightGray,
          borderRadius: BORDER_RADIUS.large,
          border: `1px solid ${COLORS.neutral.gray200}`
        }}>
          <p style={{
            ...TEXT_PRESETS.body,
            color: COLORS.text.secondary,
            fontSize: '0.875rem',
            lineHeight: '1.7',
            margin: 0,
            textAlign: 'center'
          }}>
            <strong style={{ color: COLORS.text.secondary }}>Transparency Note:</strong>{' '}
            Our rating on Google is based on user reviews and publicly available data. Ratings are subject to change and are displayed for informational purposes only.
          </p>
        </div>
      </div>
    </section>
  );
}

