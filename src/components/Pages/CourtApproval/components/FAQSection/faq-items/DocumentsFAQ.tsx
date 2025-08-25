export default function DocumentsFAQ() {
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
        📋 What documents do I need?
      </summary>
      <div style={{
        marginTop: '1rem',
        color: '#6b7280',
        lineHeight: 1.6
      }}>
        We handle most paperwork for you. <strong>Mint AI can explain each document</strong> and help you gather any additional items your state requires.
      </div>
    </details>
  );
}
