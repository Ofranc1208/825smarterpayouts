/**
 * FAQ Accordion Component
 * Expandable/collapsible FAQ items
 * 
 * NO CSS FILES - All styles inline
 * Uses COLORS, BORDER_RADIUS, BOX_SHADOWS from shared/styles
 */

'use client';
import React, { useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';
import type { FAQItem } from '../types';

interface FAQAccordionProps {
  faqs: FAQItem[];
  title?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ 
  faqs,
  title = "Common Questions"
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{ marginBottom: '3rem' }}>
      {title && (
        <h2 style={{
          ...TEXT_PRESETS.heroTitle,
          fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
          color: COLORS.neutral.gray900,
          marginBottom: SPACING.stack.lg,
          background: COLORS.titleGradients.grayToGreen,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textAlign: 'center'
        }}>
          {title}
        </h2>
      )}
      <div>
        {faqs.map((faq, index) => (
          <div key={index} style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: BORDER_RADIUS.medium,
            marginBottom: '0.75rem',
            overflow: 'hidden'
          }}>
            <button
              onClick={() => toggleAccordion(index)}
              style={{
                width: '100%',
                padding: '1.25rem',
                background: openIndex === index ? '#f9fafb' : 'white',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '1.0625rem',
                fontWeight: '600',
                color: COLORS.text.primary,
                transition: 'background 0.2s ease'
              }}
            >
              <span>{faq.question}</span>
              <span style={{
                fontSize: '1.5rem',
                color: COLORS.primary.main,
                transition: 'transform 0.3s ease',
                transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
              }}>
                ▼
              </span>
            </button>
            <div style={{
              maxHeight: openIndex === index ? '1000px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease'
            }}>
              <div style={{
                padding: '1.25rem',
                color: COLORS.text.tertiary,
                lineHeight: '1.7',
                borderTop: '1px solid #f3f4f6'
              }}>
                {typeof faq.answer === 'string' ? (
                  <p style={{ margin: 0 }}>{faq.answer}</p>
                ) : (
                  faq.answer
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQAccordion;

