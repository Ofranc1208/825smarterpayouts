import { SITE_STATS } from '../../../../../../../app/config/siteConfig';

export default function Step4Card() {
  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        borderRadius: '20px',
        padding: '2rem 1.5rem',
        boxShadow: '0 12px 40px rgba(5, 150, 105, 0.15)',
        border: '2px solid #bbf7d0',
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
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
        <div style={{
          background: 'linear-gradient(135deg, #059669, #047857)',
          color: '#ffffff',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.875rem',
          fontWeight: 600,
          marginBottom: '1rem',
          display: 'inline-block'
        }}>Step 4</div>
        <h5 style={{ color: '#047857', fontWeight: 700, marginBottom: '1rem' }}>Approval & Funding</h5>
        <p style={{ color: '#065f46', lineHeight: 1.6 }}>
          Once approved, your Early Payout is typically released within 5–7 business days. If requirements aren't met, it may take longer.
        </p>
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #bbf7d0'
        }}>
          <div style={{ fontSize: '0.875rem', color: '#047857', fontWeight: 600 }}>
            💰 Average: {SITE_STATS.avgDays.value} days
          </div>
        </div>
      </div>
    </div>
  );
}
