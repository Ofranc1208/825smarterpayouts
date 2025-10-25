/**
 * Trust Indicators Component
 * 
 * Displays trust indicators like security, licensing, and compliance info.
 * 
 * @component TrustIndicators
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function TrustIndicators() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '24px',
      flexWrap: 'wrap',
      opacity: 0.8
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.875rem'
      }}>
        <span>🔒</span>
        <span>Secure & Confidential</span>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.875rem'
      }}>
        <span>📋</span>
        <span>Florida Licensed</span>
      </div>
    </div>
  );
}
