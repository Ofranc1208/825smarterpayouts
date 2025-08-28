// Hero quote button component - under 50 lines per complexity rule
// Get Your Quote CTA button

import Link from 'next/link';

export default function QuoteButton() {
  return (
    <Link href="/pricing-calculator" style={{
      display: "inline-block",
      background: "linear-gradient(135deg, #09b44d 0%, #059669 100%)",
      color: "white",
      padding: "0.75rem 1.5rem",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "600",
      boxShadow: "0 4px 6px rgba(9, 180, 77, 0.2)"
    }}>
      💰 Get Your Quote
    </Link>
  );
}
