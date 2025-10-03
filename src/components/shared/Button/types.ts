/**
 * Button Type Definitions
 * 
 * Centralized type definitions for the Button component.
 * 
 * @module ButtonTypes
 * @author SmarterPayouts Team
 * @since 2024
 */

import { CSSProperties } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render as different element (e.g., 'a' for links) */
  as?: 'button' | 'a';
  /** Link href (when as='a') */
  href?: string;
  /** Button variant/style */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'cta' | 'golden' | 'technology-primary' | 'technology-secondary' | 'mint-chat' | 'government-navy' | 'government-slate' | 'building-charcoal' | 'building-forest' | 'facebook-blue' | 'professional-teal';
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
  /** Custom gradient background (for cta variant) */
  gradient?: string;
  /** Enable enhanced hover animations */
  enhancedHover?: boolean;
  /** Custom hover animation scale */
  hoverScale?: number;
  /** Use dark chocolate text color for better contrast */
  darkText?: boolean;
  /** Use cream text color for softer contrast */
  creamText?: boolean;
  /** Custom border color */
  borderColor?: string;
  /** Enable subtle shimmer animation */
  shimmer?: boolean;
  /** Delay shimmer animation (in seconds) */
  shimmerDelay?: number;
}

