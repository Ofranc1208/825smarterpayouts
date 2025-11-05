'use client';
import HeroTitle from './HeroTitle';
import HeroDescription from './HeroDescription';
import HeroCTAButtons from './HeroCTAButtons';

interface HeroSectionProps {
  onCTAClick?: (buttonId: string) => void;
}

export default function HeroSection({ onCTAClick }: HeroSectionProps) {
  return (
    <section style={{
      background: "linear-gradient(135deg, #f8fafc 0%, #e9f9f1 50%, #f0fdf4 100%)",
      padding: "3rem 0",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          textAlign: 'center',
          width: '100%'
        }}>
          <HeroTitle
            title="Contact Us"
            subtitle=""
          />
          <HeroDescription
            description="We're here to help. Reach out and our team will respond within 24 hours."
          />
          <HeroCTAButtons onCTAClick={onCTAClick} />
        </div>
      </div>
    </section>
  );
}
