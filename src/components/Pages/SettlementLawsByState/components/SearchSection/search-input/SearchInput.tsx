/**
 * Search Input Component
 * 
 * Interactive search input field for filtering states by name.
 * Includes proper accessibility with aria-label and uses design system tokens.
 * 
 * @component
 * @param {SearchInputProps} props - Component props
 * @param {string} props.searchValue - Current search input value
 * @param {(value: string) => void} props.onSearchChange - Callback when search value changes
 * @returns {JSX.Element} Rendered search input
 * 
 * @example
 * <SearchInput 
 *   searchValue={searchTerm}
 *   onSearchChange={(value) => setSearchTerm(value)}
 * />
 */

'use client';

import { TYPOGRAPHY, COLORS, SPACING, BORDER_RADIUS } from '@/src/components/shared/styles';

interface SearchInputProps {
  /** Current search value */
  searchValue: string;
  /** Handler for search value changes */
  onSearchChange: (value: string) => void;
}

export default function SearchInput({ searchValue, onSearchChange }: SearchInputProps) {
  return (
    <div style={{ marginBottom: SPACING.stack.md }}>
      <input
        type="text"
        placeholder="🔍 Search states (e.g., California, Texas, New York...)"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search states by name"
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: `${SPACING.unit.sm} ${SPACING.unit.lg}`,
          fontSize: TYPOGRAPHY.fontSize.body.medium,
          border: `2px solid ${COLORS.borders.medium}`,
          borderRadius: BORDER_RADIUS.small,
          outline: 'none'
        }}
      />
    </div>
  );
}
