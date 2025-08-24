/**
 * Home Page Types
 * 
 * Centralized TypeScript interfaces and types for all Home page components.
 * Provides type safety and consistency across the Home page architecture.
 * 
 * @module HomeTypes
 * @author SmarterPayouts Team
 * @since 2024
 */

/**
 * Feature benefit interface
 */
export interface FeatureBenefit {
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Feature icon or emoji */
  icon: string;
  /** Optional link to feature */
  link?: string;
  /** Optional link text */
  linkText?: string;
  /** Feature color theme */
  color?: string;
  /** Background gradient */
  gradient?: string;
  /** Background color */
  backgroundColor?: string;
}

/**
 * Process step interface
 */
export interface ProcessStep {
  /** Step number */
  step: number;
  /** Step title */
  title: string;
  /** Step description */
  description: string;
  /** Step icon */
  icon: string;
  /** Optional link */
  link?: string;
  /** Step color theme */
  color?: string;
}

/**
 * Testimonial interface
 */
export interface Testimonial {
  /** Customer name */
  name: string;
  /** Customer location */
  location: string;
  /** Testimonial text */
  text: string;
  /** Star rating (1-5) */
  rating: number;
  /** Optional customer image */
  image?: string;
  /** Optional customer title/role */
  title?: string;
}

/**
 * Statistic interface
 */
export interface Statistic {
  /** Statistic value */
  value: string;
  /** Statistic label */
  label: string;
  /** Optional description */
  description?: string;
  /** Optional link */
  link?: string;
  /** Color theme */
  color?: string;
}

/**
 * CTA button interface
 */
export interface CTAButton {
  /** Button text */
  text: string;
  /** Button URL */
  url: string;
  /** Button style variant */
  variant: 'primary' | 'secondary' | 'outline';
  /** Button icon */
  icon?: string;
  /** Accessibility label */
  ariaLabel?: string;
}

/**
 * Section header props
 */
export interface SectionHeaderProps {
  /** Section title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Optional description */
  description?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Maximum width for content */
  maxWidth?: string;
  /** Title color */
  titleColor?: string;
  /** Description color */
  descriptionColor?: string;
}

/**
 * Hero section props
 */
export interface HeroSectionProps {
  /** Hero title */
  title?: string;
  /** Hero subtitle */
  subtitle?: string;
  /** Hero description */
  description?: string;
  /** Primary CTA button */
  primaryButton?: CTAButton;
  /** Secondary CTA button */
  secondaryButton?: CTAButton;
  /** Background video URL */
  videoUrl?: string;
  /** Background image URL */
  imageUrl?: string;
}

/**
 * Feature grid props
 */
export interface FeatureGridProps {
  /** Array of features */
  features: FeatureBenefit[];
  /** Grid columns configuration */
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: string | null;
}

/**
 * Process steps props
 */
export interface ProcessStepsProps {
  /** Array of process steps */
  steps: ProcessStep[];
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Show step numbers */
  showNumbers?: boolean;
}

/**
 * Testimonials grid props
 */
export interface TestimonialsGridProps {
  /** Array of testimonials */
  testimonials: Testimonial[];
  /** Maximum number to display */
  maxDisplay?: number;
  /** Show all testimonials link */
  showAllLink?: string;
}

/**
 * Statistics bar props
 */
export interface StatisticsBarProps {
  /** Array of statistics */
  statistics: Statistic[];
  /** Layout style */
  layout?: 'horizontal' | 'grid';
}

/**
 * Loading state interface
 */
export interface LoadingState {
  /** Is component loading */
  isLoading: boolean;
  /** Loading message */
  message?: string;
}

/**
 * Error state interface
 */
export interface ErrorState {
  /** Error occurred */
  hasError: boolean;
  /** Error message */
  message?: string;
  /** Retry function */
  onRetry?: () => void;
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  /** Animation delay in milliseconds */
  delay?: number;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Animation easing function */
  easing?: string;
  /** Enable hover animations */
  enableHover?: boolean;
  /** Enable entrance animations */
  enableEntrance?: boolean;
}

/**
 * Common section props
 */
export interface SectionProps {
  /** Section ID for navigation */
  id?: string;
  /** Section class name */
  className?: string;
  /** Loading state */
  loading?: LoadingState;
  /** Error state */
  error?: ErrorState;
  /** Animation configuration */
  animation?: AnimationConfig;
}
