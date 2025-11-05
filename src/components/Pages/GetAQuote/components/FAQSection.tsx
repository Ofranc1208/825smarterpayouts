'use client';

import { useState } from 'react';
import Link from 'next/link';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

const FAQ_DATA = [
  {
    question: "Do I need to provide personal information?",
    answer: "No. Our AI calculator and phone quotes do not require sensitive personal information, social security numbers, or credit checks. Just payment details."
  },
  {
    question: "How fast will I get my quote?",
    answer: "AI calculator quotes are instant (60 seconds). Phone quotes are provided during your call. Both are equally accurate and reliable."
  },
  {
    question: "Is there any obligation or pressure?",
    answer: "Never. All quotes are completely free, confidential, and come with zero obligation or sales pressure. You're in control of your decision."
  },
  {
    question: "What if I have a unique or complex situation?",
    answer: "Our AI handles most complex cases instantly. For unique situations, our human experts can walk you through specialized options step by step."
  },
  {
    question: "How accurate are the quotes?",
    answer: "Our AI-powered quotes are based on real market data and current rates. They're as accurate as quotes from traditional companies, often more so."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{
      padding: `${SPACING.unit.xl} 0`,
      background: COLORS.backgrounds.white
    }}>
      <div style={{
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto',
        padding: `0 ${SPACING.unit.md}`
      }}>
        {/* Section Header */}
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
            color: COLORS.text.secondary,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Get instant answers to common questions about getting your quote
          </p>
        </div>

        {/* Ask Mint AI CTA */}
        <Link
          href="/mint-intelligent-chat"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            background: '#f0fdf4',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            border: '1px solid #22c55e',
            textDecoration: 'none',
            marginBottom: SPACING.stack.lg,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#dcfce7';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f0fdf4';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <img
            src="/assets/images/mint-mascot.png"
            alt="Mint AI"
            style={{
              width: '28px',
              height: '28px',
              objectFit: 'contain'
            }}
          />
          <div style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: '#047857'
          }}>
            Have a specific question? Ask Mint AI →
          </div>
        </Link>

        {/* FAQ Items */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: SPACING.unit.sm,
          width: '100%'
        }}>
          {FAQ_DATA.map((faq, index) => {
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

        {/* View All FAQs Button */}
        <div style={{
          textAlign: 'center',
          marginTop: SPACING.stack.lg
        }}>
          <Link
            href="/faqs"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 2rem',
              background: 'white',
              border: '2px solid #22c55e',
              borderRadius: '12px',
              color: '#047857',
              fontSize: '1rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#22c55e';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#047857';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            View All FAQs
            <span style={{ fontSize: '1.125rem' }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
