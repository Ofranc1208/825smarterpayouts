import Link from 'next/link';

export default function SecondaryCTAButton() {
  return (
    <Link href="/mint-intelligent-chat" style={{
      display: "inline-block",
      background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      color: "white",
      padding: "0.75rem 1.5rem",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "600",
      transition: "all 0.2s ease",
      minWidth: "200px",
      textAlign: "center"
    }}>
      💬 Ask Mint AI
    </Link>
  );
}
