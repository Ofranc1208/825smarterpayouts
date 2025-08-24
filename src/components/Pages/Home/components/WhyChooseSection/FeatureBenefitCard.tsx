/**
 * Feature Benefit Card Component
 * 
 * Individual feature benefit card component with hover effects, animations,
 * and accessibility features. Displays benefits with icons, descriptions,
 * and optional interactive elements.
 * 
 * @component FeatureBenefitCard
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { FeatureBenefit } from '../../types';

/**
 * Props for FeatureBenefitCard component
 */
interface FeatureBenefitCardProps {
  /** Feature benefit data */
  feature: FeatureBenefit;
  /** Card index for animations */
  index: number;
  /** Enable hover animations */
  enableAnimations?: boolean;
}

/**
 * Feature benefit card component
 * 
 * @param {FeatureBenefitCardProps} props - Component props
 * @returns {JSX.Element} Interactive feature benefit card
 */
export default function FeatureBenefitCard({
  feature,
  index,
  enableAnimations = true
}: FeatureBenefitCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  /**
   * Handle card hover state
   */
  const handleHover = useCallback((hovered: boolean) => {
    setIsHovered(hovered);
  }, []);

  /**
   * Handle card click
   */
  const handleClick = useCallback(() => {
    if (feature.link) {
      router.push(feature.link);
    }
  }, [feature.link, router]);

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '24px',
        borderRadius: '12px',
        position: 'relative',
        overflow: 'hidden',
        background: feature.gradient || feature.backgroundColor || '#ffffff',
        border: `2px solid ${isHovered ? feature.color + '40' : 'transparent'}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered 
          ? `0 20px 25px -5px ${feature.color}20, 0 10px 10px -5px ${feature.color}10`
          : '0 2px 8px rgba(45, 90, 39, 0.06)',
        cursor: feature.link ? 'pointer' : 'default',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        animation: enableAnimations ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : 'none'
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onFocus={() => handleHover(true)}
      onBlur={() => handleHover(false)}
      onClick={feature.link ? handleClick : undefined}
      onKeyDown={feature.link ? handleKeyDown : undefined}
      tabIndex={feature.link ? 0 : -1}
      role={feature.link ? "button" : "article"}
      aria-label={feature.link ? `Learn more about ${feature.title}` : undefined}
      aria-labelledby={`feature-title-${index}`}
      aria-describedby={`feature-desc-${index}`}
    >
      {/* Background Shimmer Effect */}
      <div 
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `linear-gradient(45deg, transparent 30%, ${feature.color}15 50%, transparent 70%)`,
          transform: isHovered ? 'rotate(45deg) translate(50%, 50%)' : 'rotate(45deg) translate(-50%, -50%)',
          transition: 'transform 0.6s ease',
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      />

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Feature Icon */}
        <div style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
          border: `2px solid ${feature.color}30`,
          margin: '0 auto 1rem',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
        }}>
          <span 
            role="img" 
            aria-label={`${feature.title} icon`}
            style={{
              filter: isHovered ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' : 'none',
              transition: 'filter 0.3s ease'
            }}
          >
            {feature.icon}
          </span>
        </div>

        {/* Feature Title */}
        <h3 
          id={`feature-title-${index}`}
          style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#2d5a27',
            marginBottom: '0.75rem',
            lineHeight: '1.4'
          }}
        >
          {feature.title}
        </h3>

        {/* Feature Description */}
        <p 
          id={`feature-desc-${index}`}
          style={{
            fontSize: '0.875rem',
            color: '#6c757d',
            lineHeight: '1.6',
            marginBottom: feature.link ? '1.5rem' : '0',
            flex: 1
          }}
        >
          {feature.description}
        </p>

        {/* Feature Link/Button */}
        {feature.link && feature.linkText && (
          <div style={{
            marginTop: 'auto'
          }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: feature.color,
                fontWeight: '600',
                fontSize: '0.875rem',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                background: `${feature.color}15`,
                border: `1px solid ${feature.color}30`,
                transition: 'all 0.2s ease',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: isHovered ? `0 4px 8px ${feature.color}20` : 'none'
              }}
              aria-hidden="true" // Parent handles the interaction
            >
              {feature.linkText}
              <span style={{
                fontSize: '1rem',
                transition: 'transform 0.2s ease',
                transform: isHovered ? 'translateX(2px)' : 'translateX(0)'
              }}>
                →
              </span>
            </span>
          </div>
        )}

        {/* Mint AI Badge for AI-related features */}
        {feature.title.toLowerCase().includes('ai') || feature.title.toLowerCase().includes('mint') && (
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '12px',
            fontSize: '0.625rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            opacity: isHovered ? 1 : 0.8,
            transition: 'opacity 0.3s ease'
          }}>
            AI
          </div>
        )}
      </div>

      {/* Pulse Ring Animation */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isHovered ? '120%' : '0%',
          height: isHovered ? '120%' : '0%',
          borderRadius: '50%',
          border: `2px solid ${feature.color}40`,
          opacity: isHovered ? 0.6 : 0,
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
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
