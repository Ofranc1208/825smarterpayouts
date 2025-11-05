/**
 * Featured Testimonials Grid Section
 * 
 * Displays the main testimonials in a responsive grid
 * Uses TestimonialCard component for each testimonial
 * Includes professional section header (research-based best practice)
 */

import React from 'react';
import { testimonials } from '../data';
import { TestimonialCard } from './shared';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function FeaturedTestimonialsGrid() {
  return (
    <section style={{
      width: '100%',
      maxWidth: SPACING.container.maxWidth,
      margin: '0 auto',
      padding: `${SPACING.unit.xl} ${SPACING.container.padding}`,
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '5%',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.02) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      {/* Section Header - Modern and Engaging */}
      <div style={{
        textAlign: 'center',
        marginBottom: SPACING.unit.xl,
        position: 'relative',
        zIndex: 1
      }}>
        <h2 style={{
          ...TEXT_PRESETS.heroTitle,
          fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
          color: COLORS.neutral.gray900,
          marginBottom: SPACING.stack.lg,
          lineHeight: TYPOGRAPHY.lineHeight.tight,
          background: COLORS.titleGradients.grayToGreen,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          maxWidth: '800px',
          margin: `0 auto ${SPACING.stack.lg}`
        }}>
          Shared by Our Clients
        </h2>
        <p style={{
          fontSize: TYPOGRAPHY.fontSize.body.medium,
          color: COLORS.text.secondary,
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: TYPOGRAPHY.lineHeight.relaxed,
          fontWeight: TYPOGRAPHY.fontWeight.normal
        }}>
          These authentic testimonials were provided directly to us by our clients. Each story represents a real person's experience with our transparent settlement process.
        </p>
      </div>

      {/* Testimonials Grid - Modern Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: '2.5rem',
        position: 'relative',
        zIndex: 1
      }}>
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.name}
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              transform: 'translateZ(0)' // GPU acceleration
            }}
          >
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>

      {/* Add CSS animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

