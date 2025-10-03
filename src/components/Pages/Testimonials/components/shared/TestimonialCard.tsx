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
  const cardStyles = getBaseCardStyles();
  const hoverEffect = createFloatHover(6);

  return (
    <div
      style={{
        ...cardStyles,
        height: "100%",
        position: "relative",
        padding: '2.5rem'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = hoverEffect.hover.transform;
        e.currentTarget.style.boxShadow = hoverEffect.hover.boxShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = hoverEffect.default.transform;
        e.currentTarget.style.boxShadow = hoverEffect.default.boxShadow;
      }}
    >
      {/* Quote Icon */}
      <div style={{
        position: "absolute",
        top: SPACING.stack.sm,
        right: SPACING.stack.sm,
        fontSize: "3rem",
        color: COLORS.borders.light,
        fontFamily: "serif"
      }}>
        "
      </div>

      {/* Stars */}
      <div style={{ marginBottom: SPACING.stack.sm }}>
        <StarRating rating={testimonial.rating} size="medium" />
      </div>

      {/* Testimonial Text */}
      <p style={{
        fontSize: TYPOGRAPHY.fontSize.body.default,
        color: COLORS.text.secondary,
        lineHeight: TYPOGRAPHY.lineHeight.relaxed,
        marginBottom: SPACING.stack.md,
        fontStyle: "italic"
      }}>
        "{testimonial.text}"
      </p>

      {/* Author Info */}
      <div style={{ display: "flex", alignItems: "center", gap: SPACING.inline.sm }}>
        <Image
          src={testimonial.img}
          alt={testimonial.alt}
          width={48}
          height={48}
          style={{
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />
        <div>
          <div style={{
            fontWeight: TYPOGRAPHY.fontWeight.semibold,
            color: COLORS.text.primary,
            fontSize: "0.95rem"
          }}>
            {testimonial.name}
          </div>
          <div style={{
            color: COLORS.text.secondary,
            fontSize: TYPOGRAPHY.fontSize.body.small
          }}>
            {testimonial.location}
          </div>
        </div>
      </div>
    </div>
  );
}

