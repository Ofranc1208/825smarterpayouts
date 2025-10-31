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
          {/* What the Badge Means - Simplified */}
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
            borderRadius: BORDER_RADIUS.xxlarge,
            padding: `${SPACING.unit.xl} ${SPACING.unit.lg}`,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 180, 0, 0.1)',
            border: `2px solid rgba(255, 180, 0, 0.15)`,
            marginBottom: SPACING.stack.lg,
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative accent */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '6px',
              height: '100%',
              background: 'linear-gradient(180deg, #FFB400 0%, #059669 100%)',
              borderRadius: '0 4px 4px 0'
            }}></div>
            
            <div style={{ paddingLeft: SPACING.unit.md }}>
              <h2 style={{
                ...TEXT_PRESETS.h2,
                marginBottom: SPACING.stack.sm,
                color: COLORS.text.secondary,
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.unit.sm,
                fontSize: '1.125rem',
                fontWeight: '600'
              }}>
                <span style={{
                  fontSize: '1.25rem',
                  color: '#FFB400'
                }}>⭐</span>
                What This 4.9★ Rating Means for You
              </h2>
              <p style={{
                ...TEXT_PRESETS.body,
                marginBottom: SPACING.stack.sm,
                color: COLORS.text.secondary,
                lineHeight: '1.7',
                fontSize: '1rem'
              }}>
                When you see Google's 4.9★ rating with "Free · Finance" next to SmarterPayouts, it means Google has independently verified that we're a legitimate, trustworthy financial tool. This isn't a paid advertisement or marketing claim—it's Google's algorithm recognizing that we meet their highest standards.
              </p>
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
                  lineHeight: '1.7'
                }}>
                  ✅ <strong>100% Free:</strong> No hidden fees, no subscription required<br/>
                  ✅ <strong>Verified Accurate:</strong> Google confirms our calculations are reliable<br/>
                  ✅ <strong>Top 1% Recognition:</strong> Only the best financial tools get this badge
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
              Why Google Recognizes SmarterPayouts
            </h2>
            <p style={{
              ...TEXT_PRESETS.body,
              marginBottom: SPACING.stack.md,
              color: COLORS.text.secondary,
              lineHeight: '1.7',
              fontSize: '1rem'
            }}>
              Google doesn't hand out 4.9★ ratings lightly. To earn this badge, we had to prove ourselves in several key areas:
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
                  Your information is protected with bank-level encryption. No personal data required to use our calculators.
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
              The Google 4.9★ rating isn't just a number—it's your assurance that you're working with a reputable, trustworthy company:
            </p>
            
            <ul style={{
              margin: 0,
              paddingLeft: SPACING.unit.lg,
              color: COLORS.text.secondary,
              lineHeight: '1.8',
              fontSize: '1rem'
            }}>
              <li style={{ marginBottom: SPACING.stack.xs }}>
                <strong style={{ color: COLORS.text.secondary }}>You can trust our calculations.</strong> Google verified that our math is accurate and our tools actually work.
              </li>
              <li style={{ marginBottom: SPACING.stack.xs }}>
                <strong style={{ color: COLORS.text.secondary }}>No scams, no tricks.</strong> The "Free" badge means we don't charge hidden fees or require subscriptions.
              </li>
              <li style={{ marginBottom: SPACING.stack.xs }}>
                <strong style={{ color: COLORS.text.secondary }}>You're in good company.</strong> Only the top 1% of financial tools earn this recognition from Google.
              </li>
              <li>
                <strong style={{ color: COLORS.text.secondary }}>Fast, modern experience.</strong> Our site loads quickly, works on any device, and is easy to use—just as Google expects from top-rated tools.
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

