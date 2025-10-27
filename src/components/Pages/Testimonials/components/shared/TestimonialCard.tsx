/**
 * TestimonialCard Component
 * 
 * Displays a featured testimonial card with:
 * - Profile image
 * - Name and location
 * - Testimonial text
 * - Star rating
 * - Hover effects
 */

import React from 'react';
import Image from 'next/image';
import { Testimonial } from '../../types/testimonialTypes';
import StarRating from './StarRating';
import { 
  COLORS, 
  TYPOGRAPHY, 
  SPACING, 
  BORDER_RADIUS,
  getBaseCardStyles,
  createFloatHover 
} from '@/src/components/shared/styles';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const hoverEffect = createFloatHover(8);

  return (
    <div
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
        backdropFilter: 'blur(20px)',
        borderRadius: BORDER_RADIUS.large,
        border: '1px solid rgba(255,255,255,0.2)',
        height: "100%",
        position: "relative",
        padding: '2rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = hoverEffect.hover.transform;
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3)';
        e.currentTarget.style.border = '1px solid rgba(34, 197, 94, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = hoverEffect.default.transform;
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05)';
        e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
      }}
    >
      {/* Modern gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
        borderRadius: `${BORDER_RADIUS.large} ${BORDER_RADIUS.large} 0 0`
      }} />

      {/* Modern Quote Icon */}
      <div style={{
        position: "absolute",
        top: '1rem',
        right: '1.5rem',
        fontSize: "2rem",
        color: 'rgba(34, 197, 94, 0.15)',
        fontFamily: "serif",
        transform: 'rotate(180deg)',
        userSelect: 'none'
      }}>
        "
      </div>

      {/* Stars */}
      <div style={{
        marginBottom: SPACING.stack.md,
        position: 'relative',
        zIndex: 1
      }}>
        <StarRating rating={testimonial.rating} size="medium" />
      </div>

      {/* Testimonial Text */}
      <p style={{
        fontSize: TYPOGRAPHY.fontSize.body.large,
        color: COLORS.text.primary,
        lineHeight: TYPOGRAPHY.lineHeight.relaxed,
        marginBottom: SPACING.stack.lg,
        fontWeight: TYPOGRAPHY.fontWeight.medium,
        position: 'relative',
        zIndex: 1,
        textShadow: '0 1px 2px rgba(0,0,0,0.05)'
      }}>
        "{testimonial.text}"
      </p>

      {/* Author Info */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: SPACING.inline.md,
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          position: 'relative'
        }}>
          <Image
            src={testimonial.img}
            alt={testimonial.alt}
            width={56}
            height={56}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              border: '3px solid rgba(255,255,255,0.8)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease'
            }}
          />
          {/* Online indicator */}
          <div style={{
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            width: '12px',
            height: '12px',
            background: '#22c55e',
            borderRadius: '50%',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }} />
        </div>
        <div>
          <div style={{
            fontWeight: TYPOGRAPHY.fontWeight.bold,
            color: COLORS.text.primary,
            fontSize: TYPOGRAPHY.fontSize.body.large,
            marginBottom: '0.25rem'
          }}>
            {testimonial.name}
          </div>
          <div style={{
            color: COLORS.text.secondary,
            fontSize: TYPOGRAPHY.fontSize.body.small,
            fontWeight: TYPOGRAPHY.fontWeight.medium,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>📍</span>
            {testimonial.location}
          </div>
        </div>
      </div>

      {/* Subtle background pattern */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '1rem',
        width: '40px',
        height: '40px',
        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
    </div>
  );
}

