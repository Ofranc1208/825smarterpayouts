export default function StatsGrid() {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '1.5rem',
      marginTop: '1.5rem',
      fontSize: '0.875rem',
      color: '#6b7280'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.25rem' }}>✅</span>
        <span>100% Compliant with All Laws</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.25rem' }}>🗺️</span>
        <span>Serving All 50 States</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.25rem' }}>⏱️</span>
        <span>15-50 Days Average Approval</span>
      </div>
    </div>
  );
}
