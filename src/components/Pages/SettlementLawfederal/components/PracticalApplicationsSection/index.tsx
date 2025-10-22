// Practical Applications Section - under 50 lines per complexity rule
// How federal laws work in real-world scenarios

import { settlementLawPageData } from '../../data';

export default function PracticalApplicationsSection() {
  const { practicalApplications } = settlementLawPageData;

  return (
    <section style={{
      background: 'white',
      padding: '2.5rem',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
      marginBottom: '2rem',
      border: '1px solid #e5e7eb'
    }}>
      <h2 style={{
        fontSize: '1.75rem',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        ⚙️ How Federal Laws Operate in Practice
      </h2>

      <div style={{
        display: 'grid',
        gap: '2rem'
      }}>
        {/* Tax-Free Treatment */}
        <div style={{
          background: '#f0fdf4',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          border: '1px solid #bbf7d0'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#166534',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            💰 {practicalApplications.taxFreeTreatment.title}
          </h3>

          <p style={{
            color: '#166534',
            marginBottom: '1rem',
            fontSize: '1rem'
          }}>
            {practicalApplications.taxFreeTreatment.description}
          </p>

          <ul style={{
            color: '#166534',
            lineHeight: '1.6',
            fontSize: '0.95rem',
            paddingLeft: '1.5rem',
            margin: 0
          }}>
            {practicalApplications.taxFreeTreatment.details.map((detail, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                {detail}
              </li>
            ))}
          </ul>
        </div>

        {/* Transfers and Sales */}
        <div style={{
          background: '#fef3c7',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          border: '1px solid #fde68a'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#92400e',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🔄 {practicalApplications.transfersAndSales.title}
          </h3>

          <p style={{
            color: '#92400e',
            marginBottom: '1rem',
            fontSize: '1rem'
          }}>
            {practicalApplications.transfersAndSales.description}
          </p>

          <ul style={{
            color: '#92400e',
            lineHeight: '1.6',
            fontSize: '0.95rem',
            paddingLeft: '1.5rem',
            margin: 0
          }}>
            {practicalApplications.transfersAndSales.details.map((detail, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                {detail}
              </li>
            ))}
          </ul>
        </div>

        {/* Court Approval */}
        <div style={{
          background: '#eff6ff',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          border: '1px solid #bfdbfe'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1e40af',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ⚖️ {practicalApplications.courtApproval.title}
          </h3>

          <p style={{
            color: '#1e40af',
            marginBottom: '1rem',
            fontSize: '1rem'
          }}>
            {practicalApplications.courtApproval.description}
          </p>

          <ul style={{
            color: '#1e40af',
            lineHeight: '1.6',
            fontSize: '0.95rem',
            paddingLeft: '1.5rem',
            margin: 0
          }}>
            {practicalApplications.courtApproval.details.map((detail, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
