/**
 * FAQ Accordion Item Component
 * 
 * Individual expandable/collapsible FAQ item with animated toggle
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { FAQ } from '../../types';
import { COLORS, SPACING, BORDER_RADIUS, BOX_SHADOWS, TYPOGRAPHY } from '@/src/components/shared/styles';

interface FaqAccordionItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

// Extracted style objects for better readability and maintainability
const styles = {
  container: (isOpen: boolean) => ({
    border: `1px solid ${COLORS.neutral.gray200}`,
    borderRadius: BORDER_RADIUS.medium,
    overflow: "hidden",
    background: COLORS.backgrounds.white,
    boxShadow: isOpen ? BOX_SHADOWS.small : BOX_SHADOWS.sm,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    marginBottom: SPACING.unit.sm
  } as React.CSSProperties),
  
  button: (isOpen: boolean, isHovered: boolean) => ({
    width: "100%",
    padding: `${SPACING.unit.md} ${SPACING.unit.lg}`,
    background: isOpen ? COLORS.backgrounds.lightGray : (isHovered ? COLORS.backgrounds.lightGray : COLORS.backgrounds.white),
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "all 0.2s ease",
    gap: SPACING.unit.md
  } as React.CSSProperties),
  
  question: {
    fontSize: TYPOGRAPHY.fontSize.body.medium,
    fontWeight: "600",
    color: COLORS.neutral.gray900,
    margin: "0",
    lineHeight: TYPOGRAPHY.lineHeight.snug,
    flex: 1
  } as React.CSSProperties,
  
  toggleIcon: (isOpen: boolean) => ({
    fontSize: "1.25rem",
    fontWeight: "300",
    color: COLORS.primary.main,
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
    flexShrink: 0,
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1"
  } as React.CSSProperties),
  
  answer: (isOpen: boolean) => ({
    maxHeight: isOpen ? "1000px" : "0",
    overflow: "hidden",
    padding: isOpen ? `0 ${SPACING.unit.lg} ${SPACING.unit.lg}` : "0",
    background: COLORS.backgrounds.lightGray,
    borderTop: isOpen ? `1px solid ${COLORS.neutral.gray200}` : "none",
    opacity: isOpen ? 1 : 0,
    transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease, opacity 0.3s ease, border-top 0.2s ease"
  } as React.CSSProperties),
  
  answerText: {
    color: COLORS.text.secondary,
    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
    margin: "0",
    fontSize: TYPOGRAPHY.fontSize.body.small
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
    <div style={styles.container(isOpen)}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={styles.button(isOpen, isHovered)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <span style={styles.question}>
          {faq.question}
        </span>
        <span style={styles.toggleIcon(isOpen)}>
          +
        </span>
      </button>
      <div 
        id={`faq-answer-${faq.id}`}
        style={styles.answer(isOpen)}
      >
        <p style={styles.answerText}>
          {renderAnswer()}
        </p>
      </div>
    </div>
  );
}


