export default function TestimonialSection() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '3rem auto'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e5e7eb',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#ffffff',
          padding: '0 1rem',
          fontSize: '2rem'
        }}>💬</div>
        <blockquote style={{ margin: 0, paddingTop: '1rem' }}>
          <p style={{
            fontSize: '1.125rem',
            fontStyle: 'italic',
            color: '#374151',
            marginBottom: '1rem',
            lineHeight: 1.6
          }}>
            "I was nervous about the court process, but SmarterPayouts explained everything and made it easy. <strong>Mint AI even helped me practice what to say!</strong> The judge even commented on how well-prepared I was!"
          </p>
          <footer style={{
            fontSize: '1rem',
            color: '#6b7280',
            fontWeight: 600
          }}>
            — M. Lee, Florida
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
