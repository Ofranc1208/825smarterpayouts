// Disclaimer title component - under 50 lines per complexity rule
// Warning title with icon

export default function DisclaimerTitle() {
  return (
    <h3 style={{
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#92400e',
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      ⚠️ Legal Disclaimer
    </h3>
  );
}
