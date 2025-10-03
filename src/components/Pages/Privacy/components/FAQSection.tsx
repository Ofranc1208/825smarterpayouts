/**
 * FAQ Section Component - Privacy Page
 *
 * Displays privacy-related frequently asked questions with collapsible answers.
 * Includes Mint AI helper and trust badge.
 *
 * @component
 * @returns {JSX.Element} Rendered FAQ section with collapsible questions
 *
 * @example
 * <FAQSection />
 */

import Button from '@/src/components/shared/Button/Button';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';

const faqs = [
  {
    question: 'Do you sell my information?',
    answer: 'No. We never sell or rent your personal information to third parties. This is a core commitment of our privacy policy.'
  },
  {
    question: 'How can I update or delete my data?',
    answer: 'Email us at support@smarterpayouts.com and we\'ll help you with your request. We respond to all privacy requests within 24-48 hours.',
    hasEmail: true
  },
  {
    question: 'Are my quotes confidential?',
    answer: 'Yes. All quotes and communications are handled securely and confidentially. Your payment information is never shared without your explicit consent.'
  },
  {
    question: 'How do you protect my data from breaches?',
    answer: 'We use industry-standard SSL encryption, secure servers, and regularly update our security protocols. All sensitive data is encrypted both in transit and at rest.'
  }
];

export default function FAQSection() {
  return (
    <section
      aria-label="Privacy FAQ section"
      style={{
        background: '#f9fafb',
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
          boxShadow: BOX_SHADOWS.small
        }}>
          <h2 style={{
            fontSize: TYPOGRAPHY.fontSize.heading.h3,
            fontWeight: TYPOGRAPHY.fontWeight.bold,
            color: COLORS.text.primary,
            marginBottom: SPACING.stack.xl,
            textAlign: 'center'
          }}>
            Privacy FAQ
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.stack.md }}>
            {faqs.map((faq, index) => (
              <details
                key={index}
                style={{
                  border: `1px solid ${COLORS.borders.light}`,
                  borderRadius: BORDER_RADIUS.medium,
                  padding: SPACING.unit.lg
                }}
              >
                <summary style={{
                  fontWeight: TYPOGRAPHY.fontWeight.semibold,
                  color: COLORS.text.primary,
                  cursor: 'pointer',
                  fontSize: TYPOGRAPHY.fontSize.body.large
                }}>
                  {faq.question}
                </summary>
                <div style={{
                  marginTop: SPACING.stack.md,
                  color: COLORS.text.secondary,
                  lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                  fontSize: TYPOGRAPHY.fontSize.body.medium
                }}>
                  {faq.hasEmail ? (
                    <>
                      Email us at{' '}
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
                      {' '}and we'll help you with your request. We respond to all privacy requests within 24-48 hours.
                    </>
                  ) : (
                    faq.answer
                  )}
                </div>
              </details>
            ))}
          </div>

          {/* Mint AI Help Section */}
          <div style={{
            marginTop: SPACING.stack.xl,
            padding: SPACING.card.standard,
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            borderRadius: BORDER_RADIUS.medium,
            border: `1px solid ${COLORS.borders.light}`,
            textAlign: 'center'
          }}>
            <h3 style={{
              color: COLORS.primary.tech,
              fontWeight: TYPOGRAPHY.fontWeight.bold,
              fontSize: TYPOGRAPHY.fontSize.body.large,
              marginBottom: SPACING.unit.xs
            }}>
              ✨ Have Privacy Questions?
            </h3>
            <p style={{
              color: COLORS.text.secondary,
              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
              marginBottom: SPACING.stack.md,
              fontSize: TYPOGRAPHY.fontSize.body.medium
            }}>
              Mint AI can instantly answer questions about our privacy practices, data handling, and your rights.
            </p>
            <Button
              as="a"
              href="/mint-intelligent-chat"
              variant="mint-chat"
              size="md"
              enhancedHover={true}
            >
              💬 Chat with Mint AI
            </Button>
          </div>

          {/* Privacy Trust Badge */}
          <div style={{
            marginTop: SPACING.stack.xl,
            padding: SPACING.card.standard,
            background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
            borderRadius: BORDER_RADIUS.medium,
            border: `1px solid ${COLORS.borders.green}`,
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: SPACING.inline.sm,
              marginBottom: SPACING.stack.sm
            }}>
              <span style={{ fontSize: TYPOGRAPHY.fontSize.heading.h4 }}>🛡️</span>
              <span style={{
                color: COLORS.primary.main,
                fontWeight: TYPOGRAPHY.fontWeight.bold,
                fontSize: TYPOGRAPHY.fontSize.body.large
              }}>
                Your Privacy is Protected
              </span>
            </div>
            <p style={{
              color: COLORS.primary.darker,
              lineHeight: TYPOGRAPHY.lineHeight.relaxed,
              margin: 0,
              fontSize: TYPOGRAPHY.fontSize.body.medium
            }}>
              We are committed to transparency and your right to privacy. Your trust is earned through our actions, not just our words.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

