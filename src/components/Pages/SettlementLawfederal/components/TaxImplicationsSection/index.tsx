// Tax Implications Section - under 50 lines per complexity rule
// Simple section with title and bullet list

export default function TaxImplicationsSection() {
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
        💰 Tax Implications
      </h2>
      <ul style={{
        color: '#4b5563',
        lineHeight: '1.6',
        fontSize: '1.03rem',
        paddingLeft: '1.5rem',
        margin: '0'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Tax-Exempt Status:</strong> Structured settlement payments are generally tax-free to the recipient under <strong>IRC § 104(a)(2)</strong>.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Transfers:</strong> If a payee sells their payment rights, the lump sum received may be taxable, and the transfer must be court-approved to avoid excise tax under <strong>IRC § 5891</strong>.
        </li>
        <li style={{ marginBottom: '0' }}>
          <strong>Qualified Assignments:</strong> Payments made by a qualified assignee remain tax-free if all requirements are met.
        </li>
      </ul>
    </section>
  );
}
