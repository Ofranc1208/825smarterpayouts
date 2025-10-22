// County data index - Multi-state county data access
// Enterprise hub for county-level structured settlement information

import { floridaCounties, getFloridaCountyBySlug } from './florida';
import { californiaCounties, getCaliforniaCountyBySlug } from './california';
import { texasCounties, getTexasCountyBySlug } from './texas';
import { alabamaCounties, getAlabamaCountyBySlug } from './alabama';
import { ohioCounties, getOhioCountyBySlug } from './ohio';
import { michiganCounties, getMichiganCountyBySlug } from './michigan';
import { georgiaCounties, getGeorgiaCountyBySlug } from './georgia';
import { pennsylvaniaCounties, getPennsylvaniaCountyBySlug } from './pennsylvania';
import { illinoisCounties, getIllinoisCountyBySlug } from './illinois';
import { northCarolinaCounties, getNorthCarolinaCountyBySlug } from './north-carolina';
import { arizonaCounties, getArizonaCountyBySlug } from './arizona';
import { indianaCounties, getIndianaCountyBySlug } from './indiana';
import { virginiaCounties, getVirginiaCountyBySlug } from './virginia';
import { newYorkCounties, getNewYorkCountyBySlug } from './new-york';
import { newJerseyCounties, getNewJerseyCountyBySlug } from './new-jersey';
import { tennesseeCounties, getTennesseeCountyBySlug } from './tennessee';
import { louisianaParishes, getLouisianaParishBySlug } from './louisiana';
import { coloradoCounties, getColoradoCountyBySlug } from './colorado';
import { nevadaCounties, getNevadaCountyBySlug } from './nevada';
import { missouriCounties, getMissouriCountyBySlug } from './missouri';
import { marylandCounties, getMarylandCountyBySlug } from './maryland';
import { southCarolinaCounties, getSouthCarolinaCountyBySlug } from './south-carolina';
import { washingtonCounties, getWashingtonCountyBySlug } from './washington';
import type { CountyLawDetails, StateCountyData } from '../types';

// Combined county data for all states
export const allStateCounties: Record<string, Record<string, CountyLawDetails>> = {
  florida: floridaCounties,
  california: californiaCounties,
  texas: texasCounties,
  alabama: alabamaCounties,
  ohio: ohioCounties,
  michigan: michiganCounties,
  georgia: georgiaCounties,
  pennsylvania: pennsylvaniaCounties,
  illinois: illinoisCounties,
  'north-carolina': northCarolinaCounties,
  arizona: arizonaCounties,
  indiana: indianaCounties,
  virginia: virginiaCounties,
  'new-york': newYorkCounties,
  'new-jersey': newJerseyCounties,
  tennessee: tennesseeCounties,
  louisiana: louisianaParishes,
  colorado: coloradoCounties,
  nevada: nevadaCounties,
  missouri: missouriCounties,
  maryland: marylandCounties,
  'south-carolina': southCarolinaCounties,
  washington: washingtonCounties
};

// Get county data by state and county slug
export function getCountyByStateAndSlug(stateSlug: string, countySlug: string): CountyLawDetails | null {
  const stateCounties = allStateCounties[stateSlug];
  if (!stateCounties) return null;

  return Object.values(stateCounties).find(county => county.slug === countySlug) || null;
}

// Get all counties for a specific state
export function getCountiesByState(stateSlug: string): Record<string, CountyLawDetails> | null {
  return allStateCounties[stateSlug] || null;
}

// Get county slugs for a specific state
export function getCountySlugsByState(stateSlug: string): string[] {
  const stateCounties = allStateCounties[stateSlug];
  if (!stateCounties) return [];

  return Object.values(stateCounties).map(county => county.slug);
}

// Get all available states with county data
export function getStatesWithCountyData(): string[] {
  return Object.keys(allStateCounties);
}

// Get county data by full state name and county slug
export function getCountyByStateNameAndSlug(stateName: string, countySlug: string): CountyLawDetails | null {
  const stateSlugMap: Record<string, string> = {
    'Florida': 'florida',
    'California': 'california',
    'Texas': 'texas'
  };

  const stateSlug = stateSlugMap[stateName];
  if (!stateSlug) return null;

  return getCountyByStateAndSlug(stateSlug, countySlug);
}

// Helper to get county page URLs
export function getCountyPageUrl(stateSlug: string, countySlug: string): string {
  return `/state-laws/${stateSlug}/${countySlug}`;
}

// Helper to get state page URL
export function getStatePageUrl(stateSlug: string): string {
  return `/state-laws/${stateSlug}`;
}

// Validation helpers
export function isValidStateForCounties(stateSlug: string): boolean {
  return stateSlug in allStateCounties;
}

export function isValidCountyForState(stateSlug: string, countySlug: string): boolean {
  const stateCounties = allStateCounties[stateSlug];
  if (!stateCounties) return false;

  return Object.values(stateCounties).some(county => county.slug === countySlug);
}

// Statistics helpers
export function getTotalCountyCount(): number {
  return Object.values(allStateCounties).reduce((total, stateCounties) =>
    total + Object.keys(stateCounties).length, 0
  );
}

export function getCountyCountByState(stateSlug: string): number {
  const stateCounties = allStateCounties[stateSlug];
  return stateCounties ? Object.keys(stateCounties).length : 0;
}

export function getHighVolumeCounties(): Array<{ state: string; county: string; countySlug: string }> {
  const highVolumeCounties: Array<{ state: string; county: string; countySlug: string }> = [];

  Object.entries(allStateCounties).forEach(([stateSlug, stateCountiesData]) => {
    Object.entries(stateCountiesData).forEach(([countyName, countyData]) => {
      if (countyData.transferVolume === 'high') {
        highVolumeCounties.push({
          state: stateSlug,
          county: countyName,
          countySlug: countyData.slug
        });
      }
    });
  });

  return highVolumeCounties;
}

// Export state-specific functions for convenience
export {
  getFloridaCountyBySlug,
  getCaliforniaCountyBySlug,
  getTexasCountyBySlug,
  getAlabamaCountyBySlug,
  getOhioCountyBySlug,
  getMichiganCountyBySlug,
  getGeorgiaCountyBySlug,
  getPennsylvaniaCountyBySlug,
  getIllinoisCountyBySlug,
  getNorthCarolinaCountyBySlug,
  getArizonaCountyBySlug,
  getIndianaCountyBySlug,
  getVirginiaCountyBySlug,
  getNewYorkCountyBySlug,
  getNewJerseyCountyBySlug,
  getTennesseeCountyBySlug,
  getLouisianaParishBySlug,
  getColoradoCountyBySlug,
  getNevadaCountyBySlug,
  getMissouriCountyBySlug,
  getMarylandCountyBySlug,
  getSouthCarolinaCountyBySlug,
  getWashingtonCountyBySlug
};
