/**
 * Company Story Section Types
 * 
 * TypeScript interfaces and types specific to the Company Story section components.
 * Provides type safety and consistency across the Company Story section architecture.
 * 
 * @module CompanyStoryTypes
 * @author SmarterPayouts Team
 * @since 2024
 */

/**
 * Story paragraph interface
 */
export interface StoryParagraph {
  /** Unique paragraph ID */
  id: string;
  /** Paragraph text content */
  text: string;
  /** Emphasis type for styling */
  emphasis: 'founding' | 'solution' | 'stats' | 'mission';
}

/**
 * Company story background configuration
 */
export interface StoryBackground {
  /** Section background color */
  section: string;
  /** Content background color */
  content: string;
  /** Section padding */
  padding: string;
}

/**
 * Company story layout configuration
 */
export interface StoryLayout {
  /** Maximum content width */
  maxWidth: string;
  /** Content padding */
  contentPadding: string;
  /** Border radius */
  borderRadius: string;
}

/**
 * Company story configuration interface
 */
export interface CompanyStoryConfig {
  /** Section title */
  title: string;
  /** Section subtitle */
  subtitle: string;
  /** Background configuration */
  background: StoryBackground;
  /** Layout configuration */
  layout: StoryLayout;
}

/**
 * Company milestone interface
 */
export interface CompanyMilestone {
  /** Milestone year */
  year: string;
  /** Milestone title */
  title: string;
  /** Milestone description */
  description: string;
}

/**
 * Company story section props
 */
export interface CompanyStorySectionProps {
  /** Custom section ID */
  id?: string;
  /** Custom class name */
  className?: string;
  /** Show timeline */
  showTimeline?: boolean;
  /** Custom configuration override */
  config?: Partial<CompanyStoryConfig>;
}

/**
 * Story header props
 */
export interface StoryHeaderProps {
  /** Section title */
  title: string;
  /** Section subtitle */
  subtitle?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

/**
 * Story content props
 */
export interface StoryContentProps {
  /** Story paragraphs */
  paragraphs: StoryParagraph[];
  /** Background configuration */
  background: StoryBackground;
  /** Layout configuration */
  layout: StoryLayout;
}

/**
 * Story timeline props
 */
export interface StoryTimelineProps {
  /** Company milestones */
  milestones: CompanyMilestone[];
  /** Timeline orientation */
  orientation?: 'horizontal' | 'vertical';
}
