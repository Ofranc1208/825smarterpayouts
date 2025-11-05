/**
 * Trust Section
 * 
 * Compliance messaging with testimonial quote
 */

'use client';

import React from 'react';
import { TestimonialQuote } from './shared';
import { COLORS, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

// Extracted style objects for better readability and maintainability
const styles = {
  section: {
    background: COLORS.neutral.gray50,
    padding: `${SPACING.unit.xxl} 0`
  } as React.CSSProperties,
  
  contentWrapper: {
    display: 'flex',
    justifyContent: 'center'
  } as React.CSSProperties,
  
  innerContainer: {
    maxWidth: '800px',
    textAlign: 'center',
    width: '100%'
  } as React.CSSProperties,
  
  card: {
    background: COLORS.backgrounds.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: `${SPACING.unit.xl} ${SPACING.unit.lg}`,
    boxShadow: BOX_SHADOWS.md
  } as React.CSSProperties,
  
  iconBadge: {
    width: "64px",
    height: "64px",
    background: COLORS.primary.gradient,
    borderRadius: BORDER_RADIUS.full,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: `0 auto ${SPACING.unit.lg}`,
    color: COLORS.text.white,
    fontSize: "1.5rem",
    fontWeight: "bold"
  } as React.CSSProperties,
  
  heading: {
    ...TEXT_PRESETS.heroTitle,
    fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
    color: COLORS.neutral.gray900,
    marginBottom: SPACING.unit.md,
    lineHeight: "1.3",
    background: COLORS.titleGradients.grayToGreen,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  } as React.CSSProperties,
  
  description: {
    ...TEXT_PRESETS.bodyLarge,
    marginBottom: SPACING.unit.xl
  } as React.CSSProperties,
} as const;

export function TrustSection() {
  return (
    <section style={styles.section}>
      <div style={{
        ...SPACING.container.styles,
      }}>
        <div style={styles.contentWrapper}>
          <div style={styles.innerContainer}>
            <div style={styles.card}>
              <div style={styles.iconBadge}>
                🛡️
              </div>
              <h2 style={styles.heading}>
                Smarter Payouts is 100% Compliant
              </h2>
              <p style={styles.description}>
                Secure, court-approved, and built for your peace of mind.
              </p>
              <TestimonialQuote
                quote="The FAQ made everything clear. I felt confident and informed every step of the way!"
                author="L. Carter"
                location="New York"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


