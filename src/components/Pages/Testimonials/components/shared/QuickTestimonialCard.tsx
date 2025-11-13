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
        background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.3)',
        padding: '2rem',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08), 0 4px 15px rgba(34,197,94,0.05), inset 0 1px 0 rgba(255,255,255,0.4)',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.12), 0 8px 25px rgba(34,197,94,0.15), inset 0 1px 0 rgba(255,255,255,0.6)';
        e.currentTarget.style.border = '1px solid rgba(34, 197, 94, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08), 0 4px 15px rgba(34,197,94,0.05), inset 0 1px 0 rgba(255,255,255,0.4)';
        e.currentTarget.style.border = '1px solid rgba(255,255,255,0.3)';
      }}
    >
      {/* Gradient accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #22c55e 0%, #3b82f6 50%, #a855f7 100%)',
        borderRadius: '20px 20px 0 0'
      }} />

      {/* Quote mark */}
      <div style={{
        position: "absolute",
        top: '1rem',
        right: '1.25rem',
        fontSize: "2.5rem",
        color: 'rgba(34, 197, 94, 0.1)',
        fontFamily: "serif",
        fontWeight: 'bold',
        transform: 'rotate(15deg)',
        userSelect: 'none',
        transition: 'all 0.4s ease'
      }}>
        "
      </div>

      {/* Floating background elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '30px',
        height: '30px',
        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '15%',
        width: '20px',
        height: '20px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      {/* Testimonial Text */}
      <p style={{
        fontSize: '1rem',
        color: '#475569',
        lineHeight: 1.7,
        marginBottom: '1.5rem',
        fontWeight: 400,
        position: 'relative',
        zIndex: 2,
        fontStyle: 'italic',
        letterSpacing: '0.2px'
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
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22c55e 0%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: 'white',
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease'
          }}>
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <div style={{
              fontWeight: 700,
              color: '#0f172a',
              fontSize: '0.95rem',
              marginBottom: '0.25rem'
            }}>
              {testimonial.name}
            </div>
            <div style={{
              color: '#22c55e',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <span style={{ fontSize: '0.7rem' }}>📍</span>
              {testimonial.location}
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <StarRating rating={testimonial.rating} size="small" />
          <span style={{
            fontSize: '0.8rem',
            color: '#22c55e',
            fontWeight: 700,
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
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

