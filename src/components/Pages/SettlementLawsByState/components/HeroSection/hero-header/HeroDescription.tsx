// Hero description component - under 50 lines per complexity rule
// Simple presentational component

export default function HeroDescription() {
  return (
    <p style={{
      fontSize: '1rem',
      color: '#6b7280',
      marginBottom: '1.5rem',
      lineHeight: 1.5,
      maxWidth: '700px',
      margin: '0 auto 1.5rem'
    }}>
      Complete legal guide for all 50 states + DC. Court approval requirements, protection acts, and transfer laws.
    </p>
  );
}
