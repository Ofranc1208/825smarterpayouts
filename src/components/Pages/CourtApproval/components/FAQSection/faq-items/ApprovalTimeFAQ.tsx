import { SITE_STATS } from '../../../../../../../app/config/siteConfig';

export default function ApprovalTimeFAQ() {
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
        ⏰ How long does court approval take?
      </summary>
      <div style={{
        marginTop: '1rem',
        color: '#6b7280',
        lineHeight: 1.6
      }}>
        Most approvals are completed in 3–6 weeks, depending on your state and court schedule. Our average is <strong>{SITE_STATS.avgDays.value} days</strong>.
      </div>
    </details>
  );
}
