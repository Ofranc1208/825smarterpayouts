'use client';

/**
 * Factors Section Component - How Fast Page
 * 
 * Displays collapsible factors that speed up or slow down the settlement process.
 * Uses design system tokens for consistent styling.
 * Fully accessible with semantic HTML and proper ARIA labels.
 * 
 * @component
 * @returns {JSX.Element} Rendered factors section
 * 
 * @example
 * <FactorsSection />
 */

import { useState } from 'react';
import Button from '@/src/components/shared/Button';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';
import type { Factor } from '../types';

const speedUpFactors: Factor[] = [
  { icon: '✓', text: 'Complete documentation ready', description: 'All papers organized and available' },
  { icon: '✓', text: 'Clear settlement agreement', description: 'No ambiguities or missing clauses' },
  { icon: '⚖', text: 'Available court dates', description: 'Flexible scheduling with judge availability' },
  { icon: '✓', text: 'Electronic payment setup', description: 'Direct deposit faster than checks' },
  { icon: '✓', text: 'Responsive communication', description: 'Quick replies to requests' }
];

const slowDownFactors: Factor[] = [
  { icon: '✗', text: 'Missing or incomplete documents', description: 'Delays while gathering paperwork' },
  { icon: '✗', text: 'Complex settlement structures', description: 'Multiple annuities or unusual terms' },
  { icon: '✗', text: 'Busy court schedules', description: 'Limited hearing availability' },
  { icon: '✗', text: 'State-specific requirements', description: 'Additional local regulations' },
  { icon: '✗', text: 'Holiday court closures', description: 'Courts closed during holidays' }
];

