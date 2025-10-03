/**
 * Quick Testimonials Section
 * 
 * Displays compact testimonials in a grid
 * Uses QuickTestimonialCard component for each testimonial
 */

import React from 'react';
import { quickTestimonials } from '../data';
import { QuickTestimonialCard } from './shared';
import { COLORS, TYPOGRAPHY, SPACING } from '@/src/components/shared/styles';

export default function QuickTestimonialsSection() {
  return (
    <section style={{
      background: COLORS.backgrounds.lightGray,
      padding: `${SPACING.section.hero} 0`
    }}>
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto',
        padding: `0 ${SPACING.container.padding}`
      }}>
        {/* Section Header - Clean and Spacious */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: SPACING.stack.xxl
        }}>
          <div style={{
            maxWidth: '800px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: TYPOGRAPHY.fontSize.body.small,
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              color: COLORS.primary.dark,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: SPACING.stack.md
            }}>
              Quick Reviews
            </div>
            <h2 style={{
              fontSize: TYPOGRAPHY.fontSize.heading.h2,
              fontWeight: TYPOGRAPHY.fontWeight.bold,
              color: COLORS.text.primary,
              marginBottom: '0'
            }}>
              What More Clients Are Saying
            </h2>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem'
        }}>
          {quickTestimonials.map((testimonial) => (
            <div key={testimonial.name}>
              <QuickTestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

