// Search utility functions
// Simple utilities - under 50 lines per complexity rule

export function normalizeSearchQuery(query: string): string {
  return query.trim().toLowerCase().replace(/[^a-z0-9\s]/g, '');
}

export function searchStates(states: string[], query: string): string[] {
  if (!query.trim()) return states;
  
  const normalizedQuery = normalizeSearchQuery(query);
  
  return states.filter(state => {
    const normalizedState = normalizeSearchQuery(state);
    return normalizedState.includes(normalizedQuery);
  });
}

export function highlightSearchTerm(text: string, searchTerm: string): string {
  if (!searchTerm.trim()) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

export function getSearchSuggestions(states: string[], query: string, limit: number = 5): string[] {
  if (!query.trim()) return [];
  
  const normalizedQuery = normalizeSearchQuery(query);
  
  return states
    .filter(state => {
      const normalizedState = normalizeSearchQuery(state);
      return normalizedState.startsWith(normalizedQuery);
    })
    .slice(0, limit);
}

export function calculateSearchRelevance(state: string, query: string): number {
  const normalizedState = normalizeSearchQuery(state);
  const normalizedQuery = normalizeSearchQuery(query);
  
  if (normalizedState === normalizedQuery) return 100;
  if (normalizedState.startsWith(normalizedQuery)) return 80;
  if (normalizedState.includes(normalizedQuery)) return 60;
  
  return 0;
}
