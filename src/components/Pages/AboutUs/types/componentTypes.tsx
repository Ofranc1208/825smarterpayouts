// Component-specific prop types
import type { TechnologyFeature, CompanyValue, Recognition } from './aboutUsTypes';

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

export interface FeatureCardProps {
  /** Feature data */
  feature: TechnologyFeature;
  /** Card index for animations */
  index: number;
  /** Optional click handler */
  onClick?: () => void;
}

export interface ValueCardProps {
  /** Value data */
  value: CompanyValue;
  /** Card index for animations */
  index: number;
}

export interface RecognitionCardProps {
  /** Recognition data */
  recognition: Recognition;
  /** Card index for animations */
  index: number;
}
