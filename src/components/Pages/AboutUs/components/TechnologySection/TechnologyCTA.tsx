/**
 * Technology CTA Component
 * 
 * Call-to-action component for the technology section with engaging
 * messaging and interactive buttons. Features Mint AI integration
 * and responsive design.
 * 
 * @component TechnologyCTA
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useCallback } from 'react';

/**
 * Props for TechnologyCTA component
 */
interface TechnologyCTAProps {
  /** CTA text content */
  text?: string;
  /** Primary button text */
  primaryButtonText?: string;
  /** Primary button link */
  primaryButtonLink?: string;
  /** Secondary button text */
  secondaryButtonText?: string;
  /** Secondary button link */
  secondaryButtonLink?: string;
  /** Background theme */
  theme?: 'light' | 'dark' | 'gradient';
}

/**
 * Technology CTA component
 * 
 * @param {TechnologyCTAProps} props - Component props
 * @returns {JSX.Element} Interactive CTA section
 */
export default function TechnologyCTA({
  text = "Experience the difference technology makes in your settlement journey.",
  primaryButtonText = "Explore Our Platform",
  primaryButtonLink = "/get-a-quote",
  secondaryButtonText = "Chat with Mint AI",
  secondaryButtonLink = "/mint-intelligent-chat",
  theme = 'gradient'
}: TechnologyCTAProps): JSX.Element {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  /**
   * Handle button hover state
   */
  const handleButtonHover = useCallback((buttonId: string | null) => {
    setHoveredButton(buttonId);
  }, []);

  /**
   * Get theme styles
   */
  const getThemeStyles = useCallback(() => {
    const themes = {
      light: {
        background: '#f8fafc',
        border: '#e2e8f0',
        textColor: '#374151'
      },
      dark: {
        background: '#1f2937',
        border: '#374151',
        textColor: '#f9fafb'
      },
      gradient: {
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f8fafc 100%)',
        border: '#bbf7d0',
        textColor: '#374151'
      }
    };
    return themes[theme];
  }, [theme]);

  const themeStyles = getThemeStyles();

  return (
    <div style={{
      background: themeStyles.background,
      padding: '2.5rem 2rem',
      borderRadius: '16px',
      textAlign: 'center',
      border: `1px solid ${themeStyles.border}`,
      marginTop: '3rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(5, 150, 105, 0.05) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)`,
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Icon */}
        <div style={{
          fontSize: '2.5rem',
          marginBottom: '1.5rem',
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
        }}>
          🚀
        </div>

        {/* CTA Text */}
        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          color: themeStyles.textColor,
          lineHeight: '1.6',
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem',
          fontWeight: '500'
        }}>
          {text}
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {/* Primary Button */}
          <a
            href={primaryButtonLink}
            style={{
              background: hoveredButton === 'primary' 
                ? 'linear-gradient(135deg, #047857 0%, #065f46 100%)'
                : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: 'white',
              padding: '0.875rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.2s ease',
              transform: hoveredButton === 'primary' ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: hoveredButton === 'primary' 
                ? '0 10px 15px -3px rgba(5, 150, 105, 0.3)'
                : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={() => handleButtonHover('primary')}
            onMouseLeave={() => handleButtonHover(null)}
            onFocus={() => handleButtonHover('primary')}
            onBlur={() => handleButtonHover(null)}
            aria-label={`${primaryButtonText} - Start your settlement journey`}
          >
            <span role="img" aria-hidden="true">🎯</span>
            {primaryButtonText}
          </a>

          {/* Secondary Button - Mint AI */}
          <a
            href={secondaryButtonLink}
            style={{
              background: hoveredButton === 'secondary'
                ? 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)'
                : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white',
              padding: '0.875rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.2s ease',
              transform: hoveredButton === 'secondary' ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: hoveredButton === 'secondary'
                ? '0 10px 15px -3px rgba(139, 92, 246, 0.3)'
                : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={() => handleButtonHover('secondary')}
            onMouseLeave={() => handleButtonHover(null)}
            onFocus={() => handleButtonHover('secondary')}
            onBlur={() => handleButtonHover(null)}
            aria-label={`${secondaryButtonText} - Get AI-powered assistance`}
          >
            <span role="img" aria-hidden="true">💬</span>
            {secondaryButtonText}
          </a>
        </div>

        {/* Additional Info */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.8)'
        }}>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            margin: 0,
            fontStyle: 'italic'
          }}>
            💡 <strong>Pro Tip:</strong> Our technology platform is designed to give you complete transparency and control over your settlement process.
          </p>
        </div>
      </div>
    </div>
  );
}
