/**
 * FAQ Item Component
 * 
 * Accordion-style FAQ component using HTML <details> element
 */

'use client';

import React from 'react';
import { FAQ } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';

interface FAQItemProps {
  faq: FAQ;
}

export default function FAQItem({ faq }: FAQItemProps) {
  return (
    <details style={{
      background: COLORS.backgrounds.white,
      borderRadius: BORDER_RADIUS.medium,
      border: `1px solid ${COLORS.borders.green}`,
      padding: SPACING.card.compact,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: BOX_SHADOWS.small
    }}>
      <summary style={{
        fontWeight: TYPOGRAPHY.fontWeight.semibold,
        color: COLORS.primary.dark,
        cursor: 'pointer',
        fontSize: TYPOGRAPHY.fontSize.body.default,
        lineHeight: TYPOGRAPHY.lineHeight.relaxed,
        outline: 'none',
        listStyle: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span>{faq.question}</span>
      </summary>
      <div style={{
        marginTop: SPACING.stack.md,
        paddingTop: SPACING.stack.sm,
        borderTop: `1px solid ${COLORS.neutral.gray200}`,
        color: COLORS.text.secondary,
        lineHeight: TYPOGRAPHY.lineHeight.relaxed,
        fontSize: TYPOGRAPHY.fontSize.body.default
      }}>
        {faq.answer}
      </div>
    </details>
  );
}

