// References Section - under 50 lines per complexity rule
// External links to legal references

export default function ReferencesSection() {
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
        📚 References & Further Reading
      </h2>
      <ul style={{
        color: '#4b5563',
        lineHeight: '1.6',
        fontSize: '1.03rem',
        paddingLeft: '1.5rem',
        margin: '0'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <a href="https://www.law.cornell.edu/uscode/text/26/104" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'none' }}>
            26 U.S. Code § 104 - Compensation for injuries or sickness
          </a>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <a href="https://www.law.cornell.edu/uscode/text/26/130" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'none' }}>
            26 U.S. Code § 130 - Certain personal injury liability assignments
          </a>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <a href="https://www.law.cornell.edu/uscode/text/26/5891" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'none' }}>
            26 U.S. Code § 5891 - Structured settlement factoring transactions
          </a>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <a href="https://www.congress.gov/bill/97th-congress/house-bill/5470" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'none' }}>
            Periodic Payment Settlement Act of 1982 (Public Law 97-473)
          </a>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <a href="https://www.congress.gov/bill/107th-congress/house-bill/2884" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'none' }}>
            Victims of Terrorism Tax Relief Act of 2001
          </a>
        </li>
        <li style={{ marginBottom: '0' }}>
          <a href="https://www.nacccs.org/structured-settlement-protection-acts/" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'none' }}>
            National Association of Settlement Purchasers: State Protection Acts
          </a>
        </li>
      </ul>
    </section>
  );
}
