/**
 * Story Content Component
 * 
 * Displays the main company story content with styled paragraphs
 * and proper typography. Features responsive design and
 * accessibility enhancements.
 * 
 * @component StoryContent
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import type { StoryContentProps } from './types';

/**
 * Company story content component
 * 
 * @param {StoryContentProps} props - Component props
 * @returns {JSX.Element} Story content with paragraphs
 */
export default function StoryContent({
  paragraphs,
  background,
  layout
}: StoryContentProps): JSX.Element {
  return (
    <div style={{
      background: background.content,
      borderRadius: layout.borderRadius,
      padding: layout.contentPadding,
      marginBottom: "1.5rem"
    }}>
      {paragraphs.map((paragraph, index) => (
        <p
          key={paragraph.id}
          style={{
            fontSize: "1.125rem",
            color: "#374151",
            lineHeight: "1.6",
            marginBottom: index === paragraphs.length - 1 ? "0" : "1rem"
          }}
        >
          {paragraph.text}
        </p>
      ))}
    </div>
  );
}
