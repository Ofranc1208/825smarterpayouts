/**
 * YouTube Channel CTA Section Component
 * 
 * Call-to-action section encouraging users to engage with Mint AI or use
 * the calculator tools. Features responsive design, hover effects, and
 * accessibility enhancements for optimal user experience.
 * 
 * @component CTASection
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useCallback } from 'react';

/**
 * Props for the CTASection component
 */
interface CTASectionProps {
  /** Optional custom title */
  title?: string;
  /** Optional custom description */
  description?: string;
  /** Optional custom Mint AI chat URL */
  mintChatUrl?: string;
  /** Optional custom calculator URL */
  calculatorUrl?: string;
  /** Optional background color theme */
  theme?: 'green' | 'blue' | 'purple';
}

/**
 * CTA button configuration
 */
interface CTAButton {
  /** Button text */
  text: string;
  /** Button URL */
  url: string;
  /** Button icon */
  icon: string;
  /** Button color scheme */
  gradient: string;
  /** Button hover gradient */
  hoverGradient: string;
  /** Accessibility label */
  ariaLabel: string;
}

/**
 * CTA section component for YouTube channel page
 * 
 * @param {CTASectionProps} props - Component props
 * @returns {JSX.Element} CTA section with title, description, and action buttons
 */
export default function CTASection({
  title = "Want Personalized Guidance?",
  description = "Get instant answers to your structured settlement questions with Mint AI or calculate your settlement value with our tools.",
  mintChatUrl = "/mint-intelligent-chat",
  calculatorUrl = "/pricing-calculator",
  theme = 'green'
}: CTASectionProps): JSX.Element {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  /**
   * Handle button hover state
   */
  const handleButtonHover = useCallback((buttonId: string | null) => {
    setHoveredButton(buttonId);
  }, []);

  /**
   * Get theme colors based on selected theme
   */
  const getThemeColors = useCallback(() => {
    const themes = {
      green: {
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
        border: '#bbf7d0',
        titleColor: '#059669'
      },
      blue: {
        background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
        border: '#93c5fd',
        titleColor: '#2563eb'
      },
      purple: {
        background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
        border: '#c4b5fd',
        titleColor: '#7c3aed'
      }
    };
    return themes[theme];
  }, [theme]);

  /**
   * CTA buttons configuration
   */
  const ctaButtons: CTAButton[] = [
    {
      text: 'Chat with Mint AI',
      url: mintChatUrl,
      icon: '💬',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      hoverGradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
      ariaLabel: 'Chat with Mint AI Assistant for personalized guidance'
    },
    {
      text: 'Calculate Value',
      url: calculatorUrl,
      icon: '📊',
      gradient: 'linear-gradient(135deg, #09b44d 0%, #059669 100%)',
      hoverGradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      ariaLabel: 'Use our calculator to estimate your settlement value'
    }
  ];

  /**
   * Get button styles based on hover state
   */
  const getButtonStyles = useCallback((buttonId: string, button: CTAButton) => {
    const isHovered = hoveredButton === buttonId;
    return {
      background: isHovered ? button.hoverGradient : button.gradient,
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem'
    };
  }, [hoveredButton]);

  const themeColors = getThemeColors();

  return (
    <section 
      style={{
        background: '#f8fafc',
        padding: '0 16px 48px'
      }}
      aria-labelledby="cta-title"
    >
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          background: themeColors.background,
          padding: '3rem 2rem',
          borderRadius: '16px',
          textAlign: 'center',
          border: `1px solid ${themeColors.border}`,
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
              backgroundImage: `radial-gradient(circle at 25% 25%, ${themeColors.titleColor}10 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, ${themeColors.titleColor}08 0%, transparent 50%)`,
              pointerEvents: 'none'
            }}
            aria-hidden="true"
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Icon */}
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
            }}>
              🎯
            </div>

            {/* Title */}
            <h2 
              id="cta-title"
              style={{
                fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
                fontWeight: '700',
                marginBottom: '1rem',
                color: themeColors.titleColor,
                background: `linear-gradient(135deg, ${themeColors.titleColor} 0%, #1f2937 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {title}
            </h2>

            {/* Description */}
            <p style={{
              color: '#4b5563',
              fontSize: 'clamp(1rem, 3vw, 1.125rem)',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem',
              lineHeight: '1.6'
            }}>
              {description}
            </p>
            
            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {ctaButtons.map((button, index) => (
                <a 
                  key={index}
                  href={button.url}
                  aria-label={button.ariaLabel}
                  style={getButtonStyles(`cta-${index}`, button)}
                  onMouseEnter={() => handleButtonHover(`cta-${index}`)}
                  onMouseLeave={() => handleButtonHover(null)}
                  onFocus={() => handleButtonHover(`cta-${index}`)}
                  onBlur={() => handleButtonHover(null)}
                >
                  <span role="img" aria-hidden="true">{button.icon}</span>
                  {button.text}
                </a>
              ))}
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
                💡 <strong>Pro Tip:</strong> Mint AI can help you understand complex settlement terms and guide you through the decision-making process in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
