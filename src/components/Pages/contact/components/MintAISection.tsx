'use client';
import Link from 'next/link';

interface MintAISectionProps {
  onCTAClick?: (buttonId: string) => void;
}

export default function MintAISection({ onCTAClick }: MintAISectionProps) {
  const handleCTAClick = () => {
    if (onCTAClick) {
      onCTAClick('mint-ai-section');
    }
  };

  return (
    <section style={{
      padding: "4rem 0",
      background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      color: "white",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: "3rem",
          marginBottom: "1.5rem"
        }}>
          🤖💬
        </div>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "1rem"
        }}>
          Meet Mint AI
        </h2>
        <p style={{
          fontSize: "1.25rem",
          marginBottom: "2rem",
          maxWidth: "600px",
          margin: "0 auto 2rem",
          opacity: "0.9"
        }}>
          Get instant answers to your settlement questions 24/7. Our AI assistant is trained on structured settlement expertise and ready to help.
        </p>
        <Link 
          href="/mint-intelligent-chat"
          style={{
            display: "inline-block",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1.125rem",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          onClick={handleCTAClick}
        >
          💬 Start Chatting with Mint AI
        </Link>
      </div>
    </section>
  );
}
