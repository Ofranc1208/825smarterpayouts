/**
 * Story Header Component
 * 
 * Reusable header component for the company story section with title
 * and optional subtitle. Features responsive typography and
 * accessibility enhancements.
 * 
 * @component StoryHeader
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { COLORS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';
import type { StoryHeaderProps } from './types';

/**
 * Company story section header component
 * 
 * @param {StoryHeaderProps} props - Component props
 * @returns {JSX.Element} Responsive story header
 */
export default function StoryHeader({
  title,
  subtitle,
  align = 'center'
}: StoryHeaderProps): JSX.Element {
  const textAlign = align as React.CSSProperties['textAlign'];

  return (
    <>
      {/* Main Title */}
      <h2 style={{
        ...TEXT_PRESETS.heroTitle,
        color: COLORS.neutral.gray900,
        marginBottom: subtitle ? "1rem" : "2rem",
        textAlign,
        background: COLORS.titleGradients.grayToGreen,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }}>
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p style={{
          fontSize: "1rem",
          color: COLORS.text.secondary,
          marginBottom: "2rem",
          textAlign
        }}>
          {subtitle}
        </p>
      )}
    </>
  );
}
