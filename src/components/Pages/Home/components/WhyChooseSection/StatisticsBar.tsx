/**
 * Statistics Bar Component
 * 
 * Displays key statistics and metrics in an interactive bar format.
 * Features hover effects, click navigation, and responsive design
 * for showcasing company achievements and data.
 * 
 * @component StatisticsBar
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { StatisticsBarProps, Statistic } from '../../types';

/**
 * Individual statistic item component
 */
const StatisticItem = ({ 
  statistic, 
  index,
  layout = 'horizontal'
}: { 
  statistic: Statistic; 
  index: number;
  layout?: 'horizontal' | 'grid';
}): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  /**
   * Handle statistic hover state
   */
  const handleHover = useCallback((hovered: boolean) => {
    setIsHovered(hovered);
  }, []);

  /**
   * Handle statistic click
   */
  const handleClick = useCallback(() => {
    if (statistic.link) {
      router.push(statistic.link);
    }
  }, [statistic.link, router]);

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
        padding: '12px 8px',
        borderRadius: '8px',
        background: 'white',
        border: `1px solid ${isHovered ? statistic.color : '#e8f5e8'}`,
        transition: 'all 0.2s ease',
        cursor: statistic.link ? 'pointer' : 'default',
        boxShadow: isHovered 
          ? `0 4px 15px ${statistic.color}20`
          : '0 2px 8px rgba(45, 90, 39, 0.06)',
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        position: 'relative',
        overflow: 'hidden',
        animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onFocus={() => handleHover(true)}
      onBlur={() => handleHover(false)}
      onClick={statistic.link ? handleClick : undefined}
      onKeyDown={statistic.link ? handleKeyDown : undefined}
      tabIndex={statistic.link ? 0 : -1}
      role={statistic.link ? "button" : "article"}
      aria-label={statistic.link ? `Learn more about ${statistic.label}` : undefined}
      aria-describedby={`stat-desc-${index}`}
    >
      {/* Background Glow Effect */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${statistic.color}08, transparent)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Statistic Value */}
        <div style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: statistic.color,
          marginBottom: '2px',
          transition: 'color 0.2s ease'
        }}>
          {statistic.value}
        </div>

        {/* Statistic Label */}
        <div style={{
          color: '#6c757d',
          fontSize: '0.75rem',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {statistic.label}
        </div>

        {/* Statistic Description */}
        {statistic.description && (
          <div 
            id={`stat-desc-${index}`}
            style={{
              color: '#9ca3af',
              fontSize: '0.625rem',
              marginTop: '4px',
              opacity: isHovered ? 1 : 0.8,
              transition: 'opacity 0.2s ease'
            }}
          >
            {statistic.description}
          </div>
        )}

        {/* External Link Indicator */}
        {statistic.link && (
          <div style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            color: statistic.color,
            fontSize: '0.75rem',
            opacity: isHovered ? 1 : 0.5,
            transition: 'all 0.2s ease',
            transform: isHovered ? 'translateX(1px)' : 'translateX(0)'
          }}>
            →
          </div>
        )}
      </div>

      {/* Shimmer Effect */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${statistic.color}20, transparent)`,
          transform: isHovered ? 'translateX(200%)' : 'translateX(-100%)',
          transition: 'transform 0.6s ease',
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

/**
 * Statistics bar component
 * 
 * @param {StatisticsBarProps} props - Component props
 * @returns {JSX.Element} Interactive statistics bar
 */
export default function StatisticsBar({
  statistics,
  layout = 'horizontal'
}: StatisticsBarProps): JSX.Element {
  if (!statistics || statistics.length === 0) {
    return <div />;
  }

  const gridStyles = layout === 'grid' 
    ? {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '1rem'
      }
    : {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap' as const
      };

  return (
    <div style={{
      marginTop: '2rem',
      marginBottom: '1rem'
    }}>
      {/* Statistics Grid/Bar */}
      <div style={gridStyles}>
        {statistics.map((statistic, index) => (
          <StatisticItem
            key={`stat-${index}`}
            statistic={statistic}
            index={index}
            layout={layout}
          />
        ))}
      </div>

      {/* Call-to-Action */}
      <div style={{
        marginTop: '16px',
        textAlign: 'center'
      }}>
        <a 
          href="/pricing-calculator" 
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            fontSize: '1rem',
            lineHeight: '1.5',
            borderRadius: '6px',
            textDecoration: 'none',
            cursor: 'pointer',
            color: '#fff',
            backgroundColor: '#198754',
            border: '1px solid #198754',
            fontWeight: '600',
            transition: 'all 0.15s ease-in-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#157347';
            e.currentTarget.style.borderColor = '#146c43';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(21, 115, 71, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#198754';
            e.currentTarget.style.borderColor = '#198754';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Start Your Quote Now
        </a>
      </div>
    </div>
  );
}
