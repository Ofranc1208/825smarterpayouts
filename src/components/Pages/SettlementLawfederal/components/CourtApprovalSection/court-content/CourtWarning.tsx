// Court approval warning box - under 50 lines per complexity rule
// Yellow warning about excise tax

export default function CourtWarning() {
  return (
    <div style={{
      background: '#fef3c7',
      padding: '1rem',
      borderRadius: '0.5rem',
      border: '1px solid #f59e0b'
    }}>
      <p style={{
        color: '#92400e',
        lineHeight: '1.6',
        fontSize: '1.04rem',
        margin: '0'
      }}>
        <strong>⚠️ Note:</strong> Transfers made without court approval are subject to a 40% excise tax and may be void under federal law.
      </p>
    </div>
  );
}
