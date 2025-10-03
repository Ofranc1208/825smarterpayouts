/**
 * Accordion Button Component
 * 
 * Interactive button header for state law accordion items.
 * Changes background color when open and rotates the chevron icon.
 * Uses design system tokens for consistent styling.
 * 
 * @component
 * @param {AccordionButtonProps} props - Component props
 * @param {string} props.state - State name to display
 * @param {boolean} props.isOpen - Whether the accordion is open
 * @param {() => void} props.onClick - Click handler for toggling accordion
 * @returns {JSX.Element} Rendered accordion button
 * 
 * @example
 * <AccordionButton 
 *   state="California"
 *   isOpen={isOpen}
 *   onClick={() => toggleAccordion()}
 * />
 */

import { TYPOGRAPHY, COLORS, SPACING } from '@/src/components/shared/styles';

interface AccordionButtonProps {
  /** State name to display */
  state: string;
  /** Whether the accordion is currently open */
  isOpen: boolean;
  /** Handler for toggling the accordion */
  onClick: () => void;
}

export default function AccordionButton({ state, isOpen, onClick }: AccordionButtonProps) {
  return (
    <h2 style={{ margin: 0 }}>
      <button
        onClick={onClick}
        style={{
          width: '100%',
          padding: `${SPACING.card.compact} ${SPACING.card.standard}`,
          background: isOpen ? COLORS.backgrounds.greenPale : COLORS.backgrounds.white,
          border: 'none',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: TYPOGRAPHY.fontSize.heading.h5,
          fontWeight: TYPOGRAPHY.fontWeight.semibold,
          color: COLORS.text.primary
        }}
      >
        <span>🏛️ {state}</span>
        <span style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}>
          ⌄
        </span>
      </button>
    </h2>
  );
}
