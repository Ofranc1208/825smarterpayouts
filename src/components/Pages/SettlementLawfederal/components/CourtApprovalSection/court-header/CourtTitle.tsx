// Court approval section title - under 50 lines per complexity rule
// Section heading with icon

export default function CourtTitle() {
  return (
    <h2 style={{
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      ⚖️ Court Approval Process
    </h2>
  );
}
