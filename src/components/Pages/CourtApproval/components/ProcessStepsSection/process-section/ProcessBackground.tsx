interface ProcessBackgroundProps {
  children: React.ReactNode;
}

export default function ProcessBackground({ children }: ProcessBackgroundProps) {
  return (
    <section style={{
      background: '#f8fafc',
      padding: '32px 16px'
    }}>
      {children}
    </section>
  );
}
