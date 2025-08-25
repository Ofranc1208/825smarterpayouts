// Disclaimer title component - under 50 lines per complexity rule
// Simple presentational component with inline data

export default function DisclaimerTitle() {
  return (
    <h3 style={{
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#dc2626',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      ⚖️ Attorney Disclaimer
    </h3>
  );
}
