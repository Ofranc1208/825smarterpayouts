/**
 * Hero Description Component
 * 
 * Displays the descriptive subtitle text below the main hero title.
 * Uses design system tokens for typography, colors, and spacing.
 * 
 * @component
 * @returns {JSX.Element} Rendered hero description
 * 
 * @example
 * <HeroDescription />
 */

import { TYPOGRAPHY, COLORS, SPACING } from '@/src/components/shared/styles';

export default function HeroDescription() {
  return (
    <p style={{
      fontSize: TYPOGRAPHY.fontSize.body.medium,
      color: COLORS.neutral.gray500,
      marginBottom: SPACING.stack.md,
      lineHeight: TYPOGRAPHY.lineHeight.normal,
      maxWidth: '700px',
      margin: `0 auto ${SPACING.stack.md}`
    }}>
      Complete legal guide for all 50 states + DC. Court approval requirements, protection acts, and transfer laws.
    </p>
  );
}
