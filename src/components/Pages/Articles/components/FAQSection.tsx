/**
 * FAQ Section Component - Articles Page
 * 
 * Displays frequently asked questions in an accordion format.
 * Uses design system tokens for consistent styling.
 * Fully accessible with semantic HTML and ARIA labels.
 * 
 * @component
 * @returns {JSX.Element} Rendered FAQ section
 * 
 * @example
 * <FAQSection />
 */

'use client';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, BOX_SHADOWS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';
import type { FAQ } from '../types';

/**
 * Array of FAQ data
 */
const faqData: FAQ[] = [
  {
    id: 'frequency',
    question: 'How often are new articles published?',
    answer: 'We add new articles and resources every month. Subscribe to our newsletter below to get notified when new content is published.'
  },
  {
    id: 'requests',
    question: 'Can I request a topic?',
    answer: 'Absolutely! Use our contact form to suggest topics or questions you\'d like us to cover.'
  },
  {
    id: 'expert-review',
    question: 'Are your articles reviewed by experts?',
    answer: 'Yes. All content is reviewed by structured settlement professionals for accuracy and clarity.'
  }
];

/**
 * FAQ Item Component
 * @param {Object} props - Component props
 * @param {FAQ} props.faq - FAQ data
 * @param {boolean} props.isLast - Whether this is the last item
 */
function FAQItem({ faq, isLast }: { faq: FAQ; isLast: boolean }) {
  return (
    <details 
      style={{ marginBottom: isLast ? 0 : SPACING.stack.md }}
      aria-label={faq.question}
    >
      <summary style={{
        fontWeight: TYPOGRAPHY.fontWeight.semibold,
        cursor: 'pointer',
        padding: `${SPACING.unit.sm} 0`,
        color: COLORS.text.primary,
        fontSize: TYPOGRAPHY.fontSize.body.medium,
        listStyle: 'none'
      }}>
        {faq.question}
      </summary>
      <div style={{
        marginTop: SPACING.unit.xs,
        color: COLORS.text.secondary,
        lineHeight: TYPOGRAPHY.lineHeight.relaxed,
        paddingLeft: SPACING.unit.md,
        fontSize: TYPOGRAPHY.fontSize.body.medium
      }}>
        {faq.answer}
      </div>
    </details>
  );
}

/**
 * FAQ Section Component
 */
export default function FAQSection() {
  return (
    <section
      aria-label="Frequently asked questions about articles"
      style={{
        background: COLORS.backgrounds.white,
        padding: SPACING.card.comfortable,
        borderRadius: BORDER_RADIUS.medium,
        boxShadow: BOX_SHADOWS.small,
        marginTop: SPACING.unit.xxl
      }}
    >
      <h2 style={{
        ...TEXT_PRESETS.heroTitle,
        fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
        color: COLORS.neutral.gray900,
        marginBottom: SPACING.stack.lg,
        background: COLORS.titleGradients.grayToGreen,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textAlign: 'center'
      }}>
        Articles FAQ
      </h2>
      {faqData.map((faq, index) => (
        <FAQItem 
          key={faq.id} 
          faq={faq} 
          isLast={index === faqData.length - 1}
        />
      ))}
      
      {/* Browse All FAQs CTA */}
      <div style={{
        marginTop: SPACING.stack.xl,
        textAlign: 'center'
      }}>
        <a
          href="/faqs"
          style={{
            color: COLORS.primary.main,
            border: `1px solid ${COLORS.primary.main}`,
            padding: `${SPACING.unit.sm} ${SPACING.unit.lg}`,
            borderRadius: BORDER_RADIUS.medium,
            fontSize: TYPOGRAPHY.fontSize.body.medium,
            fontWeight: TYPOGRAPHY.fontWeight.medium,
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = COLORS.primary.main;
            e.currentTarget.style.color = COLORS.backgrounds.white;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = COLORS.primary.main;
          }}
          aria-label="Browse all FAQs and topics"
        >
          Browse All FAQs & Topics
        </a>
      </div>
    </section>
  );
}

