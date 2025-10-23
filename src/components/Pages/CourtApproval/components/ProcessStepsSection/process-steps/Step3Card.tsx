import Link from 'next/link';

export default function Step3Card() {
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
          background: 'linear-gradient(90deg, #f59e0b, #eab308)'
        }}></div>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏛️</div>
        <div style={{
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: '#ffffff',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.875rem',
          fontWeight: 600,
          marginBottom: '1rem',
          display: 'inline-block'
        }}>Step 3</div>
        <h5 style={{ color: '#047857', fontWeight: 700, marginBottom: '1rem' }}>Court Hearing</h5>
        <p style={{ color: '#6b7280', lineHeight: 1.6 }}>
          Some states require a brief hearing. You may join by phone, Zoom, or in person. We'll walk you through everything.
        </p>
        <Link href="/mint-intelligent-chat" style={{
          textDecoration: 'none',
          display: 'block',
          marginTop: '1rem',
          padding: '0.75rem',
          background: '#fffbeb',
          borderRadius: '12px',
          border: '1px solid #fed7aa',
          color: '#d97706',
          fontSize: '0.875rem',
          fontWeight: 600,
          transition: 'all 0.2s ease'
        }}>
          <img
            src="/assets/images/mint-mascot.png"
            alt="Mint AI"
            style={{
              width: '18px',
              height: '18px',
              objectFit: 'contain',
              marginRight: '0.5rem',
              display: 'inline-block',
              verticalAlign: 'middle'
            }}
          />
          Practice with Mint AI
        </Link>
      </div>
    </div>
  );
}
