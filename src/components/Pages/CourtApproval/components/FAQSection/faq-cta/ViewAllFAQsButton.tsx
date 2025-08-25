import Link from 'next/link';

export default function ViewAllFAQsButton() {
  return (
    <Link href="/faqs" style={{
      background: 'linear-gradient(135deg, #09b44d 0%, #059669 100%)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: '600',
      display: 'inline-block',
      transition: 'all 0.2s ease'
    }}>
      📚 View All Court Approval FAQs
    </Link>
  );
}
