// Hero title component - under 50 lines per complexity rule
// Simple presentational component with inline data

export default function HeroTitle() {
  return (
    <h1 style={{
      fontSize: '2.2rem',
      fontWeight: '800',
      color: '#1f2937',
      marginBottom: '1rem',
      lineHeight: 1.2
    }}>
      Structured Settlement Laws by State
    </h1>
  );
}
