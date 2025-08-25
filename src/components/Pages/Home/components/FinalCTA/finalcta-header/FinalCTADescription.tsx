/**
 * Final CTA Description Component
 * 
 * Displays the description text for the Final CTA section.
 * 
 * @component FinalCTADescription
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function FinalCTADescription() {
  return (
    <p style={{
      fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
      color: 'rgba(255, 255, 255, 0.5)',
      marginBottom: '32px',
      lineHeight: '1.6'
    }}>
      See what your structured settlement is worth today. No obligations, no personal information required.
    </p>
  );
}
