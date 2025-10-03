/**
 * CTA Title Component
 * 
 * Displays the main heading for the final call-to-action section.
 * Uses design system tokens for consistent typography.
 * 
 * @component
 * @returns {JSX.Element} Rendered CTA title
 * 
 * @example
 * <CTATitle />
 */

import { TYPOGRAPHY, COLORS, SPACING } from '@/src/components/shared/styles';

export default function CTATitle() {
  return (
    <h2 style={{ 
      fontSize: TYPOGRAPHY.fontSize.heading.h2, 
      fontWeight: TYPOGRAPHY.fontWeight.bold, 
      color: COLORS.text.primary,
      marginBottom: SPACING.stack.md 
    }}>
      Ready to Sell Your Structured Settlement?
    </h2>
  );
}
