/**
 * Content Section Component - Terms Page
 *
 * Displays the main terms and conditions content with collapsible important notice and organized sections.
 * Uses design system tokens for consistent styling.
 *
 * @component
 * @returns {JSX.Element} Rendered terms content
 *
 * @example
 * <ContentSection />
 */

'use client';
import { useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

const termsSections = [
  {
    number: 1,
    title: 'Acceptance of Terms',
    content: 'By using the Smarter Payouts website and services, you agree to these terms and conditions. If you do not agree, please do not use our site.'
  },
  {
    number: 2,
    title: 'Platform Services & State Participation',
    items: [
      {
        label: 'Self-Quoting Platform:',
        text: 'Smarter Payouts operates primarily as a technology platform that enables users to obtain quotes for their structured settlement payments. Our AI-powered system, Mint, provides automated quote generation and information services.'
      },
      {
        label: 'Direct Participation:',
        text: 'Smarter Payouts may or may not directly participate in structured settlement transactions in all states. Our direct participation depends on:'
      }
    ],
    subList: [
      'State-specific licensing and bonding requirements',
      'Local regulatory compliance obligations',
      'Business operational decisions'
    ],
    footer: {
      label: 'State Inquiry:',
      text: 'Users should specifically ask our representatives about our participation status, licensing, and bonding in their particular state before proceeding with any transaction.'
    }
  },
  {
    number: 3,
    title: 'Use of the Website',
    list: [
      'You must be at least 18 years old to use our services.',
      'Do not use our site for unlawful or prohibited purposes.',
      'Information provided must be accurate and not misleading.'
    ]
  },
  {
    number: 4,
    title: 'Intellectual Property',
    list: [
      'All content, trademarks, and logos are the property of Smarter Payouts or its licensors.',
      'You may not copy, reproduce, or distribute content without permission.'
    ]
  },
  {
    number: 5,
    title: 'Disclaimers & Limitations',
    list: [
      'Information on this site is for general purposes only and not legal or financial advice.',
      'We do our best to keep information accurate but do not guarantee completeness or timeliness.',
      'Smarter Payouts is not liable for any damages arising from use of the site or services.',
      'Platform Limitation: As a self-quoting platform, we provide technology services and information. Our role and legal obligations vary by state based on licensing and participation status.'
    ]
  },
  {
    number: 6,
    title: 'User Responsibilities',
    list: [
      'Keep your login and personal information secure.',
      'Do not attempt to disrupt or harm the website or other users.',
      'State Verification: Users are responsible for verifying our participation status and licensing in their state before proceeding with any transaction.'
    ]
  },
  {
    number: 7,
    title: 'Changes to Terms',
    content: 'We may update these terms at any time. Changes will be posted on this page with a new effective date. Continued use of the site means you accept the new terms.'
  },
  {
    number: 8,
    title: 'Contact',
    content: 'If you have questions about these terms, contact us at ',
    hasEmail: true
  }
];

export default function ContentSection() {
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  return (
    <section
      aria-label="Terms and conditions content"
      style={{
        background: COLORS.backgrounds.white,
        paddingTop: SPACING.unit.xxxxl,
        paddingBottom: SPACING.unit.xxxxl,
        paddingLeft: SPACING.unit.md,
        paddingRight: SPACING.unit.md
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          background: COLORS.backgrounds.white,
          borderRadius: BORDER_RADIUS.large,
          padding: SPACING.card.comfortable,
          boxShadow: BOX_SHADOWS.small,
          border: `1px solid ${COLORS.borders.light}`
        }}>
          <div style={{ textAlign: 'center', marginBottom: SPACING.stack.xxl }}>
            <h2 style={{
              ...TEXT_PRESETS.heroTitle,
              background: COLORS.titleGradients.grayToGreen,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: SPACING.stack.md,
              fontSize: 'clamp(1.5rem, 3.5vw, 2rem)'
            }}>
              Our Terms of Service
            </h2>
            <p style={{
              fontSize: TYPOGRAPHY.fontSize.body.medium,
              color: COLORS.text.secondary,
              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
              marginBottom: SPACING.stack.lg
            }}>
              These terms govern your use of Smarter Payouts and our AI-powered platform.
            </p>
          </div>

          {/* COLLAPSIBLE IMPORTANT LEGAL NOTICE */}
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            border: '1px solid #fbbf24',
            borderRadius: BORDER_RADIUS.small,
            padding: SPACING.unit.md,
            marginBottom: SPACING.stack.xl
          }}>
            <div
              onClick={() => setIsNoticeOpen(!isNoticeOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                marginBottom: isNoticeOpen ? SPACING.unit.md : 0
              }}
            >
              <div style={{
                fontSize: TYPOGRAPHY.fontSize.body.small,
                color: '#92400e',
                fontWeight: TYPOGRAPHY.fontWeight.medium
              }}>
                <strong style={{ fontWeight: TYPOGRAPHY.fontWeight.bold }}>Important:</strong> Smarter Payouts Platform Notice
              </div>
              <span style={{
                fontSize: TYPOGRAPHY.fontSize.body.small,
                color: '#92400e',
                transition: 'transform 0.2s ease',
                transform: isNoticeOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                minWidth: '16px',
                textAlign: 'center',
                marginLeft: SPACING.inline.sm
              }}>
                ▼
              </span>
            </div>

            {isNoticeOpen && (
              <div style={{
                color: '#92400e',
                lineHeight: '1.5',
                fontSize: '0.75rem'
              }}>
                <p style={{ marginBottom: SPACING.unit.xs, marginTop: 0 }}>
                  <strong>Smarter Payouts is primarily a self-quoting platform</strong> that allows individuals to autonomously obtain quotes for their structured settlement payments through our AI-powered system. We provide technology and information services to help you evaluate your options.
                </p>
                <p style={{ marginBottom: SPACING.unit.xs, marginTop: 0 }}>
                  <strong>State Participation:</strong> Smarter Payouts may or may not participate directly in transactions in all states. Our participation varies by state based on local regulations and licensing requirements.
                </p>
                <p style={{ margin: 0 }}>
                  <strong>Licensing & Bonding:</strong> Some states (such as Georgia, Minnesota, and others) require specific licensing and bonding for structured settlement companies. Please ask our representatives which states we directly participate in and where we are licensed and bonded. In states where we do not directly participate, we may refer you to qualified affiliate partners.
                </p>
              </div>
            )}
          </div>

          {/* Terms Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.stack.xxl }}>
            {termsSections.map((section, index) => (
              <div key={index}>
                <h3 style={{
                  fontSize: TYPOGRAPHY.fontSize.heading.h5,
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  color: COLORS.primary.main,
                  marginBottom: SPACING.stack.md,
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING.inline.sm
                }}>
                  <span style={{
                    background: COLORS.backgrounds.greenLight,
                    borderRadius: BORDER_RADIUS.circle,
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: TYPOGRAPHY.fontSize.body.large,
                    fontWeight: TYPOGRAPHY.fontWeight.bold
                  }}>
                    {section.number}
                  </span>
                  {section.title}
                </h3>

                {section.content && (
                  <p style={{
                    color: COLORS.text.secondary,
                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                    fontSize: TYPOGRAPHY.fontSize.body.medium
                  }}>
                    {section.content}
                    {section.hasEmail && (
                      <a
                        href="mailto:support@smarterpayouts.com"
                        style={{
                          color: COLORS.primary.main,
                          fontWeight: TYPOGRAPHY.fontWeight.semibold,
                          textDecoration: 'none'
                        }}
                      >
                        support@smarterpayouts.com
                      </a>
                    )}
                    {section.content && section.hasEmail && '.'}
                  </p>
                )}

                {section.items && (
                  <div style={{
                    color: COLORS.text.secondary,
                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                    fontSize: TYPOGRAPHY.fontSize.body.medium
                  }}>
                    {section.items.map((item, idx) => (
                      <p key={idx} style={{ marginBottom: SPACING.stack.md }}>
                        <strong>{item.label}</strong> {item.text}
                      </p>
                    ))}
                  </div>
                )}

                {section.subList && (
                  <ul style={{
                    color: COLORS.text.secondary,
                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                    paddingLeft: SPACING.unit.xl,
                    marginBottom: SPACING.stack.md,
                    fontSize: TYPOGRAPHY.fontSize.body.medium
                  }}>
                    {section.subList.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.footer && (
                  <p style={{
                    color: COLORS.text.secondary,
                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                    margin: 0,
                    fontSize: TYPOGRAPHY.fontSize.body.medium
                  }}>
                    <strong>{section.footer.label}</strong> {section.footer.text}
                  </p>
                )}

                {section.list && (
                  <ul style={{
                    color: COLORS.text.secondary,
                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                    paddingLeft: SPACING.unit.xl,
                    fontSize: TYPOGRAPHY.fontSize.body.medium
                  }}>
                    {section.list.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: idx < section.list!.length - 1 ? SPACING.unit.xs : 0 }}>
                        {item.includes('Platform Limitation:') || item.includes('State Verification:') ? (
                          <strong>{item}</strong>
                        ) : (
                          item
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

