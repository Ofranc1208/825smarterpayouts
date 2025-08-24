/**
 * Why Choose Section Header Component
 * 
 * Reusable header component for the why choose section with title,
 * subtitle, and description. Features responsive typography and
 * accessibility enhancements.
 * 
 * @component WhyChooseHeader
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import type { SectionHeaderProps } from '../../types';

/**
 * Why choose section header component
 * 
 * @param {SectionHeaderProps} props - Component props
 * @returns {JSX.Element} Responsive section header
 */
export default function WhyChooseHeader({
  title,
  subtitle,
  description,
  align = 'center',
  maxWidth = '800px',
  titleColor = '#2d5a27',
  descriptionColor = '#6c757d'
}: SectionHeaderProps): JSX.Element {
  return (
    <div style={{
      textAlign: align,
      marginBottom: '48px'
    }}>
      <div style={{
        maxWidth: maxWidth,
        margin: '0 auto'
      }}>
        {/* Subtitle Badge */}
        {subtitle && (
          <div style={{
            fontSize: "0.875rem",
            fontWeight: "600",
            color: "#8b5cf6",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "1rem",
            background: "rgba(139, 92, 246, 0.1)",
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            display: "inline-block"
          }}>
            🤖 {subtitle}
          </div>
        )}

        {/* Main Title */}
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: '700',
          lineHeight: '1.2',
          marginBottom: description ? '24px' : '0',
          color: titleColor,
          background: `linear-gradient(135deg, ${titleColor} 0%, #8b5cf6 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
            fontWeight: '300',
            color: descriptionColor,
            lineHeight: '1.6',
            margin: '0'
          }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
