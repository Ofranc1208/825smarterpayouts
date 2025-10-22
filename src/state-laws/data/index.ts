// Export hub for all state data and helpers
// Following enterprise modularity patterns
import { stateDataA_M } from './stateDataA_M';
import { stateDataN_Z } from './stateDataN_Z';
import * as countyData from './counties';
import type { StateLawMap, StateLaw } from './types';

// Combined state law details object - ALL 50 STATES + DC
export const allStates: StateLawMap = { ...stateDataA_M, ...stateDataN_Z };

// Alphabetical list of all states for navigation
export const statesList = Object.keys(allStates).sort((a, b) => a.localeCompare(b));

// Helper function to get state data by slug
export function getStateBySlug(slug: string): { name: string; data: StateLaw } | null {
  for (const name of Object.keys(allStates)) {
    if (allStates[name].slug === slug) {
      return { name, data: allStates[name] };
    }
  }
  return null;
}

// Helper function to get state data by name
export function getStateByName(name: string): StateLaw | null {
  return allStates[name] || null;
}

// Helper function to get states by letter group
export function groupStatesByLetter(): Record<string, string[]> {
  const groups: Record<string, string[]> = {};

  statesList.forEach(state => {
    const letter = state[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(state);
  });

  return groups;
}

// Helper function to search states
export function searchStates(query: string): string[] {
  if (!query.trim()) return statesList;

  const normalizedQuery = query.trim().toLowerCase();
  return statesList.filter(state =>
    state.toLowerCase().includes(normalizedQuery)
  );
}

// Helper function to get neighboring states (for comparison links)
export function getNeighboringStates(stateName: string): string[] {
  const neighbors: Record<string, string[]> = {
    Alabama: ['Florida', 'Georgia', 'Mississippi', 'Tennessee'],
    Alaska: [], // No bordering states
    Arizona: ['California', 'Colorado', 'Nevada', 'New Mexico', 'Utah'],
    Arkansas: ['Louisiana', 'Mississippi', 'Missouri', 'Oklahoma', 'Tennessee', 'Texas'],
    California: ['Arizona', 'Nevada', 'Oregon'],
    Colorado: ['Arizona', 'Kansas', 'Nebraska', 'New Mexico', 'Oklahoma', 'Utah', 'Wyoming'],
    Connecticut: ['Massachusetts', 'New York', 'Rhode Island'],
    Delaware: ['Maryland', 'New Jersey', 'Pennsylvania'],
    'District of Columbia': ['Maryland', 'Virginia'],
    Florida: ['Alabama', 'Georgia'],
    Georgia: ['Alabama', 'Florida', 'North Carolina', 'South Carolina', 'Tennessee'],
    Hawaii: [], // No bordering states
    Idaho: ['Montana', 'Nevada', 'Oregon', 'Utah', 'Washington', 'Wyoming'],
    Illinois: ['Indiana', 'Iowa', 'Kentucky', 'Missouri', 'Wisconsin'],
    Indiana: ['Illinois', 'Kentucky', 'Michigan', 'Ohio'],
    Iowa: ['Illinois', 'Minnesota', 'Missouri', 'Nebraska', 'South Dakota', 'Wisconsin'],
    Kansas: ['Colorado', 'Missouri', 'Nebraska', 'Oklahoma'],
    Kentucky: ['Illinois', 'Indiana', 'Missouri', 'Ohio', 'Tennessee', 'Virginia', 'West Virginia'],
    Louisiana: ['Arkansas', 'Mississippi', 'Texas'],
    Maine: ['New Hampshire'],
    Maryland: ['Delaware', 'Pennsylvania', 'Virginia', 'West Virginia', 'District of Columbia'],
    Massachusetts: ['Connecticut', 'New Hampshire', 'New York', 'Rhode Island', 'Vermont'],
    Michigan: ['Indiana', 'Ohio', 'Wisconsin'],
    Minnesota: ['Iowa', 'North Dakota', 'South Dakota', 'Wisconsin'],
    Mississippi: ['Alabama', 'Arkansas', 'Louisiana', 'Tennessee'],
    Missouri: ['Arkansas', 'Illinois', 'Iowa', 'Kansas', 'Kentucky', 'Nebraska', 'Oklahoma', 'Tennessee'],
    Montana: ['Idaho', 'North Dakota', 'South Dakota', 'Wyoming'],
    Nebraska: ['Colorado', 'Iowa', 'Kansas', 'Missouri', 'South Dakota', 'Wyoming'],
    Nevada: ['Arizona', 'California', 'Idaho', 'Oregon', 'Utah'],
    'New Hampshire': ['Maine', 'Massachusetts', 'Vermont'],
    'New Jersey': ['Delaware', 'New York', 'Pennsylvania'],
    'New Mexico': ['Arizona', 'Colorado', 'Oklahoma', 'Texas', 'Utah'],
    'New York': ['Connecticut', 'Massachusetts', 'New Jersey', 'Pennsylvania', 'Vermont'],
    'North Carolina': ['Georgia', 'South Carolina', 'Tennessee', 'Virginia'],
    'North Dakota': ['Minnesota', 'Montana', 'South Dakota'],
    Ohio: ['Indiana', 'Kentucky', 'Michigan', 'Pennsylvania', 'West Virginia'],
    Oklahoma: ['Arkansas', 'Colorado', 'Kansas', 'Missouri', 'New Mexico', 'Texas'],
    Oregon: ['California', 'Idaho', 'Nevada', 'Washington'],
    Pennsylvania: ['Delaware', 'Maryland', 'New Jersey', 'New York', 'Ohio', 'West Virginia'],
    'Rhode Island': ['Connecticut', 'Massachusetts'],
    'South Carolina': ['Georgia', 'North Carolina'],
    'South Dakota': ['Iowa', 'Minnesota', 'Montana', 'Nebraska', 'North Dakota', 'Wyoming'],
    Tennessee: ['Alabama', 'Arkansas', 'Georgia', 'Kentucky', 'Mississippi', 'Missouri', 'North Carolina', 'Virginia'],
    Texas: ['Arkansas', 'Louisiana', 'New Mexico', 'Oklahoma'],
    Utah: ['Arizona', 'Colorado', 'Idaho', 'Nevada', 'New Mexico', 'Wyoming'],
    Vermont: ['Massachusetts', 'New Hampshire', 'New York'],
    Virginia: ['Kentucky', 'Maryland', 'North Carolina', 'Tennessee', 'West Virginia', 'District of Columbia'],
    Washington: ['Idaho', 'Oregon'],
    'West Virginia': ['Kentucky', 'Maryland', 'Ohio', 'Pennsylvania', 'Virginia'],
    Wisconsin: ['Illinois', 'Iowa', 'Michigan', 'Minnesota'],
    Wyoming: ['Colorado', 'Idaho', 'Montana', 'Nebraska', 'South Dakota', 'Utah']
  };

  return neighbors[stateName] || [];
}

// Validation helpers
export function isValidStateName(name: string): boolean {
  return name in allStates;
}

export function isValidStateSlug(slug: string): boolean {
  return Object.values(allStates).some(state => state.slug === slug);
}

// Statistics helpers
export function getStateCount(): number {
  return Object.keys(allStates).length;
}

export function getStatesWithCoolingPeriod(): string[] {
  return Object.keys(allStates).filter(state =>
    allStates[state].keyProvisions.some(provision =>
      provision.toLowerCase().includes('cooling') ||
      provision.toLowerCase().includes('day')
    )
  );
}

export function getStatesRequiringAdvice(): string[] {
  return Object.keys(allStates).filter(state =>
    allStates[state].keyProvisions.some(provision =>
      provision.toLowerCase().includes('independent professional advice') ||
      provision.toLowerCase().includes('advice')
    )
  );
}

// County data exports
export {
  allStateCounties,
  getCountyByStateAndSlug,
  getCountiesByState,
  getCountySlugsByState,
  getStatesWithCountyData,
  getCountyByStateNameAndSlug,
  getCountyPageUrl,
  getStatePageUrl,
  isValidStateForCounties,
  isValidCountyForState,
  getTotalCountyCount,
  getCountyCountByState,
  getHighVolumeCounties
} from './counties';
