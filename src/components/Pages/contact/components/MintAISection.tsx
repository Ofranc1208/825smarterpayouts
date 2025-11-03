'use client';
import Link from 'next/link';
import { Button } from '@/src/components/shared';

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
      padding: "3rem 0",
      background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      color: "white",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <div style={{
          fontSize: "3rem",
          marginBottom: "1.5rem",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img
            src="/assets/images/mint-mascot.png"
            alt="Mint AI"
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'contain'
            }}
          />
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
          marginBottom: "1.5rem",
          maxWidth: "600px",
          margin: "0 auto 1.5rem",
          opacity: "0.9"
        }}>
          Get instant answers to your settlement questions 24/7.
        </p>
        <Button
          as="a"
          href="/mint-intelligent-chat?chat=open&feature=calculator"
          variant="mint-chat"
          size="lg"
          enhancedHover={true}
          leftIcon="💬"
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)"
          }}
          onClick={handleCTAClick}
        >
          Chat with Mint AI
        </Button>
      </div>
    </section>
  );
}
