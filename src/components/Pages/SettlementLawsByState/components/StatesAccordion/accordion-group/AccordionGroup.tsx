// Accordion group component - under 50 lines per complexity rule
// Groups states by letter (A, B, C, etc.)

import { AccordionItem } from '../accordion-item';
import type { StateDataCollection } from '../../../types';

interface AccordionGroupProps {
  letter: string;
  states: string[];
  openState: string | null;
  onAccordionClick: (state: string) => void;
  stateLawDetails: StateDataCollection;
}

export default function AccordionGroup({ 
  letter, 
  states, 
  openState, 
  onAccordionClick, 
  stateLawDetails 
}: AccordionGroupProps) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '700', 
        color: '#1f2937', 
        marginBottom: '1rem' 
      }}>
        📁 {letter}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {states.map(state => (
          <AccordionItem
            key={state}
            state={state}
            isOpen={openState === state}
            onToggle={() => onAccordionClick(state)}
            stateLawDetails={stateLawDetails}
          />
        ))}
      </div>
    </div>
  );
}
