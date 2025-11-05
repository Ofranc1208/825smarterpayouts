/**
 * Technology Section Header Component
 * 
 * Reusable header component for the technology section with title,
 * subtitle, and description. Features responsive typography and
 * accessibility enhancements.
 * 
 * @component TechnologyHeader
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { COLORS, TYPOGRAPHY } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';
import type { SectionHeaderProps } from '../../types';

/**
 * Technology section header component
 * 
 * @param {SectionHeaderProps} props - Component props
 * @returns {JSX.Element} Responsive section header
 */
export default function TechnologyHeader({
  title,
  subtitle,
  description,
  align = 'center',
  maxWidth = '800px'
}: SectionHeaderProps): JSX.Element {
  return (
    <div style={{
      display: 'flex',
      justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
      textAlign: align,
      marginBottom: '3rem'
    }}>
      <div style={{
        maxWidth: maxWidth
      }}>
        {/* Main Title */}
        <h2 style={{
          ...TEXT_PRESETS.heroTitle,
          color: COLORS.neutral.gray900,
          marginBottom: description ? "1.5rem" : "2rem",
          background: COLORS.titleGradients.grayToGreen,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p style={{
            fontSize: TYPOGRAPHY.fontSize.body.medium,
            color: COLORS.text.secondary,
            lineHeight: TYPOGRAPHY.lineHeight.relaxed,
            margin: "0"
          }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
