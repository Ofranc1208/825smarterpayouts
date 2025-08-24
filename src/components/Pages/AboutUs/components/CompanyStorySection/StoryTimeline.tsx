/**
 * Story Timeline Component
 * 
 * Optional timeline component showing company milestones and
 * key achievements. Features responsive design and smooth
 * animations.
 * 
 * @component StoryTimeline
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';
import type { StoryTimelineProps } from './types';

/**
 * Company story timeline component
 * 
 * @param {StoryTimelineProps} props - Component props
 * @returns {JSX.Element} Interactive timeline
 */
export default function StoryTimeline({
  milestones,
  orientation = 'horizontal'
}: StoryTimelineProps): JSX.Element {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div style={{
      background: '#f8fafc',
      borderRadius: '12px',
      padding: '2rem',
      marginTop: '2rem'
    }}>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        Our Journey
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isHorizontal ? 'repeat(auto-fit, minmax(200px, 1fr))' : '1fr',
        gap: '1.5rem'
      }}>
        {milestones.map((milestone, index) => (
          <div 
            key={milestone.year}
            style={{
              background: 'white',
              borderRadius: '8px',
              padding: '1.5rem',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}
          >
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#059669',
              marginBottom: '0.5rem'
            }}>
              {milestone.year}
            </div>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}>
              {milestone.title}
            </h4>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              lineHeight: '1.5'
            }}>
              {milestone.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
