'use client';
import { useState } from 'react';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  onFAQClick?: (questionId: string) => void;
}

export default function FAQSection({ onFAQClick }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How quickly can I get a response?",
      answer: "We typically respond to emails and contact forms within 24 hours during business days (Monday-Friday). For urgent matters or immediate assistance, please call us at (855) 214-3510 during business hours (9 AM - 6 PM EST)."
    },
    {
      question: "What information should I include in my message?",
      answer: "To help us assist you better, please include: your structured settlement details (if applicable), the reason for your inquiry, your preferred contact method, and any specific questions you have. All information is kept confidential and secure."
    },
    {
      question: "Is the consultation free?",
      answer: "Yes, our initial consultation is completely free with no obligation. We provide transparent information about your structured settlement options without any pressure or hidden fees. There's no cost to explore your options and get an instant quote."
    },
    {
      question: "Can I speak with someone immediately?",
      answer: "Yes! Call us at (855) 214-3510 during business hours (Monday-Friday, 9 AM - 6 PM EST) to speak with our team directly. We're here to answer your questions and provide immediate assistance with your structured settlement needs."
    },
    {
      question: "What methods can I use to contact you?",
      answer: "You can reach us via phone, email, or visit our office in Tampa, FL. We also offer instant online quotes through our AI-powered calculator, available 24/7. Choose the method that's most convenient for you."
    },
    {
      question: "Do you offer virtual consultations?",
      answer: "Yes! While we have a physical office location, we primarily work with clients digitally. Our entire process—from getting your quote to finalizing your payout—can be completed online. You can also schedule a phone consultation if you prefer to speak with someone directly."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    if (onFAQClick) {
      onFAQClick(`faq-${index}`);
    }
  };

  return (
    <section style={{
      padding: `${SPACING.unit.xl} 0`,
      background: COLORS.backgrounds.white
    }}>
      <div style={{
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto',
        padding: `0 ${SPACING.unit.md}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: SPACING.stack.lg
        }}>
          <h2 style={{
            ...TEXT_PRESETS.heroTitle,
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            color: COLORS.neutral.gray900,
            marginBottom: SPACING.stack.xs,
            background: COLORS.titleGradients.grayToGreen,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Frequently Asked Questions
          </h2>
          <p style={{
            fontSize: TYPOGRAPHY.fontSize.body.medium,
            color: COLORS.text.secondary
          }}>
            Quick answers to common questions
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING.unit.sm,
          width: '100%'
        }}>
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
                  onClick={() => toggleFAQ(index)}
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
      </div>
    </section>
  );
}
