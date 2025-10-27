/**
 * Testimonial Section Component - Articles Page
 * 
 * Displays a customer testimonial quote.
 * Uses design system tokens for consistent styling.
 * Fully accessible with semantic HTML.
 * 
 * @component
 * @returns {JSX.Element} Rendered testimonial section
 * 
 * @example
 * <TestimonialSection />
 */

import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';

export default function TestimonialSection() {
  return (
    <section
      aria-label="Customer testimonial"
      style={{
        marginTop: SPACING.unit.xxl,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: SPACING.unit.md,
        paddingRight: SPACING.unit.md
      }}
    >
      <div style={{
        maxWidth: '800px',
        width: '100%'
      }}>
        <blockquote style={{
          textAlign: 'center',
          padding: SPACING.card.comfortable,
          background: COLORS.backgrounds.lightGray,
          borderRadius: BORDER_RADIUS.large,
          border: 'none',
          margin: 0
        }}>
          <p style={{
            fontSize: TYPOGRAPHY.fontSize.body.large,
            color: COLORS.text.primary,
            marginBottom: SPACING.stack.md,
            fontStyle: 'italic',
            lineHeight: TYPOGRAPHY.lineHeight.relaxed
          }}>
            "The articles helped me understand my options and make the best decision for my family."
          </p>
          <footer style={{
            color: COLORS.text.secondary,
            fontSize: TYPOGRAPHY.fontSize.body.medium,
            fontWeight: TYPOGRAPHY.fontWeight.medium
          }}>
            — D. Nguyen, Illinois
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

