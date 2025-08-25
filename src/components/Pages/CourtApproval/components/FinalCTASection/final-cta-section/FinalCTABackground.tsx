interface FinalCTABackgroundProps {
  children: React.ReactNode;
}

export default function FinalCTABackground({ children }: FinalCTABackgroundProps) {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
      padding: '48px 16px',
      textAlign: 'center',
      color: '#ffffff'
    }}>
      {children}
    </section>
  );
}
