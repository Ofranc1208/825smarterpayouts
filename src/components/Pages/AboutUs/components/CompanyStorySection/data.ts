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
    text: 'Founded in 2017, SmarterPayouts emerged from a simple belief: structured settlement recipients deserve transparency, speed, and control over their financial decisions.',
    emphasis: 'founding'
  },
  {
    id: 'problem',
    text: 'Our founders, experienced in both technology and structured settlements, recognized that the traditional industry was plagued by high-pressure sales tactics and opaque pricing. They set out to create the first truly transparent, digital-first structured settlement company.',
    emphasis: 'solution'
  },
  {
    id: 'achievement',
    text: "Today, we're proud to be Florida's most trusted structured settlement company, serving clients nationwide with our innovative approach. We've helped over 400+ clients access more than $50 million in early payouts, all while maintaining our commitment to transparency and client-first service.",
    emphasis: 'stats'
  },
  {
    id: 'mission',
    text: 'Our mission remains the same: to provide structured settlement recipients with honest quotes, clear processes, and the respect they deserve during important financial decisions.',
    emphasis: 'mission'
  }
];

/**
 * Company story configuration
 */
export const COMPANY_STORY_CONFIG: CompanyStoryConfig = {
  title: 'Our Story',
  subtitle: 'The SmarterPayouts Journey',
  background: {
    section: 'white',
    content: '#f9fafb',
    padding: '4rem 0'
  },
  layout: {
    maxWidth: '800px',
    contentPadding: '2.5rem',
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
