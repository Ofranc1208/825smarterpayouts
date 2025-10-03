/**
 * Hero Title Component
 * 
 * Displays the main H1 heading for the Settlement Laws by State page.
 * Uses design system tokens for consistent typography and spacing.
 * 
 * @component
 * @returns {JSX.Element} Rendered hero title
 * 
 * @example
 * <HeroTitle />
 */

import { TYPOGRAPHY, COLORS, SPACING } from '@/src/components/shared/styles';

export default function HeroTitle() {
  return (
    <h1 style={{
      fontSize: TYPOGRAPHY.fontSize.heading.h1,
      fontWeight: TYPOGRAPHY.fontWeight.extrabold,
      color: COLORS.text.primary,
      marginBottom: SPACING.stack.md,
      lineHeight: TYPOGRAPHY.lineHeight.tight
    }}>
      Structured Settlement Laws by State
    </h1>
  );
}
