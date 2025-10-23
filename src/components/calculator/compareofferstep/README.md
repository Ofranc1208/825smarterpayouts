# Compare Offer Step Components

This folder contains all components related to the Compare Offer calculator flow.

## Structure

```
compareofferstep/
├── README.md                           # This file
├── CompareOfferStepContainer.tsx       # Main container wrapper
├── CompareOfferStepContainer.module.css
├── CompareOfferChoice.tsx              # Step 1: Choice selection
├── CompareOfferChoice.module.css
├── CompareOfferDetails.tsx             # Step 2: Offer details input
├── CompareOfferDetails.module.css
├── CompareOfferReview.tsx              # Step 3: Review before calculation
├── CompareOfferReview.module.css
├── CompareOfferResults.tsx             # Step 4: Side-by-side comparison
├── CompareOfferResults.module.css
├── shared/                             # Shared components
│   ├── CompareOfferButton.tsx
│   ├── CompareOfferButton.module.css
│   └── index.ts
├── utils/                              # Utilities and types
│   ├── compareOfferTypes.ts
│   └── compareOfferCalculations.ts
└── index.ts                            # Barrel exports
```

## Flow Steps

1. **Choice** - User selects how to provide offer details
   - Upload Offer Document (future)
   - Help me compare my offer (manual entry)

2. **Details** - User enters existing offer information
   - Lump sum offer amount
   - Payment amount
   - Payment frequency
   - Company name (optional)

3. **Review** - User reviews entered data
   - Shows all entered information
   - Calculates our quote
   - Button to see comparison

4. **Results** - Side-by-side comparison
   - Their existing offer
   - Our calculated offer
   - Difference/savings
   - Percentage comparison

## Design Principles

- Consistent with Guaranteed and LCP flows
- Professional financial design system
- Green gradient buttons (#22c55e to #16a34a)
- Clean, modern UI with proper spacing
- Mobile-responsive

