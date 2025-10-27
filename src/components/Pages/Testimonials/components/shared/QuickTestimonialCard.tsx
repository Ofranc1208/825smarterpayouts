/**
 * QuickTestimonialCard Component
 * 
 * Displays a compact testimonial card with:
 * - Name and location
 * - Testimonial text
 * - Star rating
 * - Hover effects
 * 
 * Simpler version without profile image
 */

import React from 'react';
import { QuickTestimonial } from '../../types/testimonialTypes';
import StarRating from './StarRating';
import { 
  COLORS, 
  TYPOGRAPHY, 
  SPACING, 
  BORDER_RADIUS,
  createFloatHover 
} from '@/src/components/shared/styles';

interface QuickTestimonialCardProps {
  testimonial: QuickTestimonial;
}

export default function QuickTestimonialCard({ testimonial }: QuickTestimonialCardProps) {
  const hoverEffect = createFloatHover(4);

  return (
    <div
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(249,250,251,0.8) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: BORDER_RADIUS.large,
        border: '1px solid rgba(255,255,255,0.3)',
        padding: SPACING.stack.lg,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = hoverEffect.hover.transform;
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12), 0 6px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.4)';
        e.currentTarget.style.border = '1px solid rgba(34, 197, 94, 0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = hoverEffect.default.transform;
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)';
        e.currentTarget.style.border = '1px solid rgba(255,255,255,0.3)';
      }}
    >
      {/* Gradient accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
        borderRadius: `${BORDER_RADIUS.large} ${BORDER_RADIUS.large} 0 0`
      }} />

      {/* Quote mark */}
      <div style={{
        position: "absolute",
        top: '0.75rem',
        right: '1rem',
        fontSize: "1.5rem",
        color: 'rgba(34, 197, 94, 0.12)',
        fontFamily: "serif",
        transform: 'rotate(180deg)',
        userSelect: 'none'
      }}>
        "
      </div>

      {/* Testimonial Text */}
      <p style={{
        fontSize: TYPOGRAPHY.fontSize.body.medium,
        color: COLORS.text.primary,
        lineHeight: TYPOGRAPHY.lineHeight.relaxed,
        marginBottom: SPACING.stack.md,
        fontWeight: TYPOGRAPHY.fontWeight.medium,
        position: 'relative',
        zIndex: 1,
        textShadow: '0 1px 2px rgba(0,0,0,0.03)'
      }}>
        "{testimonial.text}"
      </p>

      {/* Author Info and Rating */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: SPACING.inline.xs
        }}>
          {/* Avatar placeholder */}
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: TYPOGRAPHY.fontWeight.bold,
            color: 'white',
            boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)'
          }}>
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <div style={{
              fontWeight: TYPOGRAPHY.fontWeight.bold,
              color: COLORS.text.primary,
              fontSize: TYPOGRAPHY.fontSize.body.small
            }}>
              {testimonial.name}
            </div>
            <div style={{
              color: COLORS.text.secondary,
              fontSize: '0.75rem',
              fontWeight: TYPOGRAPHY.fontWeight.medium,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <span>📍</span>
              {testimonial.location}
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          <StarRating rating={testimonial.rating} size="small" />
          <span style={{
            fontSize: '0.75rem',
            color: '#22c55e',
            fontWeight: TYPOGRAPHY.fontWeight.bold
          }}>
            {testimonial.rating}.0
          </span>
        </div>
      </div>

      {/* Subtle background decoration */}
      <div style={{
        position: 'absolute',
        bottom: '0.5rem',
        right: '0.5rem',
        width: '24px',
        height: '24px',
        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
    </div>
  );
}

