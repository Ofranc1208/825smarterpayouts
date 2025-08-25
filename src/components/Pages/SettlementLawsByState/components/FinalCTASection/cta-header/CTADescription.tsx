// CTA description component - under 50 lines per complexity rule
// Simple presentational component with inline data

export default function CTADescription() {
  return (
    <p style={{ 
      fontSize: '1.125rem', 
      color: '#6b7280', 
      marginBottom: '2rem',
      maxWidth: '600px',
      margin: '0 auto 2rem'
    }}>
      Get your instant quote or chat with Mint AI to understand how your state's laws apply to your situation.
    </p>
  );
}
