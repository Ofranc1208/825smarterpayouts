import Link from 'next/link';

export default function ChatMintButton() {
  return (
    <Link href="/mint-intelligent-chat" style={{
      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      color: 'white',
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
      💬 Chat with Mint AI
    </Link>
  );
}
