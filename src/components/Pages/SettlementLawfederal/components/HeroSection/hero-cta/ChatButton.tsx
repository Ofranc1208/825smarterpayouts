// Hero chat button component - under 50 lines per complexity rule
// Chat with Mint AI CTA button

import Link from 'next/link';

export default function ChatButton() {
  return (
    <Link href="/mint-intelligent-chat?chat=open&feature=calculator" style={{
      display: "inline-block",
      background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      color: "white",
      padding: "0.75rem 1.5rem",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "600",
      boxShadow: "0 4px 6px rgba(139, 92, 246, 0.2)"
    }}>
      💬 Chat with Mint AI
    </Link>
  );
}
