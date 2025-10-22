// Best Practices Section - under 50 lines per complexity rule
// Compliance checklist and best practices for structured settlement recipients

import { settlementLawPageData } from '../../data';

export default function BestPracticesSection() {
  const { bestPractices } = settlementLawPageData;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#ca8a04';
      default: return '#6b7280';
    }
  };

  const criticalPractices = bestPractices.filter(p => p.priority === 'critical');
  const highPractices = bestPractices.filter(p => p.priority === 'high');
  const otherPractices = bestPractices.filter(p => p.priority === 'medium' || p.priority === 'low');

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
          <span style={{ fontSize: '1.125rem' }}>✅</span>
          Best Practices & Compliance Checklist
        </h2>
        <p style={{
          color: '#6b7280',
          fontSize: '0.8125rem',
          margin: 0,
          lineHeight: '1.5'
        }}>
          Follow these best practices to protect your structured settlement rights and maintain tax advantages.
        </p>
      </div>

      {/* Critical Practices */}
      {criticalPractices.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#dc2626',
            marginBottom: '0.75rem'
          }}>
            🚨 Critical Requirements
          </h3>

          <div style={{
            display: 'grid',
            gap: '0.75rem'
          }}>
            {criticalPractices.map((practice) => (
              <div
                key={practice.id}
                style={{
                  background: '#fef2f2',
                  padding: '0.875rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #fecaca',
                  borderLeft: '3px solid #dc2626'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.375rem',
                  flexWrap: 'wrap'
                }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#991b1b',
                    margin: 0
                  }}>
                    {practice.title}
                  </h4>

                  <span style={{
                    fontSize: '0.6875rem',
                    padding: '0.125rem 0.5rem',
                    background: '#dc2626',
                    color: 'white',
                    borderRadius: '0.25rem',
                    textTransform: 'uppercase',
                    fontWeight: '600'
                  }}>
                    CRITICAL
                  </span>
                </div>

                <p style={{
                  color: '#7f1d1d',
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.75rem',
                  lineHeight: '1.5'
                }}>
                  {practice.description}
                </p>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* High Priority Practices */}
      {highPractices.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#ea580c',
            marginBottom: '0.75rem'
          }}>
            ⚠️ High Priority Actions
          </h3>

          <div style={{
            display: 'grid',
            gap: '0.75rem'
          }}>
            {highPractices.map((practice) => (
              <div
                key={practice.id}
                style={{
                  background: '#fff7ed',
                  padding: '0.875rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #fed7aa',
                  borderLeft: '3px solid #ea580c'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.375rem',
                  flexWrap: 'wrap'
                }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#9a3412',
                    margin: 0
                  }}>
                    {practice.title}
                  </h4>

                  <span style={{
                    fontSize: '0.6875rem',
                    padding: '0.125rem 0.5rem',
                    background: '#ea580c',
                    color: 'white',
                    borderRadius: '0.25rem',
                    textTransform: 'uppercase',
                    fontWeight: '600'
                  }}>
                    HIGH
                  </span>
                </div>

                <p style={{
                  color: '#7c2d12',
                  margin: '0 0 0.5rem 0',
                  fontSize: '0.75rem',
                  lineHeight: '1.5'
                }}>
                  {practice.description}
                </p>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Practices */}
      {otherPractices.length > 0 && (
        <div>
          <h3 style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#ca8a04',
            marginBottom: '0.75rem'
          }}>
            📋 Recommended Practices
          </h3>

          <div style={{
            display: 'grid',
            gap: '0.75rem'
          }}>
            {otherPractices.map((practice) => (
              <div
                key={practice.id}
                style={{
                  background: '#fefce8',
                  padding: '0.875rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #fde68a',
                  borderLeft: '3px solid #ca8a04'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.375rem',
                  flexWrap: 'wrap'
                }}>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#854d0e',
                    margin: 0
                  }}>
                    {practice.title}
                  </h4>

                  <span style={{
                    fontSize: '0.6875rem',
                    padding: '0.125rem 0.5rem',
                    background: '#ca8a04',
                    color: 'white',
                    borderRadius: '0.25rem',
                    textTransform: 'uppercase',
                    fontWeight: '600'
                  }}>
                    {practice.priority.toUpperCase()}
                  </span>
                </div>

                <p style={{
                  color: '#713f12',
                  margin: 0,
                  fontSize: '0.75rem',
                  lineHeight: '1.5'
                }}>
                  {practice.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
