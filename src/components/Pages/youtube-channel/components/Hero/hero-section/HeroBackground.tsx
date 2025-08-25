import React from 'react';

/**
 * Hero Background Component for YouTube Channel
 * 
 * Provides the background styling and visual effects
 * for the hero section with gradient and pattern overlays.
 * 
 * @component HeroBackground
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface HeroBackgroundProps {
  /** Children content to render over background */
  children: React.ReactNode;
}

/**
 * Hero Background Component
 * 
 * ## Features
 * - ✅ Gradient background with brand colors
 * - ✅ Subtle pattern overlays
 * - ✅ Responsive design
 * - ✅ Accessibility compliance
 * 
 * @param props - Component props
 * @returns JSX element with background styling
 * 
 * @example
 * ```tsx
 * <HeroBackground>
 *   <HeroContent />
 * </HeroBackground>
 * ```
 */
export default function HeroBackground({ children }: HeroBackgroundProps) {
  return (
    <section 
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
        padding: "4rem 0 3rem",
        position: "relative",
        overflow: "hidden"
      }}
      aria-labelledby="hero-title"
    >
      {/* Background Pattern */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(5, 150, 105, 0.05) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)`,
          pointerEvents: "none"
        }}
        aria-hidden="true"
      />

      {/* Content Container */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px',
        position: 'relative',
        zIndex: 1
      }}>
        {children}
      </div>
    </section>
  );
}
