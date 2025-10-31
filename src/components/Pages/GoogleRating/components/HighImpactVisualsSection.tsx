/**
 * High-Impact Visuals Section
 * 
 * Displays proof in multiple formats: rich snippet screenshot area, rating badges, and testimonial carousel
 */

'use client';

import React, { useState, useEffect } from 'react';
import { COLORS, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';
import { GoogleRatingBadge } from './GoogleRatingBadge';
import TrustBadge from '@/src/components/SEO/TrustBadge';

// Sample testimonials - replace with actual reviews
const testimonials = [
  {
    rating: 5,
    text: "SmarterPayouts gave me an instant quote online with zero hassle. The process was transparent and I felt in control the entire time.",
    name: "Nat Reynolds",
    location: "Denver, CO"
  },
  {
    rating: 5,
    text: "I was skeptical at first, but the AI calculator gave me an accurate valuation immediately. Got my money faster than I expected.",
    name: "Celia Almeda",
    location: "Miami, FL"
  },
  {
    rating: 5,
    text: "The calculator gave me a realistic expectation upfront. No surprises, no hidden fees. Exactly what they promised from day one.",
    name: "Tom Cruise",
    location: "Austin, TX"
  },
  {
    rating: 5,
    text: "Finally, a financial tool that doesn't require a phone call! I got my payout offer in minutes, completely free.",
    name: "Sarah Johnson",
    location: "Portland, OR"
  }
];

export function HighImpactVisualsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[currentTestimonial];

  return (
    <section style={{
      padding: `${SPACING.unit.xl} 0`,
      background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
      borderTop: `1px solid ${COLORS.neutral.gray200}`
    }}>
      <div style={{
        ...SPACING.container.styles,
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: SPACING.stack.xl
          }}>
            <h2 style={{
              ...TEXT_PRESETS.h2,
              color: COLORS.text.secondary,
              fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
              fontWeight: '700',
              marginBottom: SPACING.unit.sm
            }}>
              Verified Reviews
            </h2>
            <p style={{
              ...TEXT_PRESETS.body,
              color: COLORS.text.tertiary,
              fontSize: '1rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Our 4.9 rating on Google is based on over 250 verified user reviews from structured settlement owners who successfully used our free calculator to get a valuation before talking to a buyer.
            </p>
          </div>

          {/* Rich Snippet Screenshot Area */}
          <div style={{
            background: COLORS.backgrounds.white,
            borderRadius: BORDER_RADIUS.xxlarge,
            padding: SPACING.unit.xl,
            boxShadow: BOX_SHADOWS.large,
            border: `1px solid ${COLORS.neutral.gray200}`,
            marginBottom: SPACING.stack.lg,
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: COLORS.text.secondary,
              marginBottom: SPACING.stack.md
            }}>
              Rating Displayed on Google
            </h3>
            
            {/* Placeholder for Google Search Rich Snippet Screenshot */}
            <div style={{
              background: '#f9fafb',
              border: `2px dashed ${COLORS.neutral.gray300}`,
              borderRadius: BORDER_RADIUS.large,
              padding: `${SPACING.unit.xxl} ${SPACING.unit.xl}`,
              marginBottom: SPACING.stack.md,
              minHeight: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: SPACING.unit.md
            }}>
              <div style={{
                fontSize: '2rem',
                color: COLORS.neutral.gray400,
                opacity: 0.6
              }}>📱</div>
              <p style={{
                color: COLORS.text.tertiary,
                fontSize: '0.875rem',
                margin: 0,
                fontStyle: 'italic'
              }}>
                Screenshot placeholder: Google Search Result showing<br />
                SmarterPayouts with 4.9 ★★★★★ (250) · Free · Finance
              </p>
            </div>

            {/* Live Rating Badge Display */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: SPACING.unit.md,
              flexWrap: 'wrap'
            }}>
              <GoogleRatingBadge rating="4.9" reviewCount="250" />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TrustBadge 
                  rating="4.9"
                  reviewCount="250"
                  category="Finance"
                  alignment="center"
                />
              </div>
            </div>
          </div>

          {/* Testimonial Carousel */}
          <div style={{
            background: COLORS.backgrounds.white,
            borderRadius: BORDER_RADIUS.xxlarge,
            padding: SPACING.unit.xl,
            boxShadow: BOX_SHADOWS.medium,
            border: `1px solid ${COLORS.neutral.gray200}`
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: COLORS.text.secondary,
              marginBottom: SPACING.stack.lg,
              textAlign: 'center'
            }}>
              What Our Users Say
            </h3>

            {/* Testimonial Card */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
              borderRadius: BORDER_RADIUS.large,
              padding: SPACING.unit.xl,
              border: `2px solid rgba(34, 197, 94, 0.2)`,
              position: 'relative',
              transition: 'all 0.3s ease'
            }}>
              {/* Quote Icon */}
              <div style={{
                position: 'absolute',
                top: SPACING.unit.md,
                right: SPACING.unit.md,
                fontSize: '3rem',
                color: 'rgba(34, 197, 94, 0.1)',
                lineHeight: 1
              }}>"</div>

              {/* Stars */}
              <div style={{
                display: 'flex',
                gap: '0.25rem',
                marginBottom: SPACING.stack.md,
                justifyContent: 'center'
              }}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} style={{
                    color: '#FFB400',
                    fontSize: '1.5rem'
                  }}>★</span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p style={{
                ...TEXT_PRESETS.body,
                fontSize: '1.125rem',
                lineHeight: '1.7',
                color: COLORS.text.secondary,
                marginBottom: SPACING.stack.md,
                fontStyle: 'italic',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1
              }}>
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div style={{
                textAlign: 'center',
                marginTop: SPACING.stack.md
              }}>
                <p style={{
                  margin: 0,
                  fontWeight: '600',
                  color: COLORS.text.secondary,
                  fontSize: '1rem'
                }}>
                  {testimonial.name}
                </p>
                <p style={{
                  margin: 0,
                  color: COLORS.text.tertiary,
                  fontSize: '0.875rem'
                }}>
                  {testimonial.location}
                </p>
              </div>

              {/* Carousel Indicators */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: SPACING.unit.xs,
                marginTop: SPACING.stack.md
              }}>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      border: 'none',
                      background: index === currentTestimonial ? COLORS.primary.main : COLORS.neutral.gray300,
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.3s ease'
                    }}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

