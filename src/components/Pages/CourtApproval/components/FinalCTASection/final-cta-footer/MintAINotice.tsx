export default function MintAINotice() {
  return (
    <div style={{
      padding: '1rem',
      background: 'rgba(5, 150, 105, 0.1)',
      borderRadius: '8px',
      display: 'inline-block',
      border: '1px solid rgba(5, 150, 105, 0.2)'
    }}>
      <span style={{ fontSize: '0.875rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <img
          src="/assets/images/mint-mascot.png"
          alt="Mint AI"
          style={{
            width: '20px',
            height: '20px',
            objectFit: 'contain'
          }}
        />
        Need help? Our Mint AI is available 24/7 for instant guidance!
      </span>
    </div>
  );
}
