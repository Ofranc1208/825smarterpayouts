// Hero badge component - under 50 lines per complexity rule
// Simple presentational component with inline data

export default function HeroBadge() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)',
      color: '#92400e',
      padding: '0.4rem 1.2rem',
      borderRadius: '1.5rem',
      fontSize: '0.8rem',
      fontWeight: '600',
      display: 'inline-block',
      marginBottom: '1rem',
      border: '1px solid #f59e0b'
    }}>
      📚 Legal Resource Center
    </div>
  );
}
