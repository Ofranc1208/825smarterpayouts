interface FinalCTABackgroundProps {
  children: React.ReactNode;
}

export default function FinalCTABackground({ children }: FinalCTABackgroundProps) {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e9f9f1 100%)',
      padding: '48px 16px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern - Light green radial gradients */}
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        background: "radial-gradient(circle at 20% 80%, rgba(5, 150, 105, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.06) 0%, transparent 50%)",
        pointerEvents: "none"
      }}></div>
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </section>
  );
}
