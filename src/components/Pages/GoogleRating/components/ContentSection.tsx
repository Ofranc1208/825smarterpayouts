/**
 * Google Rating Content Section
 * 
 * Simplified, layman-friendly content explaining the Google rating
 */

'use client';

import React from 'react';
import { COLORS, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export function ContentSection() {
  return (
    <section style={{
      padding: `${SPACING.unit.xl} 0`,
      background: COLORS.backgrounds.white
    }}>
      <div style={{
        ...SPACING.container.styles,
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {/* Key Differentiators - Skip the Sales Pitch */}
          <div style={{
            background: COLORS.backgrounds.white,
            borderRadius: BORDER_RADIUS.xxlarge,
            padding: `${SPACING.unit.xl} ${SPACING.unit.lg}`,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 180, 0, 0.1)',
            border: `2px solid rgba(255, 180, 0, 0.15)`,
            marginBottom: SPACING.stack.lg,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div>
              <h2 style={{
                ...TEXT_PRESETS.h2,
                marginBottom: SPACING.stack.sm,
                color: COLORS.text.secondary,
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.unit.sm,
                fontSize: '1.25rem',
                fontWeight: '700'
              }}>
                Why Our Rating Matters: Skip the Sales Pitch
              </h2>
              <p style={{
                ...TEXT_PRESETS.body,
                marginBottom: SPACING.stack.md,
                color: COLORS.text.secondary,
                lineHeight: '1.7',
                fontSize: '1.0625rem'
              }}>
                Our high rating is a direct result of our <strong>"Skip the Sales Pitch"</strong> approach. Unlike competitors who use lengthy phone-based processes with pushy sales tactics, we provide honest, instant calculations that put you in control from the start.
              </p>
              
              {/* Comparison Section */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: SPACING.unit.md,
                marginTop: SPACING.stack.md
              }}>
                {/* Our Approach */}
                <div style={{
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
                  borderRadius: BORDER_RADIUS.large,
                  padding: SPACING.card.compact,
                  border: '2px solid rgba(34, 197, 94, 0.3)'
                }}>
                  <div style={{
                    fontSize: '1.25rem',
                    marginBottom: SPACING.unit.xs,
                    color: COLORS.primary.main
                  }}>✓</div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    marginBottom: SPACING.unit.xs,
                    color: COLORS.text.secondary
                  }}>
                    Our Approach
                  </h3>
                  <ul style={{
                    margin: 0,
                    paddingLeft: SPACING.unit.md,
                    fontSize: '0.875rem',
                    lineHeight: '1.7',
                    color: COLORS.text.secondary
                  }}>
                    <li>Instant AI-powered platform</li>
                    <li>No phone calls required</li>
                    <li>100% transparent pricing</li>
                    <li>No sales pressure</li>
                  </ul>
                </div>

                {/* Competitors' Approach */}
                <div style={{
                  background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                  borderRadius: BORDER_RADIUS.large,
                  padding: SPACING.card.compact,
                  border: '2px solid rgba(239, 68, 68, 0.2)'
                }}>
                  <div style={{
                    fontSize: '1.25rem',
                    marginBottom: SPACING.unit.xs,
                    color: '#ef4444'
                  }}>✗</div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    marginBottom: SPACING.unit.xs,
                    color: COLORS.text.secondary
                  }}>
                    Traditional Competitors
                  </h3>
                  <ul style={{
                    margin: 0,
                    paddingLeft: SPACING.unit.md,
                    fontSize: '0.875rem',
                    lineHeight: '1.7',
                    color: COLORS.text.secondary
                  }}>
                    <li>Lengthy phone-based processes</li>
                    <li>Pushy sales tactics</li>
                    <li>Hidden fees and rates</li>
                    <li>Pressure to commit quickly</li>
                  </ul>
                </div>
              </div>

              {/* Core Features Highlight */}
              <div style={{
                background: '#fff7e6',
                borderRadius: BORDER_RADIUS.large,
                padding: SPACING.card.compact,
                marginTop: SPACING.stack.md,
                border: '1px solid rgba(255, 180, 0, 0.2)'
              }}>
                <p style={{
                  margin: 0,
                  color: COLORS.text.secondary,
                  fontWeight: '600',
                  lineHeight: '1.7',
                  fontSize: '1rem'
                }}>
                  <strong>AI-Powered Accuracy:</strong> Get instant, precise calculations without waiting<br/>
                  <strong>Instant, No-Obligation Payout Offers:</strong> See your options immediately, no strings attached<br/>
                  <strong>100% Free:</strong> No hidden fees, no subscription required—just honest, transparent service
                </p>
              </div>
            </div>
          </div>

          {/* Why Google Trusts Us - Simplified */}
          <div style={{
            background: COLORS.backgrounds.white,
            borderRadius: BORDER_RADIUS.xxlarge,
            padding: `${SPACING.unit.xl} ${SPACING.unit.lg}`,
            boxShadow: BOX_SHADOWS.medium,
            border: `1px solid ${COLORS.neutral.gray200}`,
            marginBottom: SPACING.stack.lg
          }}>
            <h2 style={{
              ...TEXT_PRESETS.h2,
              marginBottom: SPACING.stack.sm,
              color: COLORS.text.secondary,
              fontSize: '1.125rem',
              fontWeight: '600'
            }}>
              What Our Rating Means
            </h2>
            <p style={{
              ...TEXT_PRESETS.body,
              marginBottom: SPACING.stack.md,
              color: COLORS.text.secondary,
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              Our rating on Google reflects our commitment to excellence in several key areas:
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: SPACING.unit.md,
              marginTop: SPACING.stack.md
            }}>
              <div style={{
                padding: SPACING.card.compact,
                background: '#f0fdf4',
                borderRadius: BORDER_RADIUS.large,
                border: '1px solid #d1fae5'
              }}>
                <div style={{
                  fontSize: '1.75rem',
                  marginBottom: SPACING.unit.xs
                }}>🔒</div>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: SPACING.unit.xs,
                  color: COLORS.text.secondary
                }}>
                  Security & Privacy
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  color: COLORS.text.secondary,
                  lineHeight: '1.6'
                }}>
                  Your information is protected with bank-level encryption. No personal data required to use our platform.
                </p>
              </div>

              <div style={{
                padding: SPACING.card.compact,
                background: '#fef3c7',
                borderRadius: BORDER_RADIUS.large,
                border: '1px solid #fde68a'
              }}>
                <div style={{
                  fontSize: '1.75rem',
                  marginBottom: SPACING.unit.xs
                }}>⚡</div>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: SPACING.unit.xs,
                  color: COLORS.text.secondary
                }}>
                  Fast & Accurate
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  color: COLORS.text.secondary,
                  lineHeight: '1.6'
                }}>
                  Get instant results with calculations that match industry standards. No waiting, no guessing.
                </p>
              </div>

              <div style={{
                padding: SPACING.card.compact,
                background: '#ecfdf5',
                borderRadius: BORDER_RADIUS.large,
                border: '1px solid #d1fae5'
              }}>
                <div style={{
                  fontSize: '1.75rem',
                  marginBottom: SPACING.unit.xs
                }}>✅</div>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: SPACING.unit.xs,
                  color: COLORS.text.secondary
                }}>
                  Court-Approved
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  color: COLORS.text.secondary,
                  lineHeight: '1.6'
                }}>
                  We work with licensed brokers in all 50 states. Every transaction follows legal requirements.
                </p>
              </div>
            </div>
          </div>

          {/* What This Means for You - Simplified */}
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
            borderRadius: BORDER_RADIUS.xxlarge,
            padding: `${SPACING.unit.xl} ${SPACING.unit.lg}`,
            boxShadow: BOX_SHADOWS.medium,
            border: `1px solid ${COLORS.neutral.gray200}`,
            marginBottom: SPACING.stack.lg
          }}>
            <h2 style={{
              ...TEXT_PRESETS.h2,
              marginBottom: SPACING.stack.sm,
              color: COLORS.text.secondary,
              fontSize: '1.125rem',
              fontWeight: '600'
            }}>
              What This Means for You
            </h2>
            <p style={{
              ...TEXT_PRESETS.body,
              marginBottom: SPACING.stack.md,
              color: COLORS.text.secondary,
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              Our rating on Google isn't just a number—it's your assurance that you're working with a reputable, trustworthy company:
            </p>
            
            <ul style={{
              margin: 0,
              paddingLeft: SPACING.unit.lg,
              color: COLORS.text.secondary,
              lineHeight: '1.8',
              fontSize: '1rem'
            }}>
              <li style={{ marginBottom: SPACING.stack.xs }}>
                <strong style={{ color: COLORS.text.secondary }}>You can trust our calculations.</strong> Our tools are accurate and validated by our user community.
              </li>
              <li style={{ marginBottom: SPACING.stack.xs }}>
                <strong style={{ color: COLORS.text.secondary }}>No scams, no tricks.</strong> The "Free" badge means we don't charge hidden fees or require subscriptions.
              </li>
              <li style={{ marginBottom: SPACING.stack.xs }}>
                <strong style={{ color: COLORS.text.secondary }}>You're in good company.</strong> Our rating reflects positive feedback from users who trust our service.
              </li>
              <li>
                <strong style={{ color: COLORS.text.secondary }}>Fast, modern experience.</strong> Our site loads quickly, works on any device, and is easy to use—designed with user experience in mind.
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

