import Link from 'next/link';

export default function GetOfferButton() {
  return (
    <Link href="/pricing-calculator" style={{
      background: '#ffffff',
      color: '#047857',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.2s ease',
      minWidth: '200px',
      textAlign: 'center'
    }}>
      💰 Get Your Instant Offer
    </Link>
  );
}
