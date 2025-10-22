// Government Resources Section - under 50 lines per complexity rule
// Official government resources and authoritative links

import { settlementLawPageData } from '../../data';

export default function GovernmentResourcesSection() {
  const { governmentResources } = settlementLawPageData;

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#ca8a04';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'statute': return '📜';
      case 'guidance': return '📋';
      case 'model-law': return '⚖️';
      case 'regulation': return '📋';
      default: return '🔗';
    }
  };

  return (
    <section style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
      marginBottom: '1.5rem',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{
        marginBottom: '1.25rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #f3f4f6'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#1f2937',
          margin: '0 0 0.375rem 0',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '1.125rem' }}>🏛️</span>
          Official Government Resources
        </h2>
        <p style={{
          color: '#6b7280',
          fontSize: '0.8125rem',
          margin: 0,
          lineHeight: '1.5'
        }}>
          Access authoritative government sources for structured settlement information, tax guidance, and legal requirements.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gap: '1rem'
      }}>
        {governmentResources.map((resource) => (
          <div
            key={resource.id}
            style={{
              background: '#f9fafb',
              padding: '1rem',
              borderRadius: '0.375rem',
              border: '1px solid #e5e7eb',
              borderLeft: `3px solid ${getRelevanceColor(resource.relevance)}`
            }}
          >
            <div style={{
              marginBottom: '0.75rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '0.75rem',
                marginBottom: '0.5rem'
              }}>
                <h3 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: 0,
                  lineHeight: '1.4',
                  flex: 1
                }}>
                  {resource.title}
                </h3>

                <span style={{
                  fontSize: '0.6875rem',
                  padding: '0.125rem 0.5rem',
                  background: getRelevanceColor(resource.relevance) + '20',
                  color: getRelevanceColor(resource.relevance),
                  borderRadius: '0.25rem',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}>
                  {resource.relevance}
                </span>
              </div>

              <p style={{
                color: '#6b7280',
                margin: 0,
                fontSize: '0.75rem',
                lineHeight: '1.5'
              }}>
                {resource.description}
              </p>
            </div>

            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.5rem 1rem',
                background: '#0f172a',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                fontWeight: '500',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1e293b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0f172a';
              }}
            >
              View Official Resource
              <span style={{ fontSize: '0.875rem' }}>↗</span>
            </a>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '1.25rem',
        padding: '0.875rem',
        background: '#eff6ff',
        borderRadius: '0.375rem',
        border: '1px solid #bfdbfe'
      }}>
        <p style={{
          color: '#1e40af',
          margin: 0,
          fontSize: '0.75rem',
          lineHeight: '1.5'
        }}>
          <strong>Important:</strong> Always verify information with official government sources. Laws and regulations may change, and interpretations can vary by jurisdiction.
        </p>
      </div>
    </section>
  );
}
