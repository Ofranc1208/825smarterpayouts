/**
 * Hero Content Component
 * 
 * Displays the main hero content including title, subtitle, and description.
 * Features responsive typography, animations, and accessibility enhancements.
 * 
 * @component HeroContent
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useEffect, useState } from 'react';

/**
 * Props for HeroContent component
 */
interface HeroContentProps {
  /** Hero title */
  title?: string;
  /** Hero subtitle */
  subtitle?: string;
  /** Hero description */
  description?: string;
  /** Enable text animations */
  enableAnimations?: boolean;
  /** Text alignment */
  textAlign?: 'left' | 'center' | 'right';
}

/**
 * Hero content component with animated text
 * 
 * @param {HeroContentProps} props - Component props
 * @returns {JSX.Element} Hero content with title, subtitle, and description
 */
export default function HeroContent({
  title = "Get the Highest Early Payout for Your Future Payments",
  subtitle = "Industry's First AI-Powered Self-Quoting Platform",
  description = "You're in control — Mint, our AI assistant, handles the rest.",
  enableAnimations = true,
  textAlign = 'center'
}: HeroContentProps): JSX.Element {
  const [mounted, setMounted] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  /**
   * Handle component mounting and animations
   */
  useEffect(() => {
    setMounted(true);
    
    if (enableAnimations) {
      // Stagger text animations
      const timeouts = [
        setTimeout(() => setAnimationPhase(1), 200),  // Subtitle
        setTimeout(() => setAnimationPhase(2), 600),  // Title
        setTimeout(() => setAnimationPhase(3), 1000), // Description
      ];

      // Add pulse effect to specific text
      const pulseTimeout = setTimeout(() => {
        const pulse = document.getElementById('pulseText');
        if (pulse) {
          pulse.classList.add('pulse-effect');
        }
      }, 1500);

      return () => {
        timeouts.forEach(clearTimeout);
        clearTimeout(pulseTimeout);
      };
    }
  }, [enableAnimations]);

  /**
   * Get animation styles based on phase
   */
  const getAnimationStyle = (phase: number) => {
    if (!enableAnimations || !mounted) {
      return { opacity: 1, transform: 'translateY(0)' };
    }

    return {
      opacity: animationPhase >= phase ? 1 : 0,
      transform: animationPhase >= phase ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  return (
    <div style={{
      position: 'relative',
      zIndex: 10,
      textAlign: textAlign,
      maxWidth: '900px',
      margin: '0 auto',
      padding: '0 16px'
    }}>
      {/* Subtitle */}
      <div 
        style={{
          ...getAnimationStyle(1),
          marginBottom: '1rem'
        }}
      >
        <div style={{
          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
          fontWeight: '600',
          color: '#fbc233',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          background: 'rgba(251, 194, 51, 0.1)',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          border: '1px solid rgba(251, 194, 51, 0.3)',
          display: 'inline-block',
          backdropFilter: 'blur(10px)'
        }}>
          {subtitle}
        </div>
      </div>

      {/* Main Title */}
      <h1 
        style={{
          ...getAnimationStyle(2),
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: '700',
          lineHeight: '1.1',
          marginBottom: '1.5rem',
          color: '#f3f4f6',
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
          background: 'linear-gradient(135deg, #f3f4f6 0%, #fbc233 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        {title}
      </h1>

      {/* Description */}
      <div 
        style={{
          ...getAnimationStyle(3),
          marginBottom: '2rem'
        }}
      >
        <p style={{ 
          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', 
          color: '#f3f4f6', 
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          lineHeight: '1.6',
          margin: 0
        }}>
          <span id="pulseText">
            {description}
          </span>
        </p>
      </div>

      {/* Floating Elements - Positioned safely within container */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(251, 194, 51, 0.3), rgba(9, 180, 77, 0.3))',
        animation: 'float 3s ease-in-out infinite',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 1s ease',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(9, 180, 77, 0.2), rgba(251, 194, 51, 0.2))',
        animation: 'float 4s ease-in-out infinite reverse',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 1s ease 0.5s',
        pointerEvents: 'none'
      }} />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        .pulse-effect {
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
