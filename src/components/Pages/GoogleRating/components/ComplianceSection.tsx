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
            This page displays our current rating on Google. Ratings are based on user reviews and are subject to change. SmarterPayouts does not claim endorsement or partnership with Google. This information reflects publicly available data on Google and is provided for informational purposes only. We do not modify or influence how our rating appears on Google.
          </p>
        </div>
      </div>
    </section>
  );
}

