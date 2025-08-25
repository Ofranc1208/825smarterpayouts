export default function CourtAppearanceFAQ() {
  return (
    <details style={{
      background: '#f8fafc',
      borderRadius: '16px',
      padding: '1.5rem',
      border: '1px solid #e2e8f0'
    }}>
      <summary style={{
        fontWeight: 700,
        color: '#047857',
        cursor: 'pointer',
        fontSize: '1.125rem'
      }}>
        🏛️ Do I have to appear in court?
      </summary>
      <div style={{
        marginTop: '1rem',
        color: '#6b7280',
        lineHeight: 1.6
      }}>
        In some states, yes. You may be able to appear by phone or Zoom. We'll prepare you for what to expect, and <strong>Mint AI can help you practice</strong> what to say.
      </div>
    </details>
  );
}
