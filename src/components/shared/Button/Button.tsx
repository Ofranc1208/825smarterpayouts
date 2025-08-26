/**
 * Shared Button Component - Enterprise Grade
 * 
 * Reusable button component with multiple variants, sizes, and states.
 * Designed for consistent UI across all SmarterPayouts pages.
 * 
 * @component Button
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant/style */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Loading state */
  loading?: boolean;
  /** Icon to display before text */
  leftIcon?: React.ReactNode;
  /** Icon to display after text */
  rightIcon?: React.ReactNode;
  /** Full width button */
  fullWidth?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Children content */
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled = false,
  type = 'button',
  children,
  className = '',
  ...props
}) => {
  // Base button styles
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: '600',
    borderRadius: '0.5rem',
    transition: 'all 0.2s ease-in-out',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    border: 'none',
    outline: 'none',
    position: 'relative',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
  };

  // Variant-specific styles
  const variantStyles = {
    primary: {
      backgroundColor: '#059669',
      color: 'white',

    },
    secondary: {
      backgroundColor: '#6b7280',
      color: 'white',

    },
    outline: {
      backgroundColor: 'transparent',
      color: '#059669',
      border: '2px solid #059669',

    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#059669',

    },
    danger: {
      backgroundColor: '#dc2626',
      color: 'white',

    },
  };

  // Size-specific styles
  const sizeStyles = {
    sm: {
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      minHeight: '2rem',
    },
    md: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      minHeight: '2.5rem',
    },
    lg: {
      padding: '1rem 2rem',
      fontSize: '1.125rem',
      minHeight: '3rem',
    },
    xl: {
      padding: '1.25rem 2.5rem',
      fontSize: '1.25rem',
      minHeight: '3.5rem',
    },
  };

  // Combine all styles
  const buttonStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div style={{
      width: '1rem',
      height: '1rem',
      border: '2px solid currentColor',
      borderTop: '2px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }} />
  );

  return (
    <>
      <button
        type={type}
        disabled={disabled || loading}
        style={buttonStyles}
        className={className}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {!loading && leftIcon && leftIcon}
        {children}
        {!loading && rightIcon && rightIcon}
      </button>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default Button;
