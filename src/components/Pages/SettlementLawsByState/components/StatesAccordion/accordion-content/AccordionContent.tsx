// Accordion content component - under 50 lines per complexity rule
// Displays state law details or coming soon message

import type { StateDataCollection } from '../../../types';

interface AccordionContentProps {
  state: string;
  stateLawDetails: StateDataCollection;
}

export default function AccordionContent({ state, stateLawDetails }: AccordionContentProps) {
  const stateData = stateLawDetails[state];

  if (!stateData) {
    return (
      <div style={{
        background: '#fef3c7',
        padding: '1.5rem',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h5 style={{ color: '#92400e', marginBottom: '0.75rem' }}>
          🔄 Coming Soon: {state} Details
        </h5>
        <p style={{ color: '#78350f', margin: 0 }}>
          State-specific details are being compiled.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p><strong>Can I sell?</strong> {stateData.canSell}</p>
      <p><strong>Statute Citation:</strong> {stateData.statuteCitation}</p>
      <p><strong>Enacted:</strong> {stateData.enactmentDate}</p>
      <div style={{ marginTop: '1rem' }}>
        <strong>Key Provisions:</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          {stateData.keyProvisions.map((provision, idx) => (
            <li key={idx} style={{ marginBottom: '0.25rem' }}>{provision}</li>
          ))}
        </ul>
      </div>
      <p style={{ marginTop: '1rem' }}>
        <strong>Court Approval Process:</strong> {stateData.courtApproval}
      </p>
      <div style={{ marginTop: '1rem' }}>
        <strong>Prohibited Practices:</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          {stateData.prohibited.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '0.25rem' }}>{item}</li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <strong>Resources:</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          {stateData.resources.map((r, idx) => (
            <li key={idx} style={{ marginBottom: '0.25rem' }}>
              <a href={r.url} target="_blank" rel="noopener noreferrer" 
                 style={{ color: '#059669', textDecoration: 'underline' }}>
                {r.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
