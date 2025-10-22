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
          <a
            href="https://www.law.cornell.edu/uscode/text/26/104"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#059669', textDecoration: 'none' }}
            aria-label="26 U.S. Code § 104 - Compensation for injuries or sickness (opens in new window)"
          >
            26 U.S. Code § 104 - Compensation for injuries or sickness
            <span style={{ fontSize: '0.875rem', opacity: 0.7, marginLeft: '0.25rem' }}>↗</span>
          </a>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <a
            href="https://www.law.cornell.edu/uscode/text/26/130"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#059669', textDecoration: 'none' }}
            aria-label="26 U.S. Code § 130 - Certain personal injury liability assignments (opens in new window)"
          >
            26 U.S. Code § 130 - Certain personal injury liability assignments
            <span style={{ fontSize: '0.875rem', opacity: 0.7, marginLeft: '0.25rem' }}>↗</span>
          </a>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <a
            href="https://www.law.cornell.edu/uscode/text/26/5891"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#059669', textDecoration: 'none' }}
            aria-label="26 U.S. Code § 5891 - Structured settlement factoring transactions (opens in new window)"
          >
            26 U.S. Code § 5891 - Structured settlement factoring transactions
            <span style={{ fontSize: '0.875rem', opacity: 0.7, marginLeft: '0.25rem' }}>↗</span>
          </a>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <a
            href="https://www.congress.gov/bill/97th-congress/house-bill/5470"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#059669', textDecoration: 'none' }}
            aria-label="Periodic Payment Settlement Act of 1982 (Public Law 97-473) (opens in new window)"
          >
            Periodic Payment Settlement Act of 1982 (Public Law 97-473)
            <span style={{ fontSize: '0.875rem', opacity: 0.7, marginLeft: '0.25rem' }}>↗</span>
          </a>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <a
            href="https://www.congress.gov/bill/107th-congress/house-bill/2884"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#059669', textDecoration: 'none' }}
            aria-label="Victims of Terrorism Tax Relief Act of 2001 (opens in new window)"
          >
            Victims of Terrorism Tax Relief Act of 2001
            <span style={{ fontSize: '0.875rem', opacity: 0.7, marginLeft: '0.25rem' }}>↗</span>
          </a>
        </li>
        <li style={{ marginBottom: '0' }}>
          <a
            href="https://www.nacccs.org/structured-settlement-protection-acts/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#059669', textDecoration: 'none' }}
            aria-label="National Association of Settlement Purchasers: State Protection Acts (opens in new window)"
          >
            National Association of Settlement Purchasers: State Protection Acts
            <span style={{ fontSize: '0.875rem', opacity: 0.7, marginLeft: '0.25rem' }}>↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
}
