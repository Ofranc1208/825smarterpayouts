/**
 * Main Content Section Component - State Laws Overview Page
 * 
 * Displays the main content including legal disclaimer, key facts about state laws,
 * state categories by processing time, and common requirements across states.
 * Uses design system tokens for consistent styling.
 * 
 * @component
 * @returns {JSX.Element} Rendered main content section with legal info and state categories
 * 
 * @example
 * <MainContentSection />
 */

'use client';
import { useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';

export default function MainContentSection() {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isFastestOpen, setIsFastestOpen] = useState(false);
  const [isAverageOpen, setIsAverageOpen] = useState(false);
  const [isDetailedOpen, setIsDetailedOpen] = useState(false);
  return (
    <section style={{ 
      paddingTop: SPACING.unit.xxxl,
      paddingBottom: SPACING.unit.xxxl,
      paddingLeft: SPACING.unit.md,
      paddingRight: SPACING.unit.md,
      background: COLORS.backgrounds.white
    }}>
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto'
      }}>
            
            {/* Legal Disclaimer - Collapsible */}
        <div style={{
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
          border: `2px solid ${COLORS.accent.gold}`,
          borderRadius: BORDER_RADIUS.small,
          padding: SPACING.unit.md,
          marginBottom: SPACING.unit.xxxxl
        }}>
          <div
            onClick={() => setIsDisclaimerOpen(!isDisclaimerOpen)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: isDisclaimerOpen ? SPACING.unit.xs : '0'
            }}
          >
            <h4 style={{
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              fontSize: TYPOGRAPHY.fontSize.body.small,
              color: COLORS.accent.goldDarker,
              display: 'flex',
              alignItems: 'center',
              gap: SPACING.unit.xxs,
              margin: 0
            }}>
              <span>⚠️</span>
              Legal Compliance Notice
            </h4>
            <span style={{
              fontSize: TYPOGRAPHY.fontSize.body.small,
              color: COLORS.accent.goldDarker,
              transition: 'transform 0.2s ease',
              transform: isDisclaimerOpen ? 'rotate(180deg)' : 'rotate(0deg)'
            }}>
              ▼
            </span>
          </div>
          {isDisclaimerOpen && (
            <>
              <p style={{
                marginBottom: SPACING.unit.xs,
                color: COLORS.text.secondary,
                lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                fontSize: TYPOGRAPHY.fontSize.body.xsmall
              }}>
                <strong>Important:</strong> The state law information and compliance details provided here are gathered for informational purposes only. 
                State laws and court requirements change frequently and vary by jurisdiction.
              </p>
              <p style={{
                marginBottom: 0,
                color: COLORS.text.secondary,
                lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                fontSize: TYPOGRAPHY.fontSize.body.xsmall
              }}>
                Our affiliate partners are responsible for ensuring compliance with local regulations in their respective states. 
                <strong> Always consult with a qualified attorney</strong> licensed in your state and specializing in structured settlements 
                to ensure full compliance with current legal requirements. This information should not be considered legal advice.
              </p>
            </>
          )}
        </div>
            
            {/* Key Facts */}
        <div style={{
          background: COLORS.backgrounds.white,
          padding: SPACING.card.standard,
          borderRadius: BORDER_RADIUS.large,
          boxShadow: BOX_SHADOWS.medium,
          border: `2px solid #e9f9f1`,
          marginBottom: SPACING.unit.xxxxl
        }}>
          <h2 style={{
            fontSize: TYPOGRAPHY.fontSize.heading.h3,
            fontWeight: TYPOGRAPHY.fontWeight.bold,
            marginBottom: SPACING.stack.md,
            color: COLORS.text.primary
          }}>
                🗺️ Key Facts About State Laws
              </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: SPACING.grid.standard
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: SPACING.inline.md
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: BORDER_RADIUS.full,
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: COLORS.backgrounds.white,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: TYPOGRAPHY.fontWeight.bold,
                flexShrink: 0
              }}>
                ✓
                    </div>
                    <div>
                <h5 style={{
                  fontSize: TYPOGRAPHY.fontSize.body.large,
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  marginBottom: SPACING.unit.xs,
                  color: COLORS.text.primary
                }}>All 50 States Covered</h5>
                <p style={{
                  color: COLORS.neutral.gray500,
                  fontSize: TYPOGRAPHY.fontSize.body.small,
                  marginBottom: 0,
                  lineHeight: TYPOGRAPHY.lineHeight.normal
                }}>Structured settlement sales are legal in 50+ states through licensed affiliate partners</p>
                    </div>
                  </div>

            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: SPACING.inline.md
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: BORDER_RADIUS.full,
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: COLORS.backgrounds.white,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: TYPOGRAPHY.fontSize.body.large,
                flexShrink: 0
              }}>
                ⚖️
                    </div>
                    <div>
                <h5 style={{
                  fontSize: TYPOGRAPHY.fontSize.body.large,
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  marginBottom: SPACING.unit.xs,
                  color: COLORS.text.primary
                }}>Court Approval Required</h5>
                <p style={{
                  color: COLORS.neutral.gray500,
                  fontSize: TYPOGRAPHY.fontSize.body.small,
                  marginBottom: 0,
                  lineHeight: TYPOGRAPHY.lineHeight.normal
                }}>Every state requires court approval to protect consumers</p>
                    </div>
                  </div>

            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: SPACING.inline.md
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: BORDER_RADIUS.full,
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: COLORS.backgrounds.white,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: TYPOGRAPHY.fontSize.body.large,
                flexShrink: 0
              }}>
                🤝
                    </div>
                    <div>
                <h5 style={{
                  fontSize: TYPOGRAPHY.fontSize.body.large,
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  marginBottom: SPACING.unit.xs,
                  color: COLORS.text.primary
                }}>Affiliate Partners</h5>
                <p style={{
                  color: COLORS.neutral.gray500,
                  fontSize: TYPOGRAPHY.fontSize.body.small,
                  marginBottom: 0,
                  lineHeight: TYPOGRAPHY.lineHeight.normal
                }}>We work with licensed partners across 50+ states ensuring full compliance</p>
                    </div>
                  </div>

            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: SPACING.inline.md
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: BORDER_RADIUS.full,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: COLORS.backgrounds.white,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: TYPOGRAPHY.fontSize.body.large,
                flexShrink: 0
              }}>
                ⚡
                    </div>
                    <div>
                <h5 style={{
                  fontSize: TYPOGRAPHY.fontSize.body.large,
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  marginBottom: SPACING.unit.xs,
                  color: COLORS.text.primary
                }}>AI-Powered Process</h5>
                <p style={{
                  color: COLORS.neutral.gray500,
                  fontSize: TYPOGRAPHY.fontSize.body.small,
                  marginBottom: 0,
                  lineHeight: TYPOGRAPHY.lineHeight.normal
                }}>Mint AI helps guide you through state-specific requirements</p>
                  </div>
                </div>
              </div>
            </div>

            {/* State Categories - Collapsible */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: SPACING.grid.comfortable,
            marginBottom: SPACING.unit.xxxxl
          }}>
            {/* Fastest States Card */}
            <div style={{
              background: COLORS.backgrounds.white,
              borderRadius: BORDER_RADIUS.small,
              boxShadow: BOX_SHADOWS.small,
              border: `1px solid ${COLORS.borders.light}`,
              overflow: 'hidden'
            }}>
              <div
                onClick={() => setIsFastestOpen(!isFastestOpen)}
                style={{
                  cursor: 'pointer',
                  padding: SPACING.unit.md,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
                  borderBottom: isFastestOpen ? `1px solid ${COLORS.borders.light}` : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.inline.sm }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: BORDER_RADIUS.small,
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    color: COLORS.backgrounds.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}>🚀</div>
                  <div>
                    <h3 style={{
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      fontWeight: TYPOGRAPHY.fontWeight.bold,
                      color: COLORS.primary.main,
                      margin: 0
                    }}>Fastest States</h3>
                    <p style={{
                      fontSize: TYPOGRAPHY.fontSize.body.xsmall,
                      color: COLORS.neutral.gray500,
                      margin: 0
                    }}>15-30 days average</p>
                  </div>
                </div>
                <span style={{
                  fontSize: TYPOGRAPHY.fontSize.body.small,
                  color: COLORS.primary.main,
                  transition: 'transform 0.2s ease',
                  transform: isFastestOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>▼</span>
              </div>
              {isFastestOpen && (
                <div style={{
                  padding: `${SPACING.unit.lg} ${SPACING.unit.md}`,
                  background: 'rgba(240, 253, 244, 0.3)'
                }}>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: SPACING.unit.sm,
                    maxWidth: '280px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}>
                    <li style={{
                      padding: `${SPACING.unit.sm} ${SPACING.unit.md}`,
                      background: COLORS.backgrounds.white,
                      borderRadius: BORDER_RADIUS.small,
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      fontWeight: TYPOGRAPHY.fontWeight.medium,
                      color: COLORS.text.primary,
                      textAlign: 'center',
                      boxShadow: BOX_SHADOWS.sm,
                      border: `1px solid ${COLORS.borders.light}`
                    }}>Florida</li>
                    <li style={{
                      padding: `${SPACING.unit.sm} ${SPACING.unit.md}`,
                      background: COLORS.backgrounds.white,
                      borderRadius: BORDER_RADIUS.small,
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      fontWeight: TYPOGRAPHY.fontWeight.medium,
                      color: COLORS.text.primary,
                      textAlign: 'center',
                      boxShadow: BOX_SHADOWS.sm,
                      border: `1px solid ${COLORS.borders.light}`
                    }}>Texas</li>
                    <li style={{
                      padding: `${SPACING.unit.sm} ${SPACING.unit.md}`,
                      background: COLORS.backgrounds.white,
                      borderRadius: BORDER_RADIUS.small,
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      fontWeight: TYPOGRAPHY.fontWeight.medium,
                      color: COLORS.text.primary,
                      textAlign: 'center',
                      boxShadow: BOX_SHADOWS.sm,
                      border: `1px solid ${COLORS.borders.light}`
                    }}>Nevada</li>
                    <li style={{
                      padding: `${SPACING.unit.sm} ${SPACING.unit.md}`,
                      background: COLORS.backgrounds.white,
                      borderRadius: BORDER_RADIUS.small,
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      fontWeight: TYPOGRAPHY.fontWeight.medium,
                      color: COLORS.text.primary,
                      textAlign: 'center',
                      boxShadow: BOX_SHADOWS.sm,
                      border: `1px solid ${COLORS.borders.light}`
                    }}>Arizona</li>
                    <li style={{
                      padding: `${SPACING.unit.sm} ${SPACING.unit.md}`,
                      background: COLORS.backgrounds.white,
                      borderRadius: BORDER_RADIUS.small,
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      fontWeight: TYPOGRAPHY.fontWeight.medium,
                      color: COLORS.text.primary,
                      textAlign: 'center',
                      boxShadow: BOX_SHADOWS.sm,
                      border: `1px solid ${COLORS.borders.light}`
                    }}>Georgia</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Average States Card */}
            <div style={{
              background: COLORS.backgrounds.white,
              borderRadius: BORDER_RADIUS.small,
              boxShadow: BOX_SHADOWS.small,
              border: `1px solid ${COLORS.borders.light}`,
              overflow: 'hidden'
            }}>
              <div
                onClick={() => setIsAverageOpen(!isAverageOpen)}
                style={{
                  cursor: 'pointer',
                  padding: SPACING.unit.md,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                  borderBottom: isAverageOpen ? `1px solid ${COLORS.borders.light}` : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.inline.sm }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: BORDER_RADIUS.small,
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: COLORS.backgrounds.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}>⚖️</div>
                  <div>
                    <h3 style={{
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      fontWeight: TYPOGRAPHY.fontWeight.bold,
                      color: COLORS.accent.gold,
                      margin: 0
                    }}>Average States</h3>
                    <p style={{
                      fontSize: TYPOGRAPHY.fontSize.body.xsmall,
                      color: COLORS.neutral.gray500,
                      margin: 0
                    }}>25-40 days average</p>
                  </div>
                </div>
                <span style={{
                  fontSize: TYPOGRAPHY.fontSize.body.small,
                  color: COLORS.accent.gold,
                  transition: 'transform 0.2s ease',
                  transform: isAverageOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>▼</span>
              </div>
              {isAverageOpen && (
                <div style={{
                  padding: `${SPACING.unit.lg} ${SPACING.unit.md}`,
                  background: 'rgba(255, 251, 235, 0.3)'
                }}>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: SPACING.unit.sm,
                    maxWidth: '280px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}>
                    <li style={{
                      padding: `${SPACING.unit.sm} ${SPACING.unit.md}`,
                      background: COLORS.backgrounds.white,
                      borderRadius: BORDER_RADIUS.small,
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      fontWeight: TYPOGRAPHY.fontWeight.medium,
                      color: COLORS.text.primary,
                      textAlign: 'center',
                      boxShadow: BOX_SHADOWS.sm,
                      border: `1px solid ${COLORS.borders.light}`
                    }}>Pennsylvania</li>
                    <li style={{
                      padding: `${SPACING.unit.sm} ${SPACING.unit.md}`,
                      background: COLORS.backgrounds.white,
                      borderRadius: BORDER_RADIUS.small,
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      fontWeight: TYPOGRAPHY.fontWeight.medium,
                      color: COLORS.text.primary,
                      textAlign: 'center',
                      boxShadow: BOX_SHADOWS.sm,
                      border: `1px solid ${COLORS.borders.light}`
                    }}>Ohio</li>
                    <li style={{
                      padding: `${SPACING.unit.sm} ${SPACING.unit.md}`,
                      background: COLORS.backgrounds.white,
                      borderRadius: BORDER_RADIUS.small,
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      fontWeight: TYPOGRAPHY.fontWeight.medium,
                      color: COLORS.text.primary,
                      textAlign: 'center',
                      boxShadow: BOX_SHADOWS.sm,
                      border: `1px solid ${COLORS.borders.light}`
                    }}>Illinois</li>
                    <li style={{
                      padding: `${SPACING.unit.sm} ${SPACING.unit.md}`,
                      background: COLORS.backgrounds.white,
                      borderRadius: BORDER_RADIUS.small,
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      fontWeight: TYPOGRAPHY.fontWeight.medium,
                      color: COLORS.text.primary,
                      textAlign: 'center',
                      boxShadow: BOX_SHADOWS.sm,
                      border: `1px solid ${COLORS.borders.light}`
                    }}>Michigan</li>
                    <li style={{
                      padding: `${SPACING.unit.sm} ${SPACING.unit.md}`,
                      background: COLORS.backgrounds.white,
                      borderRadius: BORDER_RADIUS.small,
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      fontWeight: TYPOGRAPHY.fontWeight.medium,
                      color: COLORS.text.primary,
                      textAlign: 'center',
                      boxShadow: BOX_SHADOWS.sm,
                      border: `1px solid ${COLORS.borders.light}`
                    }}>North Carolina</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Detailed Review Card */}
            <div style={{
              background: COLORS.backgrounds.white,
              borderRadius: BORDER_RADIUS.small,
              boxShadow: BOX_SHADOWS.small,
              border: `1px solid ${COLORS.borders.light}`,
              overflow: 'hidden'
            }}>
              <div
                onClick={() => setIsDetailedOpen(!isDetailedOpen)}
                style={{
                  cursor: 'pointer',
                  padding: SPACING.unit.md,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                  borderBottom: isDetailedOpen ? `1px solid ${COLORS.borders.light}` : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.inline.sm }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: BORDER_RADIUS.small,
                    background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                    color: COLORS.backgrounds.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}>📋</div>
                  <div>
                    <h3 style={{
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      fontWeight: TYPOGRAPHY.fontWeight.bold,
                      color: COLORS.neutral.gray500,
                      margin: 0
                    }}>Detailed Review</h3>
                    <p style={{
                      fontSize: TYPOGRAPHY.fontSize.body.xsmall,
                      color: COLORS.neutral.gray500,
                      margin: 0
                    }}>30-50 days average</p>
                  </div>
                </div>
                <span style={{
                  fontSize: TYPOGRAPHY.fontSize.body.small,
                  color: COLORS.neutral.gray500,
                  transition: 'transform 0.2s ease',
                  transform: isDetailedOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>▼</span>
              </div>
              {isDetailedOpen && (
                <div style={{
                  padding: `${SPACING.unit.lg} ${SPACING.unit.md}`,
                  background: 'rgba(243, 244, 246, 0.3)'
                }}>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: SPACING.unit.sm,
                    maxWidth: '280px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}>
                    <li style={{
                      padding: `${SPACING.unit.sm} ${SPACING.unit.md}`,
                      background: COLORS.backgrounds.white,
                      borderRadius: BORDER_RADIUS.small,
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      fontWeight: TYPOGRAPHY.fontWeight.medium,
                      color: COLORS.text.primary,
                      textAlign: 'center',
                      boxShadow: BOX_SHADOWS.sm,
                      border: `1px solid ${COLORS.borders.light}`
                    }}>New York</li>
                    <li style={{
                      padding: `${SPACING.unit.sm} ${SPACING.unit.md}`,
                      background: COLORS.backgrounds.white,
                      borderRadius: BORDER_RADIUS.small,
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      fontWeight: TYPOGRAPHY.fontWeight.medium,
                      color: COLORS.text.primary,
                      textAlign: 'center',
                      boxShadow: BOX_SHADOWS.sm,
                      border: `1px solid ${COLORS.borders.light}`
                    }}>California</li>
                    <li style={{
                      padding: `${SPACING.unit.sm} ${SPACING.unit.md}`,
                      background: COLORS.backgrounds.white,
                      borderRadius: BORDER_RADIUS.small,
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      fontWeight: TYPOGRAPHY.fontWeight.medium,
                      color: COLORS.text.primary,
                      textAlign: 'center',
                      boxShadow: BOX_SHADOWS.sm,
                      border: `1px solid ${COLORS.borders.light}`
                    }}>New Jersey</li>
                    <li style={{
                      padding: `${SPACING.unit.sm} ${SPACING.unit.md}`,
                      background: COLORS.backgrounds.white,
                      borderRadius: BORDER_RADIUS.small,
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      fontWeight: TYPOGRAPHY.fontWeight.medium,
                      color: COLORS.text.primary,
                      textAlign: 'center',
                      boxShadow: BOX_SHADOWS.sm,
                      border: `1px solid ${COLORS.borders.light}`
                    }}>Massachusetts</li>
                    <li style={{
                      padding: `${SPACING.unit.sm} ${SPACING.unit.md}`,
                      background: COLORS.backgrounds.white,
                      borderRadius: BORDER_RADIUS.small,
                      fontSize: TYPOGRAPHY.fontSize.body.medium,
                      fontWeight: TYPOGRAPHY.fontWeight.medium,
                      color: COLORS.text.primary,
                      textAlign: 'center',
                      boxShadow: BOX_SHADOWS.sm,
                      border: `1px solid ${COLORS.borders.light}`
                    }}>Connecticut</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

            {/* Common Requirements */}
        <div style={{
          background: COLORS.backgrounds.white,
          padding: SPACING.card.standard,
          borderRadius: BORDER_RADIUS.large,
          boxShadow: BOX_SHADOWS.medium,
          border: `2px solid #e9f9f1`,
          marginBottom: SPACING.unit.xxxxl
        }}>
          <h2 style={{
            fontSize: TYPOGRAPHY.fontSize.heading.h3,
            fontWeight: TYPOGRAPHY.fontWeight.bold,
            marginBottom: SPACING.stack.md,
            color: COLORS.text.primary
          }}>
                Common Requirements Across States
              </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: SPACING.grid.standard
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: SPACING.inline.md
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: BORDER_RADIUS.full,
                background: COLORS.neutral.gray100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <span style={{ fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.primary.main }}>1</span>
                    </div>
                    <div>
                <h5 style={{
                  fontSize: TYPOGRAPHY.fontSize.body.large,
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  marginBottom: SPACING.unit.xs,
                  color: COLORS.text.primary
                }}>Court Petition Filing</h5>
                <p style={{
                  color: COLORS.neutral.gray500,
                  fontSize: TYPOGRAPHY.fontSize.body.small,
                  marginBottom: 0,
                  lineHeight: TYPOGRAPHY.lineHeight.normal
                }}>Legal documentation filed with the appropriate court</p>
                    </div>
                  </div>

            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: SPACING.inline.md
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: BORDER_RADIUS.full,
                background: COLORS.neutral.gray100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <span style={{ fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.primary.main }}>2</span>
                    </div>
                    <div>
                <h5 style={{
                  fontSize: TYPOGRAPHY.fontSize.body.large,
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  marginBottom: SPACING.unit.xs,
                  color: COLORS.text.primary
                }}>Judge Review</h5>
                <p style={{
                  color: COLORS.neutral.gray500,
                  fontSize: TYPOGRAPHY.fontSize.body.small,
                  marginBottom: 0,
                  lineHeight: TYPOGRAPHY.lineHeight.normal
                }}>Court review to ensure the sale is in your best interest</p>
                    </div>
                  </div>

            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: SPACING.inline.md
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: BORDER_RADIUS.full,
                background: COLORS.neutral.gray100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <span style={{ fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.primary.main }}>3</span>
                    </div>
                    <div>
                <h5 style={{
                  fontSize: TYPOGRAPHY.fontSize.body.large,
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  marginBottom: SPACING.unit.xs,
                  color: COLORS.text.primary
                }}>Professional Advice</h5>
                <p style={{
                  color: COLORS.neutral.gray500,
                  fontSize: TYPOGRAPHY.fontSize.body.small,
                  marginBottom: 0,
                  lineHeight: TYPOGRAPHY.lineHeight.normal
                }}>Independent advice recommended or required</p>
                    </div>
                  </div>

            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: SPACING.inline.md
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: BORDER_RADIUS.full,
                background: COLORS.neutral.gray100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <span style={{ fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.primary.main }}>4</span>
                    </div>
                    <div>
                <h5 style={{
                  fontSize: TYPOGRAPHY.fontSize.body.large,
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  marginBottom: SPACING.unit.xs,
                  color: COLORS.text.primary
                }}>Full Disclosure</h5>
                <p style={{
                  color: COLORS.neutral.gray500,
                  fontSize: TYPOGRAPHY.fontSize.body.small,
                  marginBottom: 0,
                  lineHeight: TYPOGRAPHY.lineHeight.normal
                }}>Complete transparency of terms and fees</p>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </section>
  );
}

