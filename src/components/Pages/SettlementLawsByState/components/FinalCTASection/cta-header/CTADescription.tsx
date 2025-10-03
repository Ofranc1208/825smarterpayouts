/**
 * CTA Description Component
 * 
 * Displays the descriptive text below the CTA title.
 * Uses design system tokens for typography, colors, and spacing.
 * 
 * @component
 * @returns {JSX.Element} Rendered CTA description
 * 
 * @example
 * <CTADescription />
 */

import { TYPOGRAPHY, COLORS, SPACING } from '@/src/components/shared/styles';

export default function CTADescription() {
  return (
    <p style={{ 
      fontSize: TYPOGRAPHY.fontSize.body.large, 
      color: COLORS.neutral.gray500, 
      marginBottom: SPACING.stack.xl,
      maxWidth: '600px',
      margin: `0 auto ${SPACING.stack.xl}`
    }}>
      Get your instant quote or chat with Mint AI to understand how your state's laws apply to your situation.
    </p>
  );
}
