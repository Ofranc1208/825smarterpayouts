export default function Step1Card() {
  return (
    <div>
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '2rem 1.5rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e5e7eb',
        height: '100%',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #059669, #34d399)'
        }}></div>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
        <div style={{
          background: 'linear-gradient(135deg, #059669, #047857)',
          color: '#ffffff',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.875rem',
          fontWeight: 600,
          marginBottom: '1rem',
          display: 'inline-block'
        }}>Step 1</div>
        <h5 style={{ color: '#047857', fontWeight: 700, marginBottom: '1rem' }}>File the Petition</h5>
        <p style={{ color: '#6b7280', lineHeight: 1.6 }}>
          Once you accept your offer, we file a legal petition with your state court to begin the approval process.
        </p>
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: '#f0fdf4',
          borderRadius: '12px',
          border: '1px solid #bbf7d0'
        }}>
          <div style={{ fontSize: '0.875rem', color: '#047857', fontWeight: 600 }}>
            🤖 Mint helps prepare your paperwork
          </div>
        </div>
      </div>
    </div>
  );
}
