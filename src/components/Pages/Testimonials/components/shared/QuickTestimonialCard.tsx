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
  const hoverEffect = createFloatHover(2); // Subtle 2px float

  return (
    <div
      style={{
        background: COLORS.backgrounds.white,
        borderRadius: BORDER_RADIUS.medium,
        padding: SPACING.stack.md,
        border: `1px solid ${COLORS.borders.light}`,
        transition: "all 0.2s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = COLORS.borders.medium;
        e.currentTarget.style.transform = hoverEffect.hover.transform;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = COLORS.borders.light;
        e.currentTarget.style.transform = hoverEffect.default.transform;
      }}
    >
      {/* Testimonial Text */}
      <p style={{
        fontSize: "0.95rem",
        color: COLORS.text.tertiary,
        lineHeight: TYPOGRAPHY.lineHeight.relaxed,
        marginBottom: SPACING.stack.sm,
        fontStyle: "italic"
      }}>
        "{testimonial.text}"
      </p>

      {/* Author Info and Rating */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div>
          <div style={{
            fontWeight: TYPOGRAPHY.fontWeight.semibold,
            color: COLORS.text.primary,
            fontSize: "0.9rem"
          }}>
            {testimonial.name}
          </div>
          <div style={{
            color: COLORS.text.secondary,
            fontSize: "0.8rem"
          }}>
            {testimonial.location}
          </div>
        </div>
        <StarRating rating={testimonial.rating} size="small" />
      </div>
    </div>
  );
}

