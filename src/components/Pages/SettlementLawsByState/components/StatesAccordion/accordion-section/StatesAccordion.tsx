// States accordion component - now modular and under 50 lines
// Orchestrates all accordion subcomponents following enterprise patterns

import { AccordionGroup } from '../accordion-group';
import { NoResultsMessage } from '../no-results';
import type { AlphabeticalGroups, StateDataCollection } from '../../../types';

interface StatesAccordionProps {
  grouped: AlphabeticalGroups;
  openState: string | null;
  onAccordionClick: (state: string) => void;
  stateLawDetails: StateDataCollection;
  filteredStates: string[];
  search: string;
}

export default function StatesAccordion({ 
  grouped, 
  openState, 
  onAccordionClick, 
  stateLawDetails, 
  filteredStates, 
  search 
}: StatesAccordionProps) {
  return (
    <section style={{ marginBottom: '2rem' }}>
      {Object.keys(grouped).sort().map(letter => (
        <AccordionGroup
          key={letter}
          letter={letter}
          states={grouped[letter]}
          openState={openState}
          onAccordionClick={onAccordionClick}
          stateLawDetails={stateLawDetails}
        />
      ))}
      {filteredStates.length === 0 && (
        <NoResultsMessage search={search} />
      )}
    </section>
  );
}
