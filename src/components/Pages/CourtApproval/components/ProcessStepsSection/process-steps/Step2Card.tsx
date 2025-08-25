import Link from 'next/link';

export default function Step2Card() {
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
          background: 'linear-gradient(90deg, #3b82f6, #06b6d4)'
        }}></div>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍⚖️</div>
        <div style={{
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          color: '#ffffff',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.875rem',
          fontWeight: 600,
          marginBottom: '1rem',
          display: 'inline-block'
        }}>Step 2</div>
        <h5 style={{ color: '#047857', fontWeight: 700, marginBottom: '1rem' }}>Judge Reviews</h5>
        <p style={{ color: '#6b7280', lineHeight: 1.6 }}>
          A judge reviews your paperwork, makes sure the offer is in your best interest, and ensures legal compliance.
        </p>
        <Link href="/structured-settlement-laws" style={{
          textDecoration: 'none',
          display: 'block',
          marginTop: '1rem',
          padding: '0.75rem',
          background: '#eff6ff',
          borderRadius: '12px',
          border: '1px solid #bfdbfe',
          color: '#2563eb',
          fontSize: '0.875rem',
          fontWeight: 600,
          transition: 'all 0.2s ease'
        }}>
          📚 Learn About Legal Requirements
        </Link>
      </div>
    </div>
  );
}
