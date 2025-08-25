// State management types for About Us page

export interface LoadingState {
  /** Is component loading */
  isLoading: boolean;
  /** Loading message */
  message?: string;
}

export interface ErrorState {
  /** Error occurred */
  hasError: boolean;
  /** Error message */
  message?: string;
  /** Retry function */
  onRetry?: () => void;
}

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
