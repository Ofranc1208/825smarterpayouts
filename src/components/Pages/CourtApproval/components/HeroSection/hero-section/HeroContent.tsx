import { HeroHeaderContainer } from '../hero-header';
import { HeroCTAContainer } from '../hero-cta';

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
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <HeroHeaderContainer />
        <HeroCTAContainer />
      </div>
    </div>
  );
}
