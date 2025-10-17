/**
 * FAQ Accordion Item Component
 * 
 * Individual expandable/collapsible FAQ item with animated toggle
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { FAQ } from '../../types';
import { COLORS, SPACING, BORDER_RADIUS, TEXT_PRESETS, TYPOGRAPHY } from '@/src/components/shared/styles';

interface FaqAccordionItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

// Extracted style objects for better readability and maintainability
const styles = {
  container: {
    borderBottom: `1px solid ${COLORS.neutral.gray200}`,
    marginBottom: SPACING.unit.md
  } as React.CSSProperties,
  
  button: (isHovered: boolean) => ({
    width: "100%",
    padding: SPACING.unit.lg,
    background: isHovered ? COLORS.neutral.gray50 : "transparent",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: BORDER_RADIUS.md,
    transition: "all 0.2s ease"
  } as React.CSSProperties),
  
  question: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: COLORS.text.primary,
    margin: "0",
    lineHeight: "1.4"
  } as React.CSSProperties,
  
  toggleIcon: (isOpen: boolean) => ({
    fontSize: "1.25rem",
    color: COLORS.primary.main,
    transition: "transform 0.2s ease",
    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
    flexShrink: 0,
    marginLeft: SPACING.unit.md
  } as React.CSSProperties),
  
  answer: {
    padding: `0 ${SPACING.unit.lg} ${SPACING.unit.lg}`,
    color: COLORS.text.tertiary,
    fontSize: "1rem",
    lineHeight: "1.6"
  } as React.CSSProperties,
  
  calculatorLink: {
    color: COLORS.primary.main,
    fontWeight: "600",
    textDecoration: "underline"
  } as React.CSSProperties,
} as const;

export function FaqAccordionItem({ faq, isOpen, onToggle }: FaqAccordionItemProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Special handling for calculator link in answer
  const renderAnswer = () => {
    if (faq.answer.includes('structured settlement calculator')) {
      return (
        <>
          Use our{' '}
          <Link
            href="/mint-chat-active?type=calculate&source=faq"
            style={styles.calculatorLink}
          >
            structured settlement calculator
          </Link>{' '}
          to get an instant, secure quote — no personal data, no phone calls. Just your payment details and timing.
        </>
      );
    }
    return faq.answer;
  };

  return (
    <div style={styles.container}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={styles.button(isHovered)}
      >
        <h3 style={styles.question}>
          {faq.question}
        </h3>
        <span style={styles.toggleIcon(isOpen)}>
          +
        </span>
      </button>
      {isOpen && (
        <div style={styles.answer}>
          {renderAnswer()}
        </div>
      )}
    </div>
  );
}


