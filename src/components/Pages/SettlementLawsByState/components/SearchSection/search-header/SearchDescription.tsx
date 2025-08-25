// Search description component - under 50 lines per complexity rule
// Simple presentational component with inline data

export default function SearchDescription() {
  return (
    <p style={{
      fontSize: '1rem',
      color: '#6b7280',
      marginBottom: '1.5rem',
      lineHeight: 1.5
    }}>
      Search below or browse alphabetically by state.
    </p>
  );
}
