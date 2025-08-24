import React from 'react';

/**
 * Navigation Skeleton Component
 * 
 * Provides a loading skeleton for navigation components during SSR hydration
 * or when navigation data is being loaded. Improves perceived performance.
 * 
 * @component NavigationSkeleton
 * @author SmarterPayouts Team
 * @since 2024
 */

interface NavigationSkeletonProps {
  /** Whether to show desktop or mobile skeleton */
  variant?: 'desktop' | 'mobile';
}

/**
 * Navigation Skeleton Component
 * 
 * Renders a skeleton placeholder that matches the navigation layout
 * to prevent layout shift during loading
 */
const NavigationSkeleton: React.FC<NavigationSkeletonProps> = ({ 
  variant = 'desktop' 
}) => {
  const skeletonStyle = {
    backgroundColor: '#f3f4f6',
    borderRadius: '0.375rem',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  };

  if (variant === 'mobile') {
    return (
      <div style={{
        position: 'fixed' as const,
        top: 0,
        right: 0,
        height: '100vh',
        width: '320px',
        backgroundColor: 'white',
        boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
        zIndex: 1001,
        padding: '1rem'
      }}>
        {/* Mobile skeleton content */}
        <div style={{ ...skeletonStyle, height: '2rem', marginBottom: '1rem' }} />
        <div style={{ ...skeletonStyle, height: '3rem', marginBottom: '1.5rem' }} />
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            style={{ 
              ...skeletonStyle, 
              height: '2.5rem', 
              marginBottom: '0.5rem' 
            }} 
          />
        ))}
      </div>
    );
  }

  return (
    <nav style={{
      backgroundColor: '#ffffff',
      borderBottom: '1.5px solid #e0e0e0',
      minHeight: '64px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 1rem'
      }}>
        {/* Logo skeleton */}
        <div style={{ 
          ...skeletonStyle, 
          width: '200px', 
          height: '2rem' 
        }} />
        
        {/* Navigation links skeleton */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              style={{ 
                ...skeletonStyle, 
                width: '80px', 
                height: '1.5rem' 
              }} 
            />
          ))}
        </div>
        
        {/* Mobile menu button skeleton */}
        <div style={{ 
          ...skeletonStyle, 
          width: '2rem', 
          height: '2rem' 
        }} />
      </div>
      
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
    </nav>
  );
};

export default NavigationSkeleton;
