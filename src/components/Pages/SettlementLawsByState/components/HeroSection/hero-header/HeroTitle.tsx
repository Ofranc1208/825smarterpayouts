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
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function HeroTitle() {
  return (
    <h1 style={{
      ...TEXT_PRESETS.heroTitle,
      background: COLORS.titleGradients.grayToGreen,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: SPACING.stack.md,
      fontSize: 'clamp(1.75rem, 4vw, 2.75rem)'
    }}>
      Structured Settlement Laws by State
    </h1>
  );
}
