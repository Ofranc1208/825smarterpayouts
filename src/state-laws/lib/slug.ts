// Slug utility functions for State Laws SEO system
// Enterprise-grade URL slug generation and validation

export const toSlug = (s: string): string =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const toStateSlug = (stateName: string): string => {
  const specialCases: Record<string, string> = {
    'District of Columbia': 'district-of-columbia',
    'New Hampshire': 'new-hampshire',
    'New Jersey': 'new-jersey',
    'New Mexico': 'new-mexico',
    'New York': 'new-york',
    'North Carolina': 'north-carolina',
    'North Dakota': 'north-dakota',
    'Rhode Island': 'rhode-island',
    'South Carolina': 'south-carolina',
    'South Dakota': 'south-dakota',
    'West Virginia': 'west-virginia'
  };

  return specialCases[stateName] || toSlug(stateName);
};

export const validateSlug = (slug: string): boolean => {
  return /^[a-z0-9-]+$/.test(slug) && slug.length >= 2 && slug.length <= 50;
};

export const generateStateSlugs = (): Record<string, string> => {
  const states = [
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

  return states.reduce((acc, state) => {
    acc[state] = toStateSlug(state);
    return acc;
  }, {} as Record<string, string>);
};

// URL validation helpers
export const isValidStateSlug = (slug: string): boolean => {
  const validSlugs = new Set(Object.values(generateStateSlugs()));
  return validSlugs.has(slug);
};

export const getStateNameFromSlug = (slug: string): string | null => {
  const stateSlugs = generateStateSlugs();
  for (const [stateName, stateSlug] of Object.entries(stateSlugs)) {
    if (stateSlug === slug) return stateName;
  }
  return null;
};
