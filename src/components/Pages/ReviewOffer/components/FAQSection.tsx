/**
 * FAQ Section Component - Review Offer Page
 * 
 * Displays privacy and security frequently asked questions with collapsible answers.
 * Includes CTA buttons for more information.
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
    question: 'Is the review process secure?',
    answer: 'Yes. All documents are handled securely and digitally, with full compliance for your state.'
  },
  {
    question: 'How long does it take to finalize?',
    answer: 'Most reviews and signings are completed within a few days, depending on your state\'s requirements.'
  },
  {
    question: 'Can I ask questions before signing?',
    answer: 'Absolutely! Our team is here to answer any questions and make sure you\'re comfortable before you sign.'
  }
];

export default function FAQSection() {
  return (
    <section
      aria-label="Frequently asked questions"
      style={{
        background: '#f9fafb',
        paddingTop: SPACING.unit.lg,
        paddingBottom: SPACING.unit.lg,
        paddingLeft: SPACING.unit.md,
        paddingRight: SPACING.unit.md
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: SPACING.container.maxWidth,
        margin: '0 auto'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            background: COLORS.backgrounds.white,
            borderRadius: BORDER_RADIUS.large,
            padding: SPACING.card.compact,
            boxShadow: BOX_SHADOWS.small
          }}>
            <h2 style={{
              fontSize: TYPOGRAPHY.fontSize.heading.h3,
              fontWeight: TYPOGRAPHY.fontWeight.bold,
              color: COLORS.text.primary,
              marginBottom: SPACING.stack.lg,
              textAlign: 'center'
            }}>
              Privacy & Security FAQ
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.grid.tight }}>
              {faqs.map((faq, index) => (
                <details 
                  key={index}
                  style={{
                    border: `1px solid ${COLORS.borders.light}`,
                    borderRadius: BORDER_RADIUS.medium,
                    padding: SPACING.unit.md
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
                    marginTop: SPACING.unit.sm,
                    color: COLORS.text.secondary,
                    lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                    fontSize: TYPOGRAPHY.fontSize.body.medium
                  }}>
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            <div style={{
              textAlign: 'center',
              marginTop: SPACING.stack.lg,
              display: 'flex',
              gap: SPACING.inline.md,
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Button
                as="a"
                href="/faqs"
                variant="technology-primary"
                size="md"
                enhancedHover={true}
              >
                📖 Read All FAQs
              </Button>
              
              <Button
                as="a"
                href="/mint-intelligent-chat"
                variant="technology-secondary"
                size="md"
                enhancedHover={true}
              >
                💬 Ask Mint AI
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

