/**
 * Hero Badge Component
 * 
 * Displays a decorative badge above the hero title to indicate the page category.
 * Uses design system tokens for consistent styling with golden/amber theme.
 * 
 * @component
 * @returns {JSX.Element} Rendered hero badge
 * 
 * @example
 * <HeroBadge />
 */

import { TYPOGRAPHY, COLORS, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';

export default function HeroBadge() {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${COLORS.accent.gold} 0%, ${COLORS.accent.goldDark} 100%)`,
      color: COLORS.accent.goldText,
      padding: `${SPACING.unit.xs} ${SPACING.unit.lg}`,
      borderRadius: BORDER_RADIUS.small,
      fontSize: TYPOGRAPHY.fontSize.body.small,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      display: 'inline-block',
      marginBottom: SPACING.stack.md,
      border: `1px solid ${COLORS.accent.goldDarker}`
    }}>
      📚 Legal Resource Center
    </div>
  );
}
