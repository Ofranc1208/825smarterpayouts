// Search container component - under 50 lines per complexity rule
// Layout wrapper with responsive container styling

interface SearchContainerProps {
  children: React.ReactNode;
}

export default function SearchContainer({ children }: SearchContainerProps) {
  return (
    <section style={{
      textAlign: 'center',
      padding: '2rem 0',
      maxWidth: '1200px',
      margin: '0 auto',
      paddingLeft: '16px',
      paddingRight: '16px'
    }}>
      {children}
    </section>
  );
}
