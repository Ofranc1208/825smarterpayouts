import Link from 'next/link';

export default function LegalRequirementsFeature() {
  return (
    <Link href="/mint-intelligent-chat" style={{
      textDecoration: 'none',
      display: 'block',
      padding: '1rem',
      background: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #0ea5e9',
      color: '#0369a1',
      transition: 'all 0.2s ease',
      width: '100%',
      maxWidth: '250px'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚖️</div>
      <div style={{ fontWeight: 600 }}>Learn Legal Requirements</div>
    </Link>
  );
}
