'use client';

/**
 * Why Choose Title Component
 * 
 * Main section title for the Why Choose section.
 * 
 * @component WhyChooseTitle
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function WhyChooseTitle() {
  return (
    <h2 style={{
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      fontWeight: '700',
      lineHeight: '1.2',
      marginBottom: '24px',
      color: '#2d5a27'
    }}>
      Why Choose SmarterPayouts?
    </h2>
  );
}
