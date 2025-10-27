/**
 * Quick Testimonials Section
 * 
 * Displays compact testimonials in a grid
 * Uses QuickTestimonialCard component for each testimonial
 */

import React from 'react';
import { quickTestimonials } from '../data';
import { QuickTestimonialCard } from './shared';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';

export default function QuickTestimonialsSection() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
      padding: `${SPACING.unit.xxxxl} 0`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.05) 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.03) 0%, transparent 50%)`,
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto',
        padding: `0 ${SPACING.container.padding}`,
        position: 'relative',
        zIndex: 1
      }}>
        {/* Section Header - Modern and Visual */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: SPACING.unit.xxxxl
        }}>
          <div style={{
            maxWidth: '800px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: TYPOGRAPHY.fontSize.heading.h1,
              fontWeight: TYPOGRAPHY.fontWeight.bold,
              color: COLORS.text.primary,
              marginBottom: SPACING.stack.md,
              lineHeight: TYPOGRAPHY.lineHeight.tight
            }}>
              More Client Experiences
            </h2>
            <p style={{
              fontSize: TYPOGRAPHY.fontSize.body.large,
              color: COLORS.text.secondary,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
              fontWeight: TYPOGRAPHY.fontWeight.medium
            }}>
              These additional testimonials were shared directly with our team, showing the <strong style={{ color: '#22c55e' }}>consistent, transparent experience</strong> clients receive when working with SmarterPayouts.
            </p>
          </div>
        </div>

        {/* Testimonials Grid - Enhanced Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          position: 'relative',
          zIndex: 1
        }}>
          {quickTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              style={{
                animation: `slideInUp 0.5s ease-out ${index * 0.08}s both`,
                transform: 'translateZ(0)' // GPU acceleration
              }}
            >
              <QuickTestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {/* Add CSS animation */}
        <style jsx>{`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>
      </div>
    </section>
  );
}