export default function FactorsSection() {
  const [isSpeedUpOpen, setIsSpeedUpOpen] = useState(false);
  const [isSlowDownOpen, setIsSlowDownOpen] = useState(false);

  return (
    <section
      id="factors"
      aria-label="Factors affecting payout speed"
      style={{
        paddingTop: SPACING.unit.lg,
        paddingBottom: SPACING.unit.lg,
        paddingLeft: SPACING.unit.md,
        paddingRight: SPACING.unit.md,
        background: COLORS.backgrounds.white
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: SPACING.stack.lg
        }}>
          <h2 style={{
            fontSize: TYPOGRAPHY.fontSize.heading.h3,
            fontWeight: TYPOGRAPHY.fontWeight.bold,
            color: COLORS.text.primary,
            marginBottom: SPACING.stack.sm
          }}>
            What Affects How Fast You Get Paid
          </h2>
          <p style={{
            fontSize: TYPOGRAPHY.fontSize.body.large,
            color: COLORS.text.secondary,
            maxWidth: '600px',
            margin: `0 auto ${SPACING.stack.sm}`
          }}>
            Understanding these factors helps you prepare for the fastest possible payout
          </p>
          <Button
            as="a"
            href="/mint-intelligent-chat?chat=open&feature=calculator"
            variant="mint-chat"
            size="md"
            enhancedHover={true}
          >
            Ask Mint About Your Timeline
          </Button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: SPACING.grid.standard
        }}>
          {/* Speed Up Factors - Collapsible */}
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            borderRadius: BORDER_RADIUS.xlarge,
            border: `2px solid ${COLORS.borders.light}`,
            overflow: 'hidden'
          }}>
            {/* Clickable Header */}
            <div
              onClick={() => setIsSpeedUpOpen(!isSpeedUpOpen)}
              style={{
                padding: SPACING.card.compact,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.inline.md,
                flex: 1
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: COLORS.backgrounds.white,
                  borderRadius: BORDER_RADIUS.circle,
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: TYPOGRAPHY.fontSize.heading.h4,
                  flexShrink: 0
                }}>✓</div>
                <h3 style={{
                  fontSize: TYPOGRAPHY.fontSize.heading.h5,
                  fontWeight: TYPOGRAPHY.fontWeight.bold,
                  color: COLORS.text.primary,
                  margin: 0
                }}>Factors That Speed Things Up</h3>
              </div>
              <span style={{
                fontSize: TYPOGRAPHY.fontSize.body.medium,
                color: COLORS.text.secondary,
                transition: 'transform 0.2s ease',
                transform: isSpeedUpOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                marginLeft: SPACING.inline.sm
              }}>
                ▼
              </span>
            </div>

            {/* Collapsible Content */}
            {isSpeedUpOpen && (
              <div style={{
                padding: SPACING.card.compact,
                paddingTop: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: SPACING.grid.tight
              }}>
                {speedUpFactors.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: SPACING.inline.sm,
                    padding: SPACING.unit.md,
                    background: COLORS.backgrounds.white,
                    borderRadius: BORDER_RADIUS.medium,
                    border: `1px solid ${COLORS.borders.light}`
                  }}>
                    <div style={{
                      fontSize: TYPOGRAPHY.fontSize.heading.h5,
                      minWidth: '24px'
                    }}>{item.icon}</div>
                    <div>
                      <div style={{
                        fontWeight: TYPOGRAPHY.fontWeight.semibold,
                        color: COLORS.text.primary,
                        marginBottom: SPACING.unit.xxs,
                        fontSize: TYPOGRAPHY.fontSize.body.small
                      }}>{item.text}</div>
                      <div style={{
                        fontSize: TYPOGRAPHY.fontSize.body.small,
                        color: COLORS.text.secondary
                      }}>{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Slow Down Factors - Collapsible */}
          <div style={{
            background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
            borderRadius: BORDER_RADIUS.xlarge,
            border: `2px solid ${COLORS.accent.gold}`,
            overflow: 'hidden'
          }}>
            {/* Clickable Header */}
            <div
              onClick={() => setIsSlowDownOpen(!isSlowDownOpen)}
              style={{
                padding: SPACING.card.compact,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.inline.md,
                flex: 1
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: COLORS.backgrounds.white,
                  borderRadius: BORDER_RADIUS.circle,
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: TYPOGRAPHY.fontSize.heading.h4,
                  flexShrink: 0
                }}>✗</div>
                <h3 style={{
                  fontSize: TYPOGRAPHY.fontSize.heading.h5,
                  fontWeight: TYPOGRAPHY.fontWeight.bold,
                  color: COLORS.accent.goldDarker,
                  margin: 0
                }}>Factors That Can Slow Things Down</h3>
              </div>
              <span style={{
                fontSize: TYPOGRAPHY.fontSize.body.medium,
                color: COLORS.text.secondary,
                transition: 'transform 0.2s ease',
                transform: isSlowDownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                marginLeft: SPACING.inline.sm
              }}>
                ▼
              </span>
            </div>

            {/* Collapsible Content */}
            {isSlowDownOpen && (
              <div style={{
                padding: SPACING.card.compact,
                paddingTop: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: SPACING.grid.tight
              }}>
                {slowDownFactors.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: SPACING.inline.sm,
                    padding: SPACING.unit.md,
                    background: COLORS.backgrounds.white,
                    borderRadius: BORDER_RADIUS.medium,
                    border: `1px solid ${COLORS.accent.gold}`
                  }}>
                    <div style={{
                      fontSize: TYPOGRAPHY.fontSize.heading.h5,
                      minWidth: '24px'
                    }}>{item.icon}</div>
                    <div>
                      <div style={{
                        fontWeight: TYPOGRAPHY.fontWeight.semibold,
                        color: COLORS.accent.goldDarker,
                        marginBottom: SPACING.unit.xxs,
                        fontSize: TYPOGRAPHY.fontSize.body.small
                      }}>{item.text}</div>
                      <div style={{
                        fontSize: TYPOGRAPHY.fontSize.body.small,
                        color: COLORS.text.secondary
                      }}>{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mint AI Tip Box */}
        <div style={{
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          borderRadius: BORDER_RADIUS.large,
          padding: SPACING.card.compact,
          marginTop: SPACING.stack.lg,
          border: `1px solid ${COLORS.borders.light}`,
          textAlign: 'center'
        }}>
          <div style={{
            fontWeight: TYPOGRAPHY.fontWeight.bold,
            color: COLORS.primary.tech,
            fontSize: TYPOGRAPHY.fontSize.body.large,
            marginBottom: SPACING.unit.xs
          }}>
            Mint AI Tip
          </div>
          <p style={{
            color: COLORS.primary.tech,
            marginBottom: SPACING.stack.sm,
            fontSize: TYPOGRAPHY.fontSize.body.medium,
            lineHeight: TYPOGRAPHY.lineHeight.relaxed
          }}>
            <strong>Pro Tip:</strong> Our AI can analyze your specific situation and predict your exact timeline based on your state,
            settlement type, and current court schedules. Get a personalized timeline estimate in seconds!
          </p>
          <Button
            as="a"
            href="/mint-intelligent-chat?chat=open&feature=calculator"
            variant="mint-chat"
            size="lg"
            enhancedHover={true}
          >
            Get My Personalized Timeline
          </Button>
        </div>
      </div>
    </section>
  );
}
