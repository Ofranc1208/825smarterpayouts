/**
 * FAQ Accordion Section
 * 
 * List of expandable FAQ items in a card container
 */

'use client';

import React from 'react';
import { FAQ } from '../types';
import { FaqAccordionItem } from './shared';
import { COLORS, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';

interface FaqAccordionSectionProps {
  faqs: FAQ[];
  openFaqs: number[];
  onToggle: (id: number) => void;
}

// Extracted style objects for better readability and maintainability
const styles = {
  section: {
    ...SPACING.container.styles,
    padding: `${SPACING.unit.xl} ${SPACING.unit.md}`
  } as React.CSSProperties,
  
  contentWrapper: {
    display: 'flex',
    justifyContent: 'center'
  } as React.CSSProperties,
  
  innerContainer: {
    maxWidth: '700px',
    width: '100%'
  } as React.CSSProperties,
  
  card: {
    background: COLORS.backgrounds.white,
    borderRadius: BORDER_RADIUS.large,
    padding: SPACING.unit.lg,
    boxShadow: BOX_SHADOWS.medium,
    border: `1px solid ${COLORS.neutral.gray200}`,
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.unit.sm
  } as React.CSSProperties,
} as const;

export function FaqAccordionSection({ faqs, openFaqs, onToggle }: FaqAccordionSectionProps) {
  return (
    <section style={styles.section}>
      <div style={styles.contentWrapper}>
        <div style={styles.innerContainer}>
          <div style={styles.card}>
            {faqs.map((faq) => (
              <FaqAccordionItem
                key={faq.id}
                faq={faq}
                isOpen={openFaqs.includes(faq.id)}
                onToggle={() => onToggle(faq.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


