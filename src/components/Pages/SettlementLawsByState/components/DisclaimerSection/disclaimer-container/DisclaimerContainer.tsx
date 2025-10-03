// Disclaimer container component - under 50 lines per complexity rule
// Layout wrapper with disclaimer box styling

interface DisclaimerContainerProps {
  children: React.ReactNode;
}

export default function DisclaimerContainer({ children }: DisclaimerContainerProps) {
  return (
    <div style={{ padding: '0 16px' }}>
      <div style={{
        background: '#fef2f2',
        padding: '0.75rem',
        borderRadius: '8px',
        border: '1px solid #fecaca',
        margin: '1rem 0',
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        {children}
      </div>
    </div>
  );
}
