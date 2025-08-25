// SEO utility functions
// Simple utilities - under 50 lines per complexity rule

export function generatePageTitle(stateName?: string): string {
  const baseTitle = 'Structured Settlement Laws by State | Complete Legal Guide 2024';
  
  if (stateName) {
    return `${stateName} Structured Settlement Laws | Transfer Requirements & Court Approval`;
  }
  
  return baseTitle;
}

export function generateMetaDescription(stateName?: string): string {
  const baseDescription = 'Comprehensive guide to structured settlement transfer laws for all 50 states. Court approval requirements, protection acts, and legal resources.';
  
  if (stateName) {
    return `Learn about ${stateName}'s structured settlement transfer laws, court approval process, and legal requirements. Complete SSPA guide and resources.`;
  }
  
  return baseDescription;
}

export function generateKeywords(stateName?: string): string {
  const baseKeywords = 'structured settlement laws, state regulations, court approval, legal transfer, SSPA, settlement protection act';
  
  if (stateName) {
    return `${stateName} structured settlement, ${stateName} SSPA, ${stateName} court approval, ${baseKeywords}`;
  }
  
  return baseKeywords;
}

export function generateCanonicalUrl(stateName?: string): string {
  const baseUrl = 'https://smarterpayouts.com/structured-settlement-laws-by-state';
  
  if (stateName) {
    const slug = stateName.toLowerCase().replace(/\s+/g, '-');
    return `${baseUrl}#${slug}`;
  }
  
  return baseUrl;
}

export function generateBreadcrumbs(stateName?: string) {
  const breadcrumbs = [
    { name: 'Home', url: 'https://smarterpayouts.com' },
    { name: 'Settlement Laws by State', url: 'https://smarterpayouts.com/structured-settlement-laws-by-state' }
  ];
  
  if (stateName) {
    breadcrumbs.push({
      name: `${stateName} Laws`,
      url: generateCanonicalUrl(stateName)
    });
  }
  
  return breadcrumbs;
}
