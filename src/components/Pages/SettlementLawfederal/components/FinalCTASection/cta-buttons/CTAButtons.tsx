// Final CTA buttons container - under 50 lines per complexity rule
// Container for both large CTA buttons

import QuoteButton from './QuoteButton';
import ChatButton from './ChatButton';

export default function CTAButtons() {
  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }}>
      <QuoteButton />
      <ChatButton />
    </div>
  );
}
