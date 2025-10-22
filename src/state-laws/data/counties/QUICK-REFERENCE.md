# County Data Quick Reference Card 🚀

## 5-Minute Setup Guide

### Adding a New State (Copy & Paste)

```typescript
// 1. Create: src/state-laws/data/counties/[state-name].ts

import type { CountyDataCollection } from '../types';

export const [stateName]Counties: CountyDataCollection = {
  '[County Name] County': {
    slug: 'county-slug',
    court: {
      name: 'Court Name',
      address: 'Address',
      phone: '(XXX) XXX-XXXX',
      website: 'https://...',
      clerkName: 'Name',
      jurisdiction: 'County',
      established: 'Established YYYY'
    },
    venueNotes: '400+ WORDS REQUIRED',
    filingFee: '$XXX.XX',
    processingTime: 'XX-XX days',
    transferVolume: 'high',
    population: 'X,XXX,XXX (2023)',
    majorCities: ['City1', 'City2'],
    specialRequirements: ['Req1', 'Req2', 'Req3', 'Req4', 'Req5'],
    localRules: ['Rule1', 'Rule2', 'Rule3', 'Rule4', 'Rule5'],
    localProcedures: ['Step1', 'Step2', 'Step3', 'Step4', 'Step5', 'Step6'],
    judges: [
      { name: 'Hon. Name', title: 'Title', division: 'Division', notes: 'Notes', experience: 'Experience' }
    ],
    links: [
      { label: 'Court Website', url: 'https://...' },
      { label: 'Clerk', url: 'https://...' },
      { label: 'Statute', url: 'https://...' }
    ]
  }
};

export function get[StateName]CountyBySlug(slug: string) {
  return Object.values([stateName]Counties).find(county => county.slug === slug);
}

export function get[StateName]CountySlugs(): string[] {
  return Object.values([stateName]Counties).map(county => county.slug);
}
```

```typescript
// 2. Update: src/state-laws/data/counties/index.ts

// Add import
import { newStateCounties, getNewStateCountyBySlug } from './new-state';

// Add to allStateCounties
export const allStateCounties: Record<string, CountyDataCollection> = {
  'florida': floridaCounties,
  'new-state': newStateCounties, // ADD THIS
};

// Add to exports
export {
  getNewStateCountyBySlug, // ADD THIS
};
```

---

## Minimum Requirements

| Item | Minimum |
|------|---------|
| venueNotes | 400 words |
| specialRequirements | 5 items |
| localRules | 5 items |
| localProcedures | 6 steps |
| judges | 2 judges |
| links | 3 links |

---

## Field Formats

```typescript
slug: 'kebab-case'                    // ✅ 'los-angeles'
transferVolume: 'high' | 'medium' | 'low'  // ✅ lowercase only
population: 'X,XXX,XXX (2023 estimate)'    // ✅ with year
phone: '(XXX) XXX-XXXX'                    // ✅ formatted
```

---

## Testing URLs

```
http://localhost:3000/state-laws/[state-slug]/[county-slug]

Examples:
http://localhost:3000/state-laws/florida/miami-dade
http://localhost:3000/state-laws/california/los-angeles
http://localhost:3000/state-laws/texas/harris
```

---

## Common Errors

❌ `'Los Angeles'` → ✅ `'Los Angeles County'`  
❌ `slug: 'Los_Angeles'` → ✅ `slug: 'los-angeles'`  
❌ `transferVolume: 'High'` → ✅ `transferVolume: 'high'`  
❌ venueNotes: 50 words → ✅ venueNotes: 400+ words  
❌ Forgot to update index.ts → ✅ Always update index.ts!

---

## Pre-Launch Checklist

- [ ] 400+ word venueNotes
- [ ] All required fields filled
- [ ] Slug is kebab-case
- [ ] Updated counties/index.ts
- [ ] Page loads without errors
- [ ] No double bullet points
- [ ] All links work
- [ ] CTA buttons display

---

## Priority Counties by State

**Start with top 3-5 most populous counties:**

- New York: New York, Kings, Queens, Nassau, Suffolk
- Illinois: Cook, DuPage, Lake, Will, Kane
- Pennsylvania: Philadelphia, Allegheny, Montgomery, Bucks, Delaware
- Ohio: Cuyahoga, Franklin, Hamilton, Summit, Montgomery
- Georgia: Fulton, Gwinnett, Cobb, DeKalb, Clayton
- North Carolina: Mecklenburg, Wake, Guilford, Forsyth, Cumberland
- Michigan: Wayne, Oakland, Macomb, Kent, Genesee
- New Jersey: Bergen, Middlesex, Essex, Hudson, Monmouth
- Virginia: Fairfax, Virginia Beach, Prince William, Loudoun, Chesapeake
- Washington: King, Pierce, Snohomish, Spokane, Clark

---

**See README.md for full documentation**

