// Accordion item component - under 50 lines per complexity rule
// Individual state accordion with button and content

import { AccordionButton } from '../accordion-button';
import { AccordionContent } from '../accordion-content';
import type { StateDataCollection } from '../../../types';

interface AccordionItemProps {
  state: string;
  isOpen: boolean;
  onToggle: () => void;
  stateLawDetails: StateDataCollection;
}

export default function AccordionItem({ 
  state, 
  isOpen, 
  onToggle, 
  stateLawDetails 
}: AccordionItemProps) {
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    }}>
      <AccordionButton 
        state={state}
        isOpen={isOpen}
        onClick={onToggle}
      />
      {isOpen && (
        <div style={{
          padding: '1.5rem 2rem 2rem 2rem',
          background: '#f9fafb',
          borderTop: '1px solid #e5e7eb'
        }}>
          <AccordionContent 
            state={state}
            stateLawDetails={stateLawDetails}
          />
        </div>
      )}
    </div>
  );
}
