'use client';
import MintBadge from '../../../../../../app/components/MintBadge';
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
      padding: "4rem 0 3rem",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            textAlign: 'center'
          }}>
            <MintBadge variant="compact" style={{ marginBottom: "2rem" }} />
            <HeroTitle 
              title="Contact Us"
              subtitle="Get In Touch"
            />
            <HeroDescription 
              description="We're here to help you get the most from your structured settlement. Reach out and our friendly team will respond within 24 hours."
            />
            <HeroCTAButtons onCTAClick={onCTAClick} />
          </div>
        </div>
      </div>
    </section>
  );
}
