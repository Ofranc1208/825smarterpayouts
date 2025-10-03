/**
 * Search Title Component
 * 
 * Displays the H2 heading for the search section.
 * Uses design system tokens for consistent typography.
 * 
 * @component
 * @returns {JSX.Element} Rendered search title
 * 
 * @example
 * <SearchTitle />
 */

import { TYPOGRAPHY, COLORS, SPACING } from '@/src/components/shared/styles';

export default function SearchTitle() {
  return (
    <h2 style={{
      fontSize: TYPOGRAPHY.fontSize.heading.h3,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      color: COLORS.text.primary,
      marginBottom: SPACING.stack.sm
    }}>
      Find Your State's Laws
    </h2>
  );
}
