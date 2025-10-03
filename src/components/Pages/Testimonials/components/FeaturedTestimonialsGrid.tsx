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
import { COLORS, TYPOGRAPHY, SPACING } from '@/src/components/shared/styles';

export default function FeaturedTestimonialsGrid() {
  return (
    <section style={{
      width: '100%',
      maxWidth: SPACING.container.maxWidth,
      margin: '0 auto',
      padding: `${SPACING.section.hero} ${SPACING.container.padding}`,
      paddingTop: '5rem' // Extra space from hero section
    }}>
      {/* Section Header - Clean and Simple */}
      <div style={{
        textAlign: 'center',
        marginBottom: SPACING.stack.xxl
      }}>
        <h2 style={{
          fontSize: TYPOGRAPHY.fontSize.heading.h2,
          fontWeight: TYPOGRAPHY.fontWeight.bold,
          color: COLORS.text.primary,
          marginBottom: SPACING.stack.md
        }}>
          Real Experiences from Real Clients
        </h2>
        <p style={{
          fontSize: TYPOGRAPHY.fontSize.body.large,
          color: COLORS.text.secondary,
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          See how SmarterPayouts helped clients get fast, transparent settlements with no hidden fees
        </p>
      </div>

      {/* Testimonials Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem'
      }}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.name}>
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    </section>
  );
}

