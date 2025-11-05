// Introduction Section - under 50 lines per complexity rule
// Comprehensive introduction to structured settlements and federal law

import { settlementLawPageData } from '../../data';
import { COLORS } from '@/src/components/shared/styles';
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography';

export default function IntroductionSection() {
  const { introduction } = settlementLawPageData;

  return (
    <section style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
      marginBottom: '1.5rem',
      border: '1px solid #e5e7eb'
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '1.25rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #f3f4f6'
      }}>
        <h2 style={{
          ...TEXT_PRESETS.heroTitle,
          fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
          color: COLORS.neutral.gray900,
          margin: '0 0 0.5rem 0',
          background: COLORS.titleGradients.grayToGreen,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          {introduction.title}
        </h2>
        <p style={{
          fontSize: '0.875rem',
          lineHeight: '1.6',
          margin: 0,
          color: '#6b7280'
        }}>
          {introduction.description}
        </p>
      </div>

      {/* Key Points */}
      <div style={{
        display: 'grid',
        gap: '0.75rem'
      }}>
        {introduction.keyPoints.map((point, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              padding: '0.875rem',
              background: '#f9fafb',
              borderRadius: '0.375rem',
              border: '1px solid #e5e7eb'
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              background: '#059669',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: '600',
              flexShrink: 0
            }}>
              {index + 1}
            </div>
            <p style={{
              margin: 0,
              fontSize: '0.875rem',
              lineHeight: '1.5',
              color: '#374151'
            }}>
              {point}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
