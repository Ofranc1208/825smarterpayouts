'use client';

/**
 * Timeline Section Component - How Fast Page
 * 
 * Displays 4-step timeline breakdown with collapsible cards.
 * Uses design system tokens for consistent styling.
 * Fully accessible with semantic HTML and proper ARIA labels.
 * 
 * @component
 * @returns {JSX.Element} Rendered timeline section
 * 
 * @example
 * <TimelineSection />
 */

import { useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';
import type { TimelineStep } from '../types';

const timelineSteps: TimelineStep[] = [
  {
    step: 1,
    title: 'Get Your Quote',
    time: 'Instant',
    description: 'Use our calculator to get an immediate quote. No waiting, no phone calls required.',
    variant: 'success'
  },
  {
    step: 2,
    title: 'Documentation',
    time: '1-3 days',
    description: 'We help you gather required documents and complete all paperwork digitally.',
    variant: 'success'
  },
  {
    step: 3,
    title: 'Court Filing',
    time: '2-4 weeks',
    description: 'We file with the court and schedule your hearing. This is typically the longest step.',
    variant: 'warning'
  },
  {
    step: 4,
    title: 'Get Your Cash',
    time: '24-72 hours',
    description: 'Once approved, funds are typically in your account within 1-3 business days.',
    variant: 'success'
  }
];

function TimelineCard({ step }: { step: TimelineStep }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article
      style={{
        background: COLORS.backgrounds.white,
        borderRadius: BORDER_RADIUS.large,
        border: `2px solid ${step.variant === 'success' ? COLORS.primary.main : COLORS.accent.gold}`,
        overflow: 'hidden',
        transition: 'all 0.2s ease'
      }}
    >
      {/* Clickable Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: SPACING.card.standard,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1
        }}>
          <div style={{
            background: step.variant === 'success' 
              ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
              : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: COLORS.backgrounds.white,
            borderRadius: BORDER_RADIUS.circle,
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SPACING.inline.sm,
            fontWeight: TYPOGRAPHY.fontWeight.bold,
            flexShrink: 0
          }}>
            {step.step}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontSize: TYPOGRAPHY.fontSize.body.large,
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              color: COLORS.text.primary,
              margin: 0,
              marginBottom: SPACING.unit.xxs
            }}>
              {step.title}
            </h3>
            <div style={{
              color: COLORS.text.secondary,
              fontSize: TYPOGRAPHY.fontSize.body.small,
              fontWeight: TYPOGRAPHY.fontWeight.semibold
            }}>
              Time: {step.time}
            </div>
          </div>
        </div>
        <span style={{
          fontSize: TYPOGRAPHY.fontSize.body.medium,
          color: COLORS.text.secondary,
          transition: 'transform 0.2s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          marginLeft: SPACING.inline.sm
        }}>
          ▼
        </span>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div style={{
          padding: SPACING.card.standard,
          paddingTop: 0,
          borderTop: `1px solid ${COLORS.borders.light}`
        }}>
          <p style={{
            color: COLORS.text.secondary,
            margin: 0,
            fontSize: TYPOGRAPHY.fontSize.body.medium,
            lineHeight: TYPOGRAPHY.lineHeight.relaxed
          }}>
            {step.description}
          </p>
        </div>
      )}
    </article>
  );
}

export default function TimelineSection() {
  return (
    <section
      id="timeline"
      aria-label="Complete timeline breakdown"
      style={{
        paddingTop: SPACING.unit.xxxl,
        paddingBottom: SPACING.unit.xxxl,
        paddingLeft: SPACING.unit.md,
        paddingRight: SPACING.unit.md,
        background: '#f9fafb',
        position: 'relative',
        zIndex: 0
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: TYPOGRAPHY.fontSize.heading.h3,
          fontWeight: TYPOGRAPHY.fontWeight.bold,
          color: COLORS.text.primary,
          marginBottom: SPACING.stack.lg,
          textAlign: 'center'
        }}>
          Complete Timeline Breakdown
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: SPACING.grid.comfortable
        }}>
          {timelineSteps.map((step) => (
            <TimelineCard key={step.step} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
