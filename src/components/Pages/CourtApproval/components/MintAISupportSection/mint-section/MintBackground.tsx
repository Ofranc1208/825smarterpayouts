interface MintBackgroundProps {
  children: React.ReactNode;
}

export default function MintBackground({ children }: MintBackgroundProps) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      borderRadius: '24px',
      padding: '3rem 2rem',
      margin: '3rem 0',
      textAlign: 'center',
      border: '1px solid #0ea5e9'
    }}>
      {children}
    </div>
  );
}
