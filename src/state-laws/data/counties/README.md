# County Data Implementation Guide 📋

## Overview
This guide provides step-by-step instructions for adding new county data to the SmarterPayouts state laws system. Follow this recipe exactly to maintain consistency across all county pages.

---

## Table of Contents
1. [File Structure](#file-structure)
2. [Adding a New State](#adding-a-new-state)
3. [Adding Counties to a State](#adding-counties-to-a-state)
4. [Data Requirements](#data-requirements)
5. [Content Guidelines](#content-guidelines)
6. [Testing Checklist](#testing-checklist)
7. [Common Mistakes to Avoid](#common-mistakes-to-avoid)

---

## File Structure

```
src/state-laws/data/counties/
├── README.md (this file)
├── index.ts (central hub - exports all county data)
├── florida.ts (example: 5 counties)
├── california.ts (example: 3 counties)
├── texas.ts (example: 5 counties)
└── [new-state].ts (your new state file)
```

---

## Adding a New State

### Step 1: Create the State File

Create a new file: `src/state-laws/data/counties/[state-name].ts`

**Example:** `src/state-laws/data/counties/new-york.ts`

### Step 2: Copy the Template

```typescript
// [State Name] Counties - Phase 2 Production Data
// Enterprise data structure for county-level legal information
// Comprehensive content meeting 400+ word requirement per county

import type { CountyDataCollection } from '../types';

export const [stateName]Counties: CountyDataCollection = {
  '[County Name] County': {
    slug: 'county-slug',
    court: {
      name: 'Official Court Name',
      address: 'Full Address',
      phone: '(XXX) XXX-XXXX',
      website: 'https://official-court-website.gov',
      clerkName: 'Clerk Name (if available)',
      jurisdiction: 'County Name',
      established: 'Established YYYY'
    },
    venueNotes: 'MINIMUM 400 WORDS - Detailed description of the court, jurisdiction, volume of cases, procedures, etc.',
    filingFee: '$XXX.XX (description)',
    processingTime: 'XX-XX days from filing to final hearing',
    transferVolume: 'high' | 'medium' | 'low',
    population: 'X,XXX,XXX (2023 estimate)',
    majorCities: ['City 1', 'City 2', 'City 3'],
    specialRequirements: [
      'Requirement 1',
      'Requirement 2',
      'Requirement 3',
      // Minimum 5 requirements
    ],
    localRules: [
      'Rule 1',
      'Rule 2',
      'Rule 3',
      // Minimum 5 rules
    ],
    localProcedures: [
      'Step 1',
      'Step 2',
      'Step 3',
      // Minimum 6-8 steps
    ],
    judges: [
      {
        name: 'Hon. Judge Name',
        title: 'Circuit Court Judge',
        division: 'Civil Division',
        notes: 'Brief description',
        experience: 'Years of experience'
      },
      // Minimum 2-3 judges
    ],
    links: [
      { label: 'Official Court Website', url: 'https://...' },
      { label: 'Clerk of Courts', url: 'https://...' },
      { label: 'State Statute', url: 'https://...' },
      // Minimum 3-5 official links
    ]
  },
  // Add more counties...
};

// Helper functions
export function get[StateName]CountyBySlug(slug: string) {
  return Object.values([stateName]Counties).find(county => county.slug === slug);
}

export function get[StateName]CountySlugs(): string[] {
  return Object.values([stateName]Counties).map(county => county.slug);
}

export function get[StateName]CountiesByVolume(volume: 'high' | 'medium' | 'low'): string[] {
  return Object.keys([stateName]Counties).filter(countyName =>
    [stateName]Counties[countyName].transferVolume === volume
  );
}
```

### Step 3: Update the Central Index

Open `src/state-laws/data/counties/index.ts` and add:

```typescript
// 1. Import the new state
import { newYorkCounties, getNewYorkCountyBySlug, getNewYorkCountySlugs, getNewYorkCountiesByVolume } from './new-york';

// 2. Add to allStateCounties object
export const allStateCounties: Record<string, CountyDataCollection> = {
  'florida': floridaCounties,
  'california': californiaCounties,
  'texas': texasCounties,
  'new-york': newYorkCounties, // ADD THIS LINE
};

// 3. Export helper functions at the bottom
export {
  getFloridaCountyBySlug,
  getCaliforniaCountyBySlug,
  getTexasCountyBySlug,
  getNewYorkCountyBySlug, // ADD THIS LINE
};
```

---

## Adding Counties to a State

### Priority Counties to Add First

For each state, prioritize counties by:
1. **Population** (largest first)
2. **Transfer Volume** (highest activity)
3. **Major Metropolitan Areas**

**Recommended:** Start with 3-5 major counties per state.

### County Selection Criteria

✅ **DO ADD:**
- Counties with population > 500,000
- Major metropolitan areas
- High structured settlement transfer volume
- Counties with specialized courts

❌ **DON'T ADD (Yet):**
- Rural counties with low population
- Counties with minimal transfer activity
- Counties without dedicated court websites

---

## Data Requirements

### Minimum Content Requirements

| Field | Requirement |
|-------|------------|
| `venueNotes` | **400+ words minimum** |
| `specialRequirements` | **5+ items** |
| `localRules` | **5+ items** |
| `localProcedures` | **6-8 steps** |
| `judges` | **2-3 judges** |
| `links` | **3-5 official links** |

### Required Fields Checklist

- [ ] `slug` - kebab-case (e.g., 'los-angeles')
- [ ] `court.name` - Official court name
- [ ] `court.address` - Full physical address
- [ ] `court.phone` - Contact number
- [ ] `court.website` - Official website URL
- [ ] `court.jurisdiction` - County name
- [ ] `venueNotes` - 400+ word description
- [ ] `filingFee` - Current fee amount
- [ ] `processingTime` - Timeline estimate
- [ ] `transferVolume` - 'high', 'medium', or 'low'
- [ ] `population` - Current estimate with year
- [ ] `majorCities` - Array of 3-5 cities
- [ ] `specialRequirements` - Array of 5+ items
- [ ] `localRules` - Array of 5+ items
- [ ] `localProcedures` - Array of 6-8 items
- [ ] `judges` - Array of 2-3 judge objects
- [ ] `links` - Array of 3-5 resource links

---

## Content Guidelines

### Writing the `venueNotes` (400+ words)

Your `venueNotes` should include:

1. **Court Overview** (100 words)
   - Court name and jurisdiction
   - Number of cases handled annually
   - Court structure and divisions

2. **Structured Settlement Context** (100 words)
   - Volume of structured settlement cases
   - Court's approach to these cases
   - Relevant state statutes

3. **Procedures & Requirements** (100 words)
   - Filing process overview
   - Documentation requirements
   - Court approval criteria

4. **Local Considerations** (100 words)
   - Judge experience with settlements
   - Local court rules
   - Processing timeline details

### Example Template:

```
The [Court Name] serves [County Name] with a population of [X million] and handles 
[X thousand] civil cases annually, including a [high/medium/low] volume of structured 
settlement transfer petitions. As the [ordinal] largest county in [State], [County] 
processes [description of volume] structured settlement cases under [State Statute].

The court operates [number] divisions, with [specific division] handling most 
structured settlement transfers. Judges in this jurisdiction are [description of 
experience] and maintain [strict/moderate] standards for payee protection.

Filing requirements include [list key requirements]. The court requires [specific 
documentation] and [approval process]. Petitions typically take [timeframe] from 
initial filing to final approval.

Local procedures emphasize [key local considerations]. The court has established 
[specific local rules] to ensure [purpose]. All transfers must comply with 
[state statute] and demonstrate [key requirement].
```

### Writing Requirements & Rules

**DO:**
- ✅ Use specific, actionable language
- ✅ Include exact statute references
- ✅ Mention specific forms or documentation
- ✅ Cite local court rules by number
- ✅ Include timeframes and deadlines

**DON'T:**
- ❌ Use vague language ("may require", "sometimes")
- ❌ Copy generic requirements
- ❌ Include outdated information
- ❌ Make assumptions without verification

### Judge Information

**Required for each judge:**
- Full name with "Hon." prefix
- Official title
- Division/department
- Brief notes about experience
- Years on bench or relevant background

**Example:**
```typescript
{
  name: 'Hon. Jennifer D. Bailey',
  title: 'Circuit Court Judge',
  division: 'Civil Division - Complex Business Litigation',
  notes: 'Handles complex civil matters including structured settlements and financial transfers',
  experience: 'Over 20 years on the bench, specializes in financial disputes'
}
```

---

## Testing Checklist

After adding a new state or county, verify:

### 1. File Structure
- [ ] State file created in `counties/` folder
- [ ] State file follows naming convention (lowercase, hyphenated)
- [ ] Imports added to `counties/index.ts`
- [ ] Helper functions exported

### 2. Data Validation
- [ ] All required fields present
- [ ] Slug is kebab-case and unique
- [ ] URLs are valid and working
- [ ] Phone numbers formatted correctly
- [ ] Population data is current (2023+)

### 3. Content Quality
- [ ] `venueNotes` is 400+ words
- [ ] No spelling or grammar errors
- [ ] All links are official government sources
- [ ] Judge information is accurate and current
- [ ] Requirements are specific and actionable

### 4. Page Testing
- [ ] Navigate to: `http://localhost:3000/state-laws/[state-slug]/[county-slug]`
- [ ] Page loads without errors
- [ ] All sections display correctly
- [ ] CTA buttons work
- [ ] Table of Contents links work
- [ ] No double bullet points
- [ ] Legal disclaimer displays
- [ ] Breadcrumbs work correctly

### 5. SEO Verification
- [ ] Page title includes state and county
- [ ] Meta description is descriptive
- [ ] Canonical URL is correct
- [ ] JSON-LD structured data present
- [ ] Breadcrumb schema correct

---

## Common Mistakes to Avoid

### ❌ MISTAKE #1: Incorrect Slug Format
```typescript
// WRONG
slug: 'Los Angeles'
slug: 'los_angeles'
slug: 'LosAngeles'

// CORRECT
slug: 'los-angeles'
```

### ❌ MISTAKE #2: Missing County Suffix
```typescript
// WRONG
'Los Angeles': { ... }

// CORRECT
'Los Angeles County': { ... }
```

### ❌ MISTAKE #3: Short venueNotes
```typescript
// WRONG (too short)
venueNotes: 'The court handles structured settlements.'

// CORRECT (400+ words)
venueNotes: 'The Los Angeles County Superior Court is the largest...[continue for 400+ words]'
```

### ❌ MISTAKE #4: Non-Official Links
```typescript
// WRONG
links: [
  { label: 'Wikipedia', url: 'https://wikipedia.org/...' },
  { label: 'Blog Post', url: 'https://myblog.com/...' }
]

// CORRECT
links: [
  { label: 'Official Court Website', url: 'https://www.lacourt.org/' },
  { label: 'State Statute', url: 'https://leginfo.legislature.ca.gov/...' }
]
```

### ❌ MISTAKE #5: Forgetting to Update index.ts
Always update `counties/index.ts` when adding a new state!

### ❌ MISTAKE #6: Inconsistent transferVolume
```typescript
// WRONG
transferVolume: 'High' // Capital H
transferVolume: 'very high' // Not a valid option

// CORRECT
transferVolume: 'high' // lowercase, must be 'high', 'medium', or 'low'
```

---

## Quick Start Checklist

When adding a new state:

1. [ ] Create `[state-name].ts` file
2. [ ] Copy template from this guide
3. [ ] Research and add 3-5 major counties
4. [ ] Write 400+ word venueNotes for each
5. [ ] Add all required fields
6. [ ] Verify all URLs work
7. [ ] Update `counties/index.ts`
8. [ ] Test pages locally
9. [ ] Check for linter errors
10. [ ] Verify SEO metadata

---

## Resources

### Where to Find Information

**Court Information:**
- State court websites
- County clerk websites
- State bar association directories

**Statute Information:**
- State legislature websites
- Legal databases (Justia, FindLaw)
- State insurance department websites

**Judge Information:**
- Court websites (judge directories)
- State bar association
- Court clerk offices

**Population Data:**
- U.S. Census Bureau
- State demographic websites
- County official websites

---

## Support

If you encounter issues:
1. Check this README first
2. Review existing state files (florida.ts, california.ts, texas.ts)
3. Verify all required fields are present
4. Test the page locally
5. Check browser console for errors

---

## Version History

- **v1.0** (October 2025) - Initial guide created
- Counties implemented: Florida (5), California (3), Texas (5)
- Total: 3 states, 15 counties

---

**Last Updated:** October 22, 2025  
**Maintained By:** SmarterPayouts Development Team

