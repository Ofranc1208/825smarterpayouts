// Phone CTA button component - under 50 lines per complexity rule
// Simple interactive component

interface PhoneButtonProps {
  onClick: () => void;
}

export default function PhoneButton({ onClick }: PhoneButtonProps) {
  return (
    <a 
      href="tel:8555823506" 
      onClick={onClick}
      style={{
        display: 'inline-block',
        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '1.5rem',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)'
      }}
    >
      📞 Call (855) 582-3506
    </a>
  );
}
