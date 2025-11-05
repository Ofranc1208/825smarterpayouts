/**
 * Company Story Section Data
 * 
 * Centralized data configuration for company story content.
 * Separating data from components for better maintainability and
 * easier content management.
 * 
 * @module CompanyStoryData
 * @author SmarterPayouts Team
 * @since 2024
 */

import type { CompanyStoryConfig, StoryParagraph } from './types';

/**
 * Company story paragraphs
 */
export const STORY_PARAGRAPHS: StoryParagraph[] = [
  {
    id: 'founding',
    text: 'SmarterPayouts is a Florida corporation, founded in 2017 with a mission to provide transparent, instant settlement quotes without pressure or hidden fees.',
    emphasis: 'founding'
  },
  {
    id: 'innovation',
    text: 'We pioneered the first AI-powered platform for structured settlements, delivering real-time quotes in under 60 seconds with no personal information required.',
    emphasis: 'innovation'
  },
  {
    id: 'mission',
    text: 'Our commitment is simple: honest quotes, clear processes, and respectful service during your financial decisions.',
    emphasis: 'mission'
  }
];

/**
 * Company story configuration
 */
export const COMPANY_STORY_CONFIG: CompanyStoryConfig = {
  title: 'Our Story',
  subtitle: 'A Florida corporation dedicated to transparency and innovation since 2017',
  background: {
    section: 'white',
    content: '#f9fafb',
    padding: '3rem 0'
  },
  layout: {
    maxWidth: '800px',
    contentPadding: '1.5rem',
    borderRadius: '16px'
  }
} as const;

/**
 * Company milestones and achievements
 */
export const COMPANY_MILESTONES = [
  {
    year: '2017',
    title: 'Company Founded',
    description: 'SmarterPayouts established with vision of transparency'
  },
  {
    year: '2019',
    title: 'Florida Licensed',
    description: 'Obtained full state licensing and regulatory compliance'
  },
  {
    year: '2021',
    title: 'AI Integration',
    description: 'Launched first AI-powered settlement calculator'
  },
  {
    year: '2024',
    title: 'Industry Leader',
    description: '400+ clients served, $50M+ in payouts processed'
  }
] as const;
