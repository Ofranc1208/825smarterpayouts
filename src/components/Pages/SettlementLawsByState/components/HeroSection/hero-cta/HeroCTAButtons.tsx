// Hero CTA buttons container - under 50 lines per complexity rule
// Simple layout component

import PhoneButton from './PhoneButton';
import ChatButton from '../../FinalCTASection/cta-buttons/ChatButton';

interface HeroCTAButtonsProps {
  onPhoneClick: () => void;
  onChatClick: () => void;
}

export default function HeroCTAButtons({ onPhoneClick, onChatClick }: HeroCTAButtonsProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: '1rem'
    }}>
      <PhoneButton onClick={onPhoneClick} />
      <ChatButton onClick={onChatClick} size="small" />
    </div>
  );
}
