/**
 * About Us Page Types
 * 
 * Centralized TypeScript interfaces and types for all About Us components.
 * Provides type safety and consistency across the About Us page architecture.
 * 
 * @module AboutUsTypes
 * @author SmarterPayouts Team
 * @since 2024
 */

// Re-export Hero section types
export type {
  HeroBadge,
  HeroBackground,
  HeroCTAButton,
  HeroConfig,
  HeroSectionProps,
  HeroHeaderProps,
  HeroCTAProps,
  HeroBackgroundProps
} from './components/HeroSection/types';

// Re-export Company Story section types
export type {
  StoryParagraph,
  StoryBackground,
  StoryLayout,
  CompanyStoryConfig,
  CompanyMilestone,
  CompanyStorySectionProps,
  StoryHeaderProps,
  StoryContentProps,
  StoryTimelineProps
} from './components/CompanyStorySection/types';

// Re-export CTA section types
export type {
  CTABackground,
  CTALayout,
  CTAButton,
  CTAConfig,
  CTASectionProps,
  CTAHeaderProps,
  CTAButtonsProps,
  CTABackgroundProps
} from './components/CTASection/types';

/**
 * Technology feature interface
 */
export interface TechnologyFeature {
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
}

/**
 * Company value interface
 */
export interface CompanyValue {
  /** Value title */
  title: string;
  /** Value description */
  description: string;
  /** Value icon */
  icon: string;
  /** Value color theme */
  color: string;
  /** Background color */
  backgroundColor: string;
}

/**
 * Recognition/credential interface
 */
export interface Recognition {
  /** Recognition title */
  title: string;
  /** Recognition description */
  description: string;
  /** Recognition icon or image */
  icon: string;
  /** Optional credential image */
  image?: string;
  /** Optional link to credential */
  link?: string;
  /** Recognition type */
  type: 'certification' | 'award' | 'license' | 'accreditation';
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
}

/**
 * Feature card props
 */
export interface FeatureCardProps {
  /** Feature data */
  feature: TechnologyFeature;
  /** Card index for animations */
  index: number;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * Value card props
 */
export interface ValueCardProps {
  /** Value data */
  value: CompanyValue;
  /** Card index for animations */
  index: number;
}

/**
 * Recognition card props
 */
export interface RecognitionCardProps {
  /** Recognition data */
  recognition: Recognition;
  /** Card index for animations */
  index: number;
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
