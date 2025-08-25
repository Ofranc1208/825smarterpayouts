import Link from 'next/link';
import { SITE_STATS } from '../../../../../../app/config/siteConfig';

export default function ComplianceSection() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <Link href={SITE_STATS.compliance.link} style={{ textDecoration: 'none' }}>
        <span style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
          color: '#047857',
          padding: '1rem 2rem',
          borderRadius: '50px',
          fontSize: '1.125rem',
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          border: '2px solid #bbf7d0',
          boxShadow: '0 4px 20px rgba(5, 150, 105, 0.1)',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        title={SITE_STATS.compliance.description}>
          ✅ {SITE_STATS.compliance.value} State & Federal Compliant
        </span>
      </Link>
    </div>
  );
}
