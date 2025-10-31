/**
 * Hero Section Types
 * 
 * TypeScript interfaces and types specific to the Hero section components.
 * Provides type safety and consistency across the Hero section architecture.
 * 
 * @module HeroTypes
 * @author SmarterPayouts Team
 * @since 2024
 */

/**
 * Hero badge configuration
 */
export interface HeroBadge {
  /** Badge variant */
  variant: 'default' | 'compact' | 'large';
  /** Badge text */
  text: string;
}

/**
 * Hero background configuration
 */
export interface HeroBackground {
  /** Background gradient */
  gradient: string;
  /** Section padding */
  padding: string;
}

/**
 * Hero CTA button interface
 */
export interface HeroCTAButton {
  /** Unique button ID */
  id: string;
  /** Button text */
  text: string;
  /** Button link */
  href: string;
  /** Accessibility label */
  ariaLabel?: string;
  /** Button variant */
  variant: 'primary' | 'secondary' | 'technology-primary' | 'technology-secondary' | 'mint-chat';
  /** Button gradient */
  gradient?: string;
  /** Optional icon */
  icon?: string | null;
}

/**
 * Hero configuration interface
 */
export interface HeroConfig {
  /** Badge configuration */
  badge: HeroBadge;
  /** Main title */
  title: string;
  /** Section subtitle */
  subtitle: string;
  /** Hero description */
  description: string;
  /** Background configuration */
  background: HeroBackground;
}

/**
 * Hero section props
 */
export interface HeroSectionProps {
  /** Custom section ID */
  id?: string;
  /** Custom class name */
  className?: string;
  /** Show badge */
  showBadge?: boolean;
  /** Show CTA buttons */
  showCTA?: boolean;
  /** Custom configuration override */
  config?: Partial<HeroConfig>;
}

/**
 * Hero header props
 */
export interface HeroHeaderProps {
  /** Section title */
  title: string;
  /** Section subtitle */
  subtitle: string;
  /** Section description */
  description: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Show badge */
  showBadge?: boolean;
  /** Badge configuration */
  badge?: HeroBadge;
}

/**
 * Hero CTA props
 */
export interface HeroCTAProps {
  /** CTA buttons array */
  buttons: HeroCTAButton[];
  /** Button alignment */
  align?: 'left' | 'center' | 'right';
  /** Button layout */
  layout?: 'horizontal' | 'vertical';
  /** Custom gap between buttons */
  gap?: string;
}

/**
 * Hero background props
 */
export interface HeroBackgroundProps {
  /** Background configuration */
  background: HeroBackground;
  /** Children content */
  children: React.ReactNode;
  /** Custom styles */
  style?: React.CSSProperties;
}
