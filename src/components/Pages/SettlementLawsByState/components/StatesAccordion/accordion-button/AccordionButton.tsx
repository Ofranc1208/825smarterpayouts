// Accordion button component - under 50 lines per complexity rule
// Interactive component for state accordion headers

interface AccordionButtonProps {
  state: string;
  isOpen: boolean;
  onClick: () => void;
}

export default function AccordionButton({ state, isOpen, onClick }: AccordionButtonProps) {
  return (
    <h2 style={{ margin: 0 }}>
      <button
        onClick={onClick}
        style={{
          width: '100%',
          padding: '1.5rem 2rem',
          background: isOpen ? '#f0fdf4' : '#ffffff',
          border: 'none',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#1f2937'
        }}
      >
        <span>🏛️ {state}</span>
        <span style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}>
          ⌄
        </span>
      </button>
    </h2>
  );
}
