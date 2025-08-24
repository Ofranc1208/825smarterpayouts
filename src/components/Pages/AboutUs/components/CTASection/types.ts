/**
 * CTA Section Types
 * 
 * TypeScript interfaces and types specific to the CTA section components.
 * Provides type safety and consistency across the CTA section architecture.
 * 
 * @module CTATypes
 * @author SmarterPayouts Team
 * @since 2024
 */

/**
 * CTA background configuration
 */
export interface CTABackground {
  /** Background gradient */
  gradient: string;
  /** Section padding */
  padding: string;
}

/**
 * CTA layout configuration
 */
export interface CTALayout {
  /** Maximum content width */
  maxWidth: string;
  /** Text alignment */
  textAlign: 'left' | 'center' | 'right';
}

/**
 * CTA button interface
 */
export interface CTAButton {
  /** Unique button ID */
  id: string;
  /** Button text */
  text: string;
  /** Button link */
  href: string;
  /** Accessibility label */
  ariaLabel: string;
  /** Button variant */
  variant: 'primary' | 'secondary';
  /** Button gradient */
  gradient: string;
  /** Button size */
  size: 'small' | 'medium' | 'large';
  /** Optional icon */
  icon?: string | null;
}

/**
 * CTA configuration interface
 */
export interface CTAConfig {
  /** Section title */
  title: string;
  /** Section subtitle */
  subtitle: string;
  /** Section description */
  description: string;
  /** Background configuration */
  background: CTABackground;
  /** Layout configuration */
  layout: CTALayout;
}

/**
 * CTA section props
 */
export interface CTASectionProps {
  /** Custom section ID */
  id?: string;
  /** Custom class name */
  className?: string;
  /** Show subtitle */
  showSubtitle?: boolean;
  /** Show buttons */
  showButtons?: boolean;
  /** Custom configuration override */
  config?: Partial<CTAConfig>;
}

/**
 * CTA header props
 */
export interface CTAHeaderProps {
  /** Section title */
  title: string;
  /** Section subtitle */
  subtitle?: string;
  /** Section description */
  description: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Show subtitle */
  showSubtitle?: boolean;
}

/**
 * CTA buttons props
 */
export interface CTAButtonsProps {
  /** CTA buttons array */
  buttons: CTAButton[];
  /** Button alignment */
  align?: 'left' | 'center' | 'right';
  /** Button layout */
  layout?: 'horizontal' | 'vertical';
  /** Custom gap between buttons */
  gap?: string;
}

/**
 * CTA background props
 */
export interface CTABackgroundProps {
  /** Background configuration */
  background: CTABackground;
  /** Layout configuration */
  layout: CTALayout;
  /** Children content */
  children: React.ReactNode;
  /** Custom styles */
  style?: React.CSSProperties;
}
