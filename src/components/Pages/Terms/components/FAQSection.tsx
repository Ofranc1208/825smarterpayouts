/**
 * FAQ Section Component - Terms Page
 *
 * Displays terms-related frequently asked questions with collapsible answers.
 * Includes Mint AI helper.
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
    question: 'Can I use your content on my own site?',
    answer: 'No. All content is protected and may not be reused without written permission.'
  },
  {
    question: 'How will I know if the terms change?',
    answer: 'We post updates on this page. Please check back regularly for the latest version.'
  },
  {
    question: 'Does Smarter Payouts participate in my state?',
    answer: 'Smarter Payouts operates primarily as a self-quoting platform. Our direct participation varies by state due to licensing and bonding requirements. Please contact our representatives to verify our participation status and licensing in your specific state.'
  },
  {
    question: 'What states require licensing and bonding?',
    answer: 'Some states like Georgia, Minnesota, and others have specific licensing and bonding requirements for structured settlement companies. Requirements vary and change over time. Always ask our representatives about current compliance status in your state.'
  },
  {
    question: 'Who can I contact with questions?',
    answer: 'Email support@smarterpayouts.com and our team will be happy to help.',
    hasEmail: true
  }
];

export default function FAQSection() {
  return (
    <section
      aria-label="Terms FAQ section"
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
            Terms & Conditions FAQ
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
                      Email{' '}
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
                      {' '}and our team will be happy to help.
                    </>
                  ) : (
                    faq.answer
                  )}
                </div>
              </details>
            ))}
          </div>

          {/* Mint AI Help */}
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
              fontWeight: TYPOGRAPHY.fontWeight.semibold,
              fontSize: TYPOGRAPHY.fontSize.body.large,
              marginBottom: SPACING.unit.xs
            }}>
              ✨ Need instant help with terms questions?
            </h3>
            <p style={{
              color: COLORS.text.secondary,
              marginBottom: SPACING.stack.md,
              fontSize: TYPOGRAPHY.fontSize.body.medium
            }}>
              Mint AI can instantly answer questions about our terms, state compliance, and platform policies.
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
        </div>
      </div>
    </section>
  );
}

