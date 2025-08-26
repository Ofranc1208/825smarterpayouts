/**
 * CTA Buttons Component
 * 
 * Reusable call-to-action buttons component for the CTA section.
 * Features hover animations, accessibility enhancements, and
 * flexible layout options.
 * 
 * @component CTAButtons
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import Link from 'next/link';
import type { CTAButtonsProps } from './types';

/**
 * CTA buttons component
 * 
 * @param {CTAButtonsProps} props - Component props
 * @returns {JSX.Element} CTA buttons
 */
export default function CTAButtons({
  buttons,
  align = 'center',
  layout = 'horizontal',
  gap = '1rem'
}: CTAButtonsProps): JSX.Element {
  const justifyContent = align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';
  const flexDirection = layout === 'vertical' ? 'column' : 'row';

  const getButtonStyles = (button: any) => {
    const baseStyles = {
      display: "inline-block",
      background: button.gradient,
      color: "white",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "600",
      transition: "all 0.2s ease"
    };

    const sizeStyles = {
      small: { padding: "0.5rem 1rem", fontSize: "0.875rem" },
      medium: { padding: "0.625rem 1.5rem", fontSize: "1rem" },
      large: { padding: "0.75rem 2rem", fontSize: "1.1rem" }
    };

    return {
      ...baseStyles,
      ...sizeStyles[(button.size as keyof typeof sizeStyles) || 'medium']
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div style={{
      display: "flex",
      gap,
      justifyContent,
      flexWrap: "wrap",
      flexDirection
    }}>
      {buttons.map((button) => (
        <Link 
          key={button.id}
          href={button.href}
          aria-label={button.ariaLabel}
          style={getButtonStyles(button)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {button.text}
        </Link>
      ))}
    </div>
  );
}
