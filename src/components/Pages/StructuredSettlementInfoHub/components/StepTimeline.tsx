/**
 * Step Timeline Component
 * Displays numbered steps in a timeline format
 * 
 * NO CSS FILES - All styles inline
 * Uses COLORS, BORDER_RADIUS, BOX_SHADOWS, getIconContainerStyles from shared/styles
 */

'use client';
import React from 'react';
import Link from 'next/link';
import { COLORS, BORDER_RADIUS, BOX_SHADOWS, getIconContainerStyles } from '@/src/components/shared/styles';
import type { StepItem } from '../types';

interface StepTimelineProps {
  steps: StepItem[];
}

export const StepTimeline: React.FC<StepTimelineProps> = ({ steps }) => {
  return (
    <div style={{ marginBottom: '3rem' }}>
      {steps.map((step, index) => (
        <div key={index} style={{
          background: 'white',
          padding: '2rem',
          borderRadius: BORDER_RADIUS.large,
          boxShadow: BOX_SHADOWS.small,
          border: '1px solid #e5e7eb',
          marginBottom: index < steps.length - 1 ? '1.5rem' : 0
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
            gap: '1rem'
          }}>
            <span style={{
              ...getIconContainerStyles({
                size: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                fontSize: '1.25rem'
              })
            }}>
              {step.stepNumber}
            </span>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: COLORS.text.primary,
              margin: 0
            }}>
              {step.title}
            </h3>
          </div>
          <p style={{
            color: COLORS.text.tertiary,
            lineHeight: '1.6',
            marginBottom: '1rem'
          }}>
            {step.description}
          </p>
          <ul style={{
            color: COLORS.text.secondary,
            lineHeight: '1.8',
            marginBottom: step.ctaLink ? '1.5rem' : 0,
            paddingLeft: '1.5rem'
          }}>
            {step.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
          {step.ctaLink && step.ctaText && (
            <Link href={step.ctaLink} style={{
              display: 'inline-block',
              color: COLORS.primary.main,
              border: `1px solid ${COLORS.primary.main}`,
              padding: '0.75rem 1.25rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              fontSize: '0.875rem'
            }}>
              {step.ctaText}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepTimeline;

