// CTA container component - under 50 lines per complexity rule
// Layout wrapper with responsive container styling

interface CTAContainerProps {
  children: React.ReactNode;
}

export default function CTAContainer({ children }: CTAContainerProps) {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
      padding: '4rem 0',
      textAlign: 'center',
      borderTop: '1px solid #e5e7eb'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
        {children}
      </div>
    </section>
  );
}
