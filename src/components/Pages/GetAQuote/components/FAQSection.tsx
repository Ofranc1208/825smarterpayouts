'use client';

import { useState } from 'react';
import Button from '@/src/components/shared/Button';
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section style={{ 
      padding: SPACING.section.standard, 
      background: COLORS.backgrounds.lightGray,
      position: 'relative'
    }}>
      {/* Background Decoration */}
      <div style={{
        position: "absolute",
        bottom: "10%",
        left: "5%",
        width: "100px",
        height: "100px",
        background: COLORS.radialGradients.purpleLight,
        borderRadius: "50%",
        opacity: 0.5
      }}></div>

      <div style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: SPACING.container.paddingX,
        position: 'relative',
        zIndex: 1
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: SPACING.stack.xxl
        }}>
          <h2 style={{
            ...TEXT_PRESETS.sectionTitle,
            color: COLORS.neutral.gray900,
            marginBottom: SPACING.stack.md,
            background: COLORS.titleGradients.grayToPurple,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            ❓ Frequently Asked Questions
          </h2>
          <p style={{
            ...TEXT_PRESETS.sectionSubtitle,
            color: COLORS.text.secondary,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Get instant answers to common questions about getting your quote
          </p>
        </div>

        {/* FAQ Container */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: BORDER_RADIUS.xlarge,
          padding: SPACING.card.spacious,
          border: `1px solid ${COLORS.borders.light}`,
          boxShadow: BOX_SHADOWS.large
        }}>
          {/* Ask Mint AI Button - Top */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: SPACING.stack.lg
          }}>
            <Button
              as="a"
              href="/mint-intelligent-chat"
              variant="mint-chat"
              size="sm"
              enhancedHover={true}
            >
              💬 Ask Mint AI
            </Button>
          </div>

          {/* FAQ Items */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: SPACING.stack.md,
            marginBottom: SPACING.stack.xl
          }}>
            {FAQ_DATA.map((faq, index) => (
              <details 
                key={index} 
                style={{
                  background: hoveredIndex === index 
                    ? COLORS.backgrounds.greenLight 
                    : COLORS.backgrounds.white,
                  borderRadius: BORDER_RADIUS.medium,
                  border: `1px solid ${
                    hoveredIndex === index 
                      ? COLORS.borders.green 
                      : COLORS.borders.medium
                  }`,
                  padding: SPACING.card.compact,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  boxShadow: hoveredIndex === index 
                    ? BOX_SHADOWS.small 
                    : 'none'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <summary style={{
                  ...TEXT_PRESETS.faqQuestion,
                  color: hoveredIndex === index 
                    ? COLORS.primary.main 
                    : COLORS.neutral.gray900,
                  listStyle: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: SPACING.inline.sm,
                  transition: 'color 0.2s ease'
                }}>
                  <span style={{
                    fontSize: '1.2rem',
                    flexShrink: 0
                  }}>
                    {hoveredIndex === index ? '👉' : '❓'}
                  </span>
                  <span>{faq.question}</span>
                </summary>
                <div style={{
                  ...TEXT_PRESETS.faqAnswer,
                  color: COLORS.text.secondary,
                  marginTop: SPACING.stack.md,
                  paddingLeft: `calc(1.2rem + ${SPACING.inline.sm})`
                }}>
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          {/* View All FAQs Button */}
          <div style={{ 
            textAlign: 'center',
            paddingTop: SPACING.stack.md,
            borderTop: `1px solid ${COLORS.borders.light}`
          }}>
            <Button
              as="a"
              href="/faqs"
              variant="technology-primary"
              size="lg"
              enhancedHover={true}
            >
              📖 View All FAQs
            </Button>
          </div>
        </div>

        {/* Help Text */}
        <div style={{
          textAlign: 'center',
          marginTop: SPACING.stack.lg,
          padding: SPACING.card.compact,
          background: 'rgba(243, 232, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: BORDER_RADIUS.large,
          border: `1px solid ${COLORS.borders.purple}`,
          boxShadow: BOX_SHADOWS.small
        }}>
          <p style={{ 
            margin: 0, 
            color: COLORS.accent.purple, 
            fontSize: TYPOGRAPHY.fontSize.body.small,
            fontWeight: TYPOGRAPHY.fontWeight.medium
          }}>
            💡 <strong>Pro Tip:</strong> Mint AI can answer any question instantly, 24/7
          </p>
        </div>
      </div>
    </section>
  );
}
