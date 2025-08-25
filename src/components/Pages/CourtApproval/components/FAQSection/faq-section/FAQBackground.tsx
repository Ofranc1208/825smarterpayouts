interface FAQBackgroundProps {
  children: React.ReactNode;
}

export default function FAQBackground({ children }: FAQBackgroundProps) {
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '24px',
      padding: '3rem 2rem',
      boxShadow: '0 12px 48px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e5e7eb',
      marginTop: '3rem'
    }}>
      {children}
    </div>
  );
}
