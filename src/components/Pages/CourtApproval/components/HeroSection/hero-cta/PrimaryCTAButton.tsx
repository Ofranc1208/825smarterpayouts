import Link from 'next/link';

export default function PrimaryCTAButton() {
  return (
    <Link href="/pricing-calculator" style={{
      display: "inline-block",
      background: "linear-gradient(135deg, #09b44d 0%, #059669 100%)",
      color: "white",
      padding: "0.75rem 1.5rem",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "600",
      transition: "all 0.2s ease",
      minWidth: "200px",
      textAlign: "center"
    }}>
      💰 Get Your Instant Offer
    </Link>
  );
}
