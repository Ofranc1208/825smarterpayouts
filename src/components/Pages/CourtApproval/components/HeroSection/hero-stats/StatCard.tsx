import Link from 'next/link';

interface StatCardProps {
  value: string;
  label: string;
  link: string;
  description: string;
}

export default function StatCard({ value, label, link, description }: StatCardProps) {
  return (
    <Link href={link} style={{ textDecoration: 'none' }}>
      <div style={{
        padding: '1rem',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        borderRadius: '12px',
        border: '1px solid #bbf7d0',
        transition: 'transform 0.2s ease',
        cursor: 'pointer',
        textAlign: 'center',
        minHeight: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
      title={description}>
        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#047857' }}>{value}</div>
        <div style={{ fontSize: '0.8rem', color: '#065f46', marginTop: '0.25rem' }}>{label}</div>
      </div>
    </Link>
  );
}
