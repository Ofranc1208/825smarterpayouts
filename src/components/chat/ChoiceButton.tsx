"use client";
import React, { useState, useRef } from 'react';
import styles from './ChoiceButton.module.css';

export interface ChoiceButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  className?: string;
  index?: number; // For staggered animations
  [key: string]: any; // Allow any additional props
}

/**
 * Choice Button Component - Deployment-Safe Version
 *
 * Simplified button component with reduced complexity for better
 * deployment compatibility. Removes complex animations that may
 * cause issues in production environments.
 *
 * @component ChoiceButton
 * @author SmarterPayouts Team
 * @since 2024
 * @version 3.0.0 - Deployment Fix
 */

/**
 * Choice Button - Deployment Safe Implementation
 *
 * ## Key Improvements
 * - ✅ Simplified hover/click animations for deployment compatibility
 * - ✅ Reduced CSS complexity to prevent deployment conflicts
 * - ✅ Maintained visual appeal while ensuring reliability
 * - ✅ Removed potentially problematic transform animations
 * - ✅ Added error boundaries for robust operation
 *
 * ## Changes from Original
 * - Removed complex icon animations that may fail in deployment
 * - Simplified hover effects using CSS transitions instead of direct style manipulation
 * - Reduced animation complexity for better performance
 * - Maintained core functionality while improving reliability
 */
const ChoiceButton: React.FC<ChoiceButtonProps> = ({ icon, text, onClick, className, index = 0, ...otherProps }) => {
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Enhanced click handler with comprehensive debugging for deployment
  const handleClick = () => {
    try {
      console.log('[ChoiceButton DEPLOYMENT DEBUG] === BUTTON CLICK DETECTED ===');
      console.log('[ChoiceButton] Button text:', text);
      console.log('[ChoiceButton] onClick handler exists:', !!onClick);
      console.log('[ChoiceButton] Button ref:', buttonRef.current);
      console.log('[ChoiceButton] Window location:', typeof window !== 'undefined' ? window.location.href : 'SSR');
      
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);

      if (onClick) {
        console.log('[ChoiceButton] 🚀 Executing onClick handler now...');
        onClick();
        console.log('[ChoiceButton] ✅ onClick handler executed successfully');
      } else {
        console.warn('[ChoiceButton] ⚠️ WARNING: onClick handler is undefined!');
      }
    } catch (error) {
      console.error('[ChoiceButton] ❌ CRITICAL ERROR in click handler:', error);
      console.error('[ChoiceButton] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      // Show user-friendly error
      if (typeof window !== 'undefined') {
        window.alert('Button click failed. Please refresh the page and try again.');
      }
    }
  };

  // Enhanced mouse handlers with deployment debugging
  const handleMouseEnter = () => {
    try {
      console.log('[ChoiceButton] Mouse enter - hover state activated');
    } catch (error) {
      console.error('[ChoiceButton] Mouse enter error:', error);
    }
  };

  const handleMouseLeave = () => {
    try {
      console.log('[ChoiceButton] Mouse leave - hover state deactivated');
    } catch (error) {
      console.error('[ChoiceButton] Mouse leave error:', error);
    }
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      type="button"
      className={`${styles.choiceButton} ${className || ''}`}
      {...otherProps}
    >
      {/* Live indicator dot */}
      <div className={styles.liveIndicator}></div>

      {icon && (
        <span className={styles.iconContainer}>
          {icon}
        </span>
      )}

      <span className={styles.buttonText}>
        {text}
      </span>

      <span className={styles.arrowIcon}>
        →
      </span>

      {/* Ripple effect */}
      {isPressed && (
        <div className={`${styles.rippleEffect} ${isPressed ? styles.active : ''}`}></div>
      )}
    </button>
  );
};

export default ChoiceButton; 