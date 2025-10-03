/**
 * Testimonial Quote Component
 * 
 * Reusable blockquote component with author attribution
 */

'use client';

import React from 'react';
import { COLORS, SPACING, TEXT_PRESETS } from '@/src/components/shared/styles';

interface TestimonialQuoteProps {
  quote: string;
  author: string;
  location: string;
}

// Extracted style objects for better readability and maintainability
const styles = {
  quote: {
    fontStyle: "italic",
    fontSize: "1.125rem",
    color: COLORS.neutral.gray600,
    margin: `${SPACING.unit.xl} 0`,
    padding: SPACING.unit.md,
    borderLeft: `4px solid ${COLORS.primary.main}`,
    background: COLORS.backgrounds.greenPale
  } as React.CSSProperties,
  
  footer: {
    marginTop: SPACING.unit.md,
    ...TEXT_PRESETS.caption,
    color: COLORS.text.secondary,
    fontWeight: "600",
    fontStyle: "normal"
  } as React.CSSProperties,
} as const;

export function TestimonialQuote({ quote, author, location }: TestimonialQuoteProps) {
  return (
    <blockquote style={styles.quote}>
      "{quote}"
      <footer style={styles.footer}>
        — {author}, {location}
      </footer>
    </blockquote>
  );
}


