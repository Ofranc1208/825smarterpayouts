/**
 * Navigation Skeleton Components
 * 
 * Loading skeleton components for navigation with accessibility support
 * 
 * @module NavigationSkeleton
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

import React from 'react';

interface NavigationSkeletonProps {
  type: 'desktop' | 'mobile' | 'analytics';
  height?: string;
  width?: string;
  animated?: boolean;
}

/**
 * Base skeleton styles and animations
 */
const useSkeletonStyles = (animated: boolean = true) => {
  const baseStyle: React.CSSProperties = {
    backgroundColor: '#f3f4f6',
    borderRadius: '0.375rem',
    ...(animated && {
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    })
  };

  const itemStyle: React.CSSProperties = {
    backgroundColor: '#e5e7eb',
    borderRadius: '0.25rem'
  };

  return { baseStyle, itemStyle };
};

/**
 * Desktop Navigation Skeleton
 */
const DesktopSkeleton: React.FC<{ width: string; height: string; animated: boolean }> = ({ 
  width, 
  height, 
  animated 
}) => {
  const { baseStyle, itemStyle } = useSkeletonStyles(animated);

  const containerStyle: React.CSSProperties = {
    ...baseStyle,
    width,
    height,
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    gap: '1rem'
  };

  return (
    <div 
      style={containerStyle}
      role="progressbar"
      aria-label="Loading desktop navigation"
      aria-valuetext="Loading navigation components"
    >
      <div style={{ ...itemStyle, width: '80px', height: '1rem' }} />
      <div style={{ ...itemStyle, width: '60px', height: '1rem' }} />
      <div style={{ ...itemStyle, width: '70px', height: '1rem' }} />
      <div style={{ ...itemStyle, width: '90px', height: '1rem' }} />
      <div style={{ ...itemStyle, width: '100px', height: '1rem' }} />
    </div>
  );
};

/**
 * Mobile Navigation Skeleton
 */
const MobileSkeleton: React.FC<{ width: string; height: string; animated: boolean }> = ({ 
  width, 
  height, 
  animated 
}) => {
  const { baseStyle, itemStyle } = useSkeletonStyles(animated);

  const containerStyle: React.CSSProperties = {
    ...baseStyle,
    width,
    height,
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    justifyContent: 'flex-end'
  };

  return (
    <div 
      style={containerStyle}
      role="progressbar"
      aria-label="Loading mobile navigation"
      aria-valuetext="Loading mobile menu button"
    >
      <div style={{ 
        ...itemStyle,
        width: '24px', 
        height: '24px'
      }} />
    </div>
  );
};

/**
 * Analytics Skeleton (minimal)
 */
const AnalyticsSkeleton: React.FC<{ width: string; height: string; animated: boolean }> = ({ 
  width, 
  height, 
  animated 
}) => {
  const { baseStyle } = useSkeletonStyles(animated);

  const containerStyle: React.CSSProperties = {
    ...baseStyle,
    width,
    height: height || '2px',
    opacity: 0.3
  };

  return (
    <div 
      style={containerStyle}
      role="progressbar"
      aria-label="Loading navigation analytics"
      aria-valuetext="Loading analytics components"
    />
  );
};

/**
 * Main Navigation Skeleton Component
 */
export const NavigationSkeleton: React.FC<NavigationSkeletonProps> = ({ 
  type, 
  height = '64px', 
  width = '100%',
  animated = true
}) => {

  // Render CSS animation keyframes
  const AnimationStyles = () => (
    <style jsx>{`
      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
    `}</style>
  );

  return (
    <>
      {animated && <AnimationStyles />}
      
      {type === 'desktop' && (
        <DesktopSkeleton width={width} height={height} animated={animated} />
      )}
      
      {type === 'mobile' && (
        <MobileSkeleton width={width} height={height} animated={animated} />
      )}
      
      {type === 'analytics' && (
        <AnalyticsSkeleton width={width} height={height} animated={animated} />
      )}
    </>
  );
};

/**
 * Skeleton with custom content
 */
interface CustomSkeletonProps {
  children: React.ReactNode;
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const CustomNavigationSkeleton: React.FC<CustomSkeletonProps> = ({
  children,
  animated = true,
  className,
  style
}) => {
  const { baseStyle } = useSkeletonStyles(animated);

  const containerStyle: React.CSSProperties = {
    ...baseStyle,
    ...style
  };

  return (
    <div 
      className={className}
      style={containerStyle}
      role="progressbar"
      aria-label="Loading navigation content"
    >
      {animated && (
        <style jsx>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}</style>
      )}
      {children}
    </div>
  );
};

/**
 * Skeleton item component for building custom skeletons
 */
interface SkeletonItemProps {
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
}

export const SkeletonItem: React.FC<SkeletonItemProps> = ({
  width = '100%',
  height = '1rem',
  style
}) => {
  const itemStyle: React.CSSProperties = {
    backgroundColor: '#e5e7eb',
    borderRadius: '0.25rem',
    width,
    height,
    ...style
  };

  return <div style={itemStyle} />;
};

export default NavigationSkeleton;
