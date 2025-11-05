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
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function CTATitle() {
  return (
    <h2 style={{ 
      ...TEXT_PRESETS.heroTitle,
      background: COLORS.titleGradients.grayToGreen,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: SPACING.stack.md,
      fontSize: 'clamp(1.5rem, 3.5vw, 2rem)'
    }}>
      Ready to Sell Your Structured Settlement?
    </h2>
  );
}
