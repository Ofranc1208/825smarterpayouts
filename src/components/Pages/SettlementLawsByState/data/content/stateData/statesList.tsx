// Complete list of US states and territories
// Following 120-line limit rule for enterprise modularity

export const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 
  'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

// Alphabetical grouping utility function
export function groupStatesAlpha(states: string[]) {
  const groups: { [letter: string]: string[] } = {};
  states.forEach(state => {
    const letter = state[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(state);
  });
  return groups;
}
