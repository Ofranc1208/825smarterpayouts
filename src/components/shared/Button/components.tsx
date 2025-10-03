/**
 * Button Sub-Components
 * 
 * Reusable sub-components used within the Button component.
 * Includes LoadingSpinner, ShimmerEffect, and AnimationStyles.
 * 
 * @module ButtonComponents
 * @author SmarterPayouts Team
 * @since 2024
 */

import React from 'react';

/**
 * Loading spinner component
 */
export const LoadingSpinner: React.FC = () => (
  <div style={{
    width: '1rem',
    height: '1rem',
    border: '2px solid currentColor',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  }} />
);

/**
 * Shimmer effect component
 */
export const ShimmerEffect: React.FC<{ delay: number }> = ({ delay }) => (
  <div style={{
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
    animation: delay > 0 
      ? `shimmer-delayed 6s ease-in-out infinite` 
      : "shimmer 6s ease-in-out infinite",
    pointerEvents: "none"
  }} />
);

/**
 * Keyframe animations for button effects
 */
export const AnimationStyles: React.FC = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes shimmer {
        0% { left: -100%; }
        33.33% { left: 100%; }
        100% { left: 100%; }
      }
      @keyframes shimmer-delayed {
        0% { left: -100%; }
        50% { left: -100%; }
        83.33% { left: 100%; }
        100% { left: 100%; }
      }
    `
  }} />
);

