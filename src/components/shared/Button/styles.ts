/**
 * Button Style Functions
 * 
 * Centralized style generation functions for the Button component.
 * Handles variant styles, size styles, and base styles.
 * 
 * @module ButtonStyles
 * @author SmarterPayouts Team
 * @since 2024
 */

import { CSSProperties } from 'react';
import type { ButtonProps } from './types';

/**
 * Get variant-specific styles
 */
export const getVariantStyles = (
  variant: ButtonProps['variant'],
  gradient?: string,
  darkText?: boolean,
  creamText?: boolean
): CSSProperties => {
  const textColor = creamText ? '#fef3c7' : (darkText ? '#92400e' : 'white');
  
  const variants: Record<string, CSSProperties> = {
    primary: {
      backgroundColor: '#059669',
      color: textColor,
    },
    secondary: {
      backgroundColor: '#6b7280',
      color: textColor,
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#059669',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#059669',
    },
    danger: {
      backgroundColor: '#dc2626',
      color: textColor,
    },
    cta: {
      background: gradient || 'linear-gradient(135deg, #09b44d 0%, #047857 100%)',
      color: textColor,
      border: 'none',
    },
    golden: {
      background: gradient || 'linear-gradient(135deg, #fbc233 0%, #f59e0b 100%)',
      color: textColor,
      border: 'none',
    },
    'technology-primary': {
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      color: '#fef3c7', // Cream color
      border: '2px solid #047857',
    },
    'technology-secondary': {
      background: 'linear-gradient(135deg, #fbc233 0%, #f59e0b 100%)',
      color: '#92400e', // Dark chocolate color
      border: '2px solid #d97706',
    },
    // Mint AI Chat Theme - Purple (AI, Innovation, Chat)
    'mint-chat': {
      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', // Purple gradient
      color: '#ffffff', // Pure white
      border: 'none',
    },
    // Government/Trust Theme - Navy Blue (Professional, Authority)
    'government-navy': {
      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', // Deep navy to royal blue
      color: '#f0f9ff', // Light blue-white
      border: '2px solid #1e3a8a',
      fontSize: '0.9rem', // 20% smaller
    },
    // Government/Trust Theme - Slate Gray (Sophistication, Stability)
    'government-slate': {
      background: 'linear-gradient(135deg, #475569 0%, #64748b 100%)', // Slate gray
      color: '#f1f5f9', // Light slate white
      border: '2px solid #334155',
      fontSize: '0.9rem', // 20% smaller
    },
    // Building/Infrastructure Theme - Charcoal (Strong, Solid)
    'building-charcoal': {
      background: 'linear-gradient(135deg, #374151 0%, #4b5563 100%)', // Charcoal to gray
      color: '#f9fafb', // Off-white
      border: '2px solid #1f2937',
      fontSize: '0.9rem', // 20% smaller
    },
    // Building/Trust Theme - Forest Green (Growth, Stability, Trust)
    'building-forest': {
      background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)', // Deep forest green
      color: '#ecfdf5', // Mint white
      border: '2px solid #064e3b',
    },
    // Facebook Blue (Social, Trustworthy, Modern)
    'facebook-blue': {
      background: 'linear-gradient(135deg, #1877F2 0%, #4267B2 100%)', // Facebook blue gradient
      color: '#ffffff', // Pure white
      border: '2px solid #1877F2',
    },
    // Professional Teal (Legal, Professional, Trustworthy)
    'professional-teal': {
      background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)', // Teal/cyan gradient
      color: '#f0fdfa', // Light teal white
      border: '2px solid #0e7490',
    },
  };

  return variants[variant || 'primary'];
};

/**
 * Get size-specific styles
 */
export const getSizeStyles = (
  size: ButtonProps['size'],
  enhancedHover: boolean
): CSSProperties => {
  const sizes: Record<string, CSSProperties> = {
    sm: {
      padding: enhancedHover ? '0.625rem 0.7rem' : '0.5rem 0.6rem',
      fontSize: '0.76rem',
      minHeight: enhancedHover ? '38px' : '2rem',
    },
    md: {
      padding: enhancedHover ? '0.75rem 0.9rem' : '0.75rem 0.85rem',
      fontSize: '0.85rem',
      minHeight: enhancedHover ? '46px' : '2.5rem',
    },
    lg: {
      padding: enhancedHover ? '0.875rem 1.1rem' : '1rem 1.1rem',
      fontSize: '0.95rem',
      minHeight: enhancedHover ? '50px' : '3rem',
    },
    xl: {
      padding: enhancedHover ? '1rem 1.4rem' : '1.25rem 1.4rem',
      fontSize: '1.1rem',
      minHeight: enhancedHover ? '54px' : '3.5rem',
    },
  };

  return sizes[size || 'md'];
};

/**
 * Get base button styles
 */
export const getBaseStyles = (
  enhancedHover: boolean,
  disabled: boolean,
  loading: boolean,
  fullWidth: boolean,
  borderColor?: string,
  variant?: ButtonProps['variant'],
  as?: 'button' | 'a'
): CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  fontWeight: '600',
  borderRadius: enhancedHover ? '12px' : '0.5rem',
  transition: enhancedHover ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'all 0.2s ease-in-out',
  cursor: disabled || loading ? 'not-allowed' : 'pointer',
  position: 'relative' as const,
  width: fullWidth ? '100%' : 'auto',
  opacity: disabled ? 0.6 : 1,
  letterSpacing: enhancedHover ? '0.025em' : 'normal',
  overflow: enhancedHover ? 'hidden' : 'visible',
  boxShadow: enhancedHover ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
  border: borderColor ? `2px solid ${borderColor}` : (variant === 'outline' ? '2px solid #059669' : 'none'),
  outline: 'none',
  textDecoration: as === 'a' ? 'none' : 'none',
});

