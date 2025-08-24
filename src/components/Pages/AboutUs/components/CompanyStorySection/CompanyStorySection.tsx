/**
 * Company Story Section - Main Component
 * 
 * Streamlined main component that orchestrates the company story section display.
 * This component is now much smaller and focused on coordination rather
 * than implementation details, which are handled by sub-components.
 * 
 * @component CompanyStorySection
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import StoryHeader from './StoryHeader';
import StoryContent from './StoryContent';
import StoryTimeline from './StoryTimeline';
import { COMPANY_STORY_CONFIG, STORY_PARAGRAPHS, COMPANY_MILESTONES } from './data';
import type { CompanyStorySectionProps } from './types';

/**
 * Main company story section component
 * 
 * Orchestrates the display of company story content with proper layout,
 * responsive behavior, and accessibility. Delegates rendering to specialized
 * sub-components for better maintainability.
 * 
 * @param {CompanyStorySectionProps} props - Component props
 * @returns {JSX.Element} Complete company story section
 */
export default function CompanyStorySection({
  id = 'company-story-section',
  className,
  showTimeline = false,
  config
}: CompanyStorySectionProps = {}): JSX.Element {
  // Merge custom config with default config
  const storyConfig = { ...COMPANY_STORY_CONFIG, ...config };

  return (
    <section 
      id={id}
      style={{
        background: storyConfig.background.section,
        padding: storyConfig.background.padding,
        ...(className && { className })
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: storyConfig.layout.maxWidth
          }}>
            <StoryHeader
              title={storyConfig.title}
              subtitle={storyConfig.subtitle}
              align="center"
            />

            <StoryContent
              paragraphs={STORY_PARAGRAPHS}
              background={storyConfig.background}
              layout={storyConfig.layout}
            />

            {showTimeline && (
              <StoryTimeline
                milestones={[...COMPANY_MILESTONES]}
                orientation="horizontal"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
