import React from 'react';

/**
 * CTA Background Component for YouTube Channel
 * 
 * Provides the background styling and visual effects
 * for the CTA section with theme-based gradients and patterns.
 * 
 * @component CTABackground
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface CTABackgroundProps {
  /** Children content to render over background */
  children: React.ReactNode;
  /** Theme color scheme */
  theme?: 'green' | 'blue' | 'purple';
}

/**
 * CTA Background Component
 * 
 * ## Features
 * - ✅ Theme-based gradient backgrounds
 * - ✅ Subtle pattern overlays
 * - ✅ Responsive design
 * - ✅ Accessibility compliance
 * 
 * @param props - Component props
 * @returns JSX element with background styling
 * 
 * @example
 * ```tsx
 * <CTABackground theme="green">
 *   <CTAContent />
 * </CTABackground>
 * ```
 */
export default function CTABackground({ 
  children, 
  theme = 'green' 
}: CTABackgroundProps) {
  // Get theme colors
  const getThemeColors = () => {
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
  };

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

          {children}
        </div>
      </div>
    </section>
  );
}
