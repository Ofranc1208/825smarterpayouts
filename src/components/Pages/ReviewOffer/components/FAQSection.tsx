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

'use client';
import { useState } from 'react';
import Button from '@/src/components/shared/Button/Button';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
              ...TEXT_PRESETS.heroTitle,
              color: COLORS.neutral.gray900,
              marginBottom: SPACING.stack.lg,
              textAlign: 'center',
              background: COLORS.titleGradients.grayToGreen,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Privacy & Security FAQ
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.unit.sm }}>
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    style={{
                      border: `1px solid ${COLORS.neutral.gray200}`,
                      borderRadius: BORDER_RADIUS.medium,
                      overflow: "hidden",
                      background: COLORS.backgrounds.white,
                      boxShadow: isOpen ? BOX_SHADOWS.small : BOX_SHADOWS.sm,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      style={{
                        width: '100%',
                        padding: `${SPACING.unit.md} ${SPACING.unit.lg}`,
                        background: isOpen ? COLORS.backgrounds.lightGray : COLORS.backgrounds.white,
                        border: "none",
                        textAlign: "left",
                        fontSize: TYPOGRAPHY.fontSize.body.medium,
                        fontWeight: "600",
                        color: COLORS.neutral.gray900,
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        transition: "all 0.2s ease",
                        gap: SPACING.unit.md
                      }}
                      onMouseEnter={(e) => {
                        if (!isOpen) {
                          e.currentTarget.style.background = COLORS.backgrounds.lightGray;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isOpen) {
                          e.currentTarget.style.background = COLORS.backgrounds.white;
                        }
                      }}
                    >
                      <span style={{ 
                        flex: 1, 
                        textAlign: "left",
                        lineHeight: TYPOGRAPHY.lineHeight.snug
                      }}>
                        {faq.question}
                      </span>
                      <span style={{
                        fontSize: "1.25rem",
                        fontWeight: "300",
                        color: COLORS.primary.main,
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        flexShrink: 0,
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        lineHeight: "1"
                      }}>
                        +
                      </span>
                    </button>
                    <div 
                      id={`faq-answer-${index}`}
                      style={{
                        maxHeight: isOpen ? "1000px" : "0",
                        overflow: "hidden",
                        transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease",
                        padding: isOpen ? `${SPACING.unit.md} ${SPACING.unit.lg} ${SPACING.unit.lg}` : "0",
                        background: COLORS.backgrounds.lightGray,
                        borderTop: isOpen ? `1px solid ${COLORS.neutral.gray200}` : "none",
                        opacity: isOpen ? 1 : 0,
                        transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease, opacity 0.3s ease, border-top 0.2s ease"
                      }}
                    >
                      <p style={{
                        color: COLORS.text.secondary,
                        lineHeight: TYPOGRAPHY.lineHeight.relaxed,
                        margin: "0",
                        fontSize: TYPOGRAPHY.fontSize.body.small
                      }}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
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
                href="/mint-intelligent-chat?chat=open&feature=calculator"
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

