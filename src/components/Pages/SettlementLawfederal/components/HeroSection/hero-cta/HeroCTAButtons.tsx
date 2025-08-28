// Hero CTA buttons container - under 50 lines per complexity rule
// Container for both CTA buttons

import QuoteButton from './QuoteButton';
import ChatButton from './ChatButton';

export default function HeroCTAButtons() {
  return (
    <div style={{
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      flexWrap: "wrap"
    }}>
      <QuoteButton />
      <ChatButton />
    </div>
  );
}
