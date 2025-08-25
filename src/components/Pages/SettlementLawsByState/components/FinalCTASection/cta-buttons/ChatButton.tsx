// Chat button component - under 50 lines per complexity rule
// Unified component with optional analytics tracking

interface ChatButtonProps {
  onClick?: () => void;
  size?: 'small' | 'large';
}

export default function ChatButton({ onClick, size = 'large' }: ChatButtonProps) {
  const isSmall = size === 'small';
  
  return (
    <a 
      href="/mint-intelligent-chat" 
      onClick={onClick}
      style={{
        display: 'inline-block',
        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        color: 'white',
        padding: isSmall ? '0.75rem 1.5rem' : '1rem 2rem',
        borderRadius: isSmall ? '1.5rem' : '2rem',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: isSmall ? '1rem' : '1.125rem',
        boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
      }}
    >
      💬 Chat with Mint AI
    </a>
  );
}
