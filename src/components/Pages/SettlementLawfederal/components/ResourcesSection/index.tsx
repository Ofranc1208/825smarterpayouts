// Additional Resources Section - under 50 lines per complexity rule
// Mix of internal and external links

import Link from 'next/link';

export default function ResourcesSection() {
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
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        🔗 Additional Resources
      </h2>
      <ul style={{
        color: '#4b5563',
        lineHeight: '1.6',
        fontSize: '1.03rem',
        paddingLeft: '1.5rem',
        margin: '0'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <Link href="/structured-settlement-laws-by-state" style={{ color: '#059669', textDecoration: 'none', fontWeight: '500' }}>
            Structured Settlement Laws by State
          </Link>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <a href="https://www.irs.gov/pub/irs-pdf/p4345.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'none' }}>
            IRS Publication 4345: Settlements – Taxability
          </a>
        </li>
        <li style={{ marginBottom: '0' }}>
          <a href="https://www.justice.gov/crt/structured-settlement-fact-sheet" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'none' }}>
            U.S. Department of Justice: Structured Settlement Fact Sheet
          </a>
        </li>
      </ul>
    </section>
  );
}
