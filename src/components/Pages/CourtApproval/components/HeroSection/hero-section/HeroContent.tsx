import { HeroHeaderContainer } from '../hero-header';
import { HeroCTAContainer } from '../hero-cta';
import { HeroStatsContainer } from '../hero-stats';

export default function HeroContent() {
  return (
    <div style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem 1.5rem',
          boxShadow: '0 20px 60px rgba(5, 150, 105, 0.1)',
          border: '1px solid rgba(5, 150, 105, 0.1)'
        }}>
          <HeroHeaderContainer />
          <HeroCTAContainer />
          <HeroStatsContainer />
        </div>
      </div>
    </div>
  );
}
