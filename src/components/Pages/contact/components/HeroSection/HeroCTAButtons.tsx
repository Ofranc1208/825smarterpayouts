'use client';
import Link from 'next/link';

interface HeroCTAButtonsProps {
  onCTAClick?: (buttonId: string) => void;
}

export default function HeroCTAButtons({ onCTAClick }: HeroCTAButtonsProps) {
  const handleButtonClick = (buttonId: string) => {
    if (onCTAClick) {
      onCTAClick(buttonId);
    }
  };

  return (
    <div style={{
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      flexWrap: "wrap"
    }}>
      <Link 
        href="/mint-chat-active?type=calculate&source=contact-hero" 
        style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #09b44d 0%, #059669 100%)",
          color: "white",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "600",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
        onClick={() => handleButtonClick('pricing-calculator')}
      >
        Get Your Instant Offer
      </Link>
      <Link 
        href="/mint-intelligent-chat" 
        style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
          color: "white",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "600",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
        onClick={() => handleButtonClick('mint-intelligent-chat')}
      >
        💬 Chat with Mint AI
      </Link>
    </div>
  );
}
