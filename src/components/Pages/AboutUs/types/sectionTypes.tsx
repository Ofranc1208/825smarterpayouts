// Re-export section-specific types from component directories

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
} from '../components/HeroSection/types';

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
} from '../components/CompanyStorySection/types';

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
} from '../components/CTASection/types';
