/**
 * Hero CTA Buttons Component
 * 
 * Interactive call-to-action buttons for the hero section with hover effects,
 * animations, and accessibility features. Supports multiple button variants
 * and responsive design.
 * 
 * @component HeroCTAButtons
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import type { CTAButton } from '../../types';

/**
 * Props for HeroCTAButtons component
 */
interface HeroCTAButtonsProps {
  /** Primary CTA button */
  primaryButton?: CTAButton;
  /** Secondary CTA button */
  secondaryButton?: CTAButton;
  /** Button layout direction */
  direction?: 'row' | 'column';
  /** Enable animations */
  enableAnimations?: boolean;
}

/**
 * Individual CTA button component
 */
const CTAButtonComponent = ({ 
  button, 
  index,
  enableAnimations = true 
}: { 
  button: CTAButton; 
  index: number;
  enableAnimations?: boolean;
}): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Handle button hover state
   */
  const handleHover = useCallback((hovered: boolean) => {
    setIsHovered(hovered);
  }, []);

  /**
   * Get button styles based on variant
   */
  const getButtonStyles = useCallback(() => {
    const baseStyles = {
      fontWeight: '600',
      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
      borderRadius: '24px',
      border: 'none',
      padding: '16px 32px',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      minWidth: '250px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      position: 'relative' as const,
      overflow: 'hidden' as const,
      transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)'
    };

    switch (button.variant) {
      case 'primary':
        return {
          ...baseStyles,
          background: isHovered 
            ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
            : '#fbc233',
          color: '#262626',
          boxShadow: isHovered 
            ? '0 8px 25px rgba(251, 194, 51, 0.4), 0 0 0 1px rgba(251, 194, 51, 0.5)'
            : '0 4px 16px rgba(251, 194, 51, 0.3)'
        };
      
      case 'secondary':
        return {
          ...baseStyles,
          background: isHovered
            ? 'linear-gradient(135deg, #047857 0%, #065f46 100%)'
            : '#09b44d',
          color: '#fff',
          boxShadow: isHovered
            ? '0 8px 25px rgba(9, 180, 77, 0.4), 0 0 0 1px rgba(9, 180, 77, 0.5)'
            : '0 4px 16px rgba(9, 180, 77, 0.3)'
        };
      
      case 'outline':
        return {
          ...baseStyles,
          background: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          color: '#f3f4f6',
          border: '2px solid rgba(255, 255, 255, 0.8)',
          boxShadow: isHovered
            ? '0 8px 25px rgba(255, 255, 255, 0.2)'
            : 'none'
        };
      
      default:
        return baseStyles;
    }
  }, [button.variant, isHovered]);

  return (
    <Link
      href={button.url}
      style={{
        ...getButtonStyles(),
        animation: enableAnimations ? `slideInUp 0.8s ease-out ${index * 0.2}s both` : 'none'
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onFocus={() => handleHover(true)}
      onBlur={() => handleHover(false)}
      aria-label={button.ariaLabel || button.text}
    >
      {/* Shimmer Effect */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          transform: isHovered ? 'translateX(200%)' : 'translateX(-100%)',
          transition: 'transform 0.6s ease',
          pointerEvents: 'none'
        }}
      />
      
      {/* Button Content */}
      <span style={{ position: 'relative', zIndex: 1 }}>
        {button.icon && (
          <span role="img" aria-hidden="true" style={{ fontSize: '1.1em' }}>
            {button.icon}
          </span>
        )}
        {button.text}
      </span>
    </Link>
  );
};

/**
 * Hero CTA buttons component
 * 
 * @param {HeroCTAButtonsProps} props - Component props
 * @returns {JSX.Element} Hero CTA buttons with animations
 */
export default function HeroCTAButtons({
  primaryButton,
  secondaryButton,
  direction = 'column',
  enableAnimations = true
}: HeroCTAButtonsProps): JSX.Element {
  const buttons = [primaryButton, secondaryButton].filter(Boolean) as CTAButton[];

  if (buttons.length === 0) {
    return <div />;
  }

  return (
    <div style={{
      marginTop: '2rem',
      display: 'flex',
      flexDirection: direction,
      gap: '1rem',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }}>
      {buttons.map((button, index) => (
        <CTAButtonComponent
          key={`${button.url}-${index}`}
          button={button}
          index={index}
          enableAnimations={enableAnimations}
        />
      ))}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
