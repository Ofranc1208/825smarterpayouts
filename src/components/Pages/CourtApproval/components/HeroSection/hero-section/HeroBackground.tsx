interface HeroBackgroundProps {
  children: React.ReactNode;
}

export default function HeroBackground({ children }: HeroBackgroundProps) {
  return (
    <section style={{
      background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
      padding: "2rem 0 3rem",
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {children}
    </section>
  );
}
