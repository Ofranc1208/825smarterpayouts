// Federal Laws Section orchestrator - under 50 lines per complexity rule
// Main section combining all law articles - now data-driven

import { LawsContainer } from './laws-container';
import { LawsTitle } from './laws-header';
import { settlementLawPageData } from '../../data';

export default function FederalLawsSection() {
  const { federalLaws } = settlementLawPageData;

  return (
    <LawsContainer>
      <LawsTitle />

      {federalLaws.map((law, index) => (
        <article
          key={law.id}
          style={{
            background: 'white',
            padding: '1.25rem',
            borderRadius: '0.5rem',
            marginBottom: index === federalLaws.length - 1 ? '0' : '1.25rem',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}
        >
          {/* Law Header */}
          <div style={{
            marginBottom: '1rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #f3f4f6'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 0.75rem 0',
              lineHeight: '1.4'
            }}>
              {law.title}
            </h3>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '0.75rem'
            }}>
              <span style={{
                fontSize: '0.875rem',
                padding: '0.25rem 0.75rem',
                background: '#dbeafe',
                color: '#1e40af',
                borderRadius: '0.375rem',
                fontWeight: '600'
              }}>
                {law.year}
              </span>

              {law.publicLaw && (
                <span style={{
                  fontSize: '0.875rem',
                  padding: '0.25rem 0.75rem',
                  background: '#f3f4f6',
                  color: '#6b7280',
                  borderRadius: '0.375rem',
                  fontWeight: '600'
                }}>
                  {law.publicLaw}
                </span>
              )}
            </div>

            <p style={{
              color: '#6b7280',
              margin: 0,
              fontSize: '0.9375rem',
              lineHeight: '1.6'
            }}>
              {law.description}
            </p>
          </div>

          {/* Key Provisions */}
          <div style={{
            background: '#f9fafb',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
            marginBottom: '1rem'
          }}>
            <h4 style={{
              fontSize: '0.9375rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '0.75rem'
            }}>
              Key Provisions
            </h4>

            <ul style={{
              color: '#4b5563',
              lineHeight: '1.6',
              fontSize: '0.875rem',
              paddingLeft: '1.5rem',
              margin: 0
            }}>
              {law.keyProvisions.map((provision, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  {provision}
                </li>
              ))}
            </ul>
          </div>

          {/* Impact */}
          <div style={{
            background: '#ecfdf5',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #d1fae5',
            marginBottom: '1rem'
          }}>
            <h4 style={{
              fontSize: '0.9375rem',
              fontWeight: '600',
              color: '#065f46',
              marginBottom: '0.5rem'
            }}>
              Impact & Significance
            </h4>

            <p style={{
              color: '#047857',
              margin: 0,
              fontSize: '0.875rem',
              lineHeight: '1.6'
            }}>
              {law.impact}
            </p>
          </div>

          {/* Why It Matters */}
          {law.whyItMatters && (
            <div style={{
              background: '#fef3c7',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #fde68a',
              marginBottom: '1rem'
            }}>
              <h4 style={{
                fontSize: '0.9375rem',
                fontWeight: '600',
                color: '#92400e',
                marginBottom: '0.5rem'
              }}>
                Why This Matters
              </h4>

              <p style={{
                color: '#b45309',
                margin: 0,
                fontSize: '0.875rem',
                lineHeight: '1.6'
              }}>
                {law.whyItMatters}
              </p>
            </div>
          )}

          {/* Consumer Takeaway */}
          {law.consumerTakeaway && (
            <div style={{
              background: '#eff6ff',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #bfdbfe',
              marginBottom: '1rem'
            }}>
              <h4 style={{
                fontSize: '0.9375rem',
                fontWeight: '600',
                color: '#1e40af',
                marginBottom: '0.5rem'
              }}>
                Consumer Takeaway
              </h4>

              <p style={{
                color: '#1e40af',
                margin: 0,
                fontSize: '0.875rem',
                lineHeight: '1.6'
              }}>
                {law.consumerTakeaway}
              </p>
            </div>
          )}

          {/* Statutory Sections */}
          <div style={{
            background: '#f9fafb',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb'
          }}>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: '0.75rem'
            }}>
              Statutory References
            </h4>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {law.sections.map((section, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: '0.8125rem',
                    padding: '0.375rem 0.75rem',
                    background: '#e5e7eb',
                    color: '#374151',
                    borderRadius: '0.375rem',
                    fontWeight: '500'
                  }}
                >
                  {section}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </LawsContainer>
  );
}
