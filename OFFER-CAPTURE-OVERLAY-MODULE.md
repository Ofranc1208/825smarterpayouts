# 💾 Offer Capture Overlay Module
## LCP & Guaranteed Payment Calculator Integration

**Version:** 1.0.0  
**Last Updated:** October 20, 2025  
**Status:** 🚧 In Development

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Design](#architecture--design)
3. [Implementation Phases](#implementation-phases)
4. [Technical Specifications](#technical-specifications)
5. [Data Schema](#data-schema)
6. [Component Structure](#component-structure)
7. [Firebase Integration](#firebase-integration)
8. [UX/UI Guidelines](#uxui-guidelines)
9. [Testing Strategy](#testing-strategy)
10. [Deployment Checklist](#deployment-checklist)
11. [Future Enhancements](#future-enhancements)

---

## 🎯 Project Overview

### Purpose
Create a unified offer capture system that collects user contact information (email/SMS) after displaying calculation results, storing all offer details in Firebase for follow-up and analytics.

### Goals
- ✅ Capture user contact information within 7 seconds of offer display
- ✅ Generate unique, readable offer codes
- ✅ Store comprehensive offer and payment data in Firebase
- ✅ Provide seamless UX across both LCP and Guaranteed calculators
- ✅ Enable future email/SMS integration
- ✅ Track conversion rates and user engagement

### Scope
**In Scope:**
- Overlay UI component (shared between calculators)
- 7-second delay timer
- Email/SMS preference collection
- Unique offer code generation
- Firebase data storage
- Success/error feedback
- Dismissible overlay option

**Out of Scope (Phase 2):**
- Actual email/SMS sending
- User authentication
- Offer retrieval portal
- Admin dashboard
- Analytics visualization

---

## 🏗️ Architecture & Design

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Calculator Results Page                   │
│  (LCPaymentResultsPage.tsx / GuaranteedOffer.tsx)          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ After 7 seconds
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              OfferCaptureOverlay Component                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Offer Code: GP-224-1234                            │   │
│  │  [Email Tab] [SMS Tab]                              │   │
│  │  [Input Field]                                      │   │
│  │  [Send My Offer Button]                             │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ On Submit
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              useOfferCapture Hook                            │
│  - Validates input                                           │
│  - Generates offer code                                      │
│  - Prepares data payload                                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Save to Firebase
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Firebase Firestore                              │
│  Collection: offerCaptures                                   │
│  Document: {offerCode}                                       │
│  - contactInfo                                               │
│  - offerDetails                                              │
│  - paymentDetails                                            │
│  - metadata                                                  │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Diagram

```
User Views Offer → Wait 7s → Show Overlay → User Enters Contact
                                                      ↓
                                              Validate Input
                                                      ↓
                                              Generate Code
                                                      ↓
                                              Save to Firebase
                                                      ↓
                                              Show Success → Fade Out
```

---

## 📅 Implementation Phases

### ✅ Phase 1: Foundation & Setup
**Estimated Time:** 2-3 hours

- [ ] **1.1** Create shared-results folder structure
  - [ ] Create `src/components/calculator/shared-results/` directory
  - [ ] Create `index.ts` barrel file
  - [ ] Create `README.md` with component documentation

- [ ] **1.2** Set up TypeScript interfaces
  - [ ] Create `types.ts` with all interface definitions
  - [ ] Export interfaces from index
  - [ ] Add JSDoc comments

- [ ] **1.3** Create offer code generator utility
  - [ ] Create `utils/offerCodeGenerator.ts`
  - [ ] Implement code generation logic
  - [ ] Add unit tests
  - [ ] Validate uniqueness strategy

**Acceptance Criteria:**
- ✓ Folder structure matches specification
- ✓ All TypeScript types compile without errors
- ✓ Offer codes are unique and readable
- ✓ Unit tests pass with 100% coverage

---

### ✅ Phase 2: Core Components
**Estimated Time:** 4-5 hours

- [ ] **2.1** Build OfferCaptureOverlay component
  - [ ] Create `OfferCaptureOverlay.tsx`
  - [ ] Implement 7-second delay timer
  - [ ] Add slide-up animation
  - [ ] Add dismiss functionality
  - [ ] Create `OfferCaptureOverlay.module.css`

- [ ] **2.2** Build OfferCaptureForm component
  - [ ] Create `OfferCaptureForm.tsx`
  - [ ] Implement email/SMS tab switching
  - [ ] Add input validation (email format, phone format)
  - [ ] Add loading states
  - [ ] Create `OfferCaptureForm.module.css`

- [ ] **2.3** Create success/error feedback
  - [ ] Success message component
  - [ ] Error message component
  - [ ] Auto-dismiss after 3 seconds

**Acceptance Criteria:**
- ✓ Overlay appears exactly 7 seconds after offer display
- ✓ Smooth slide-up animation (300ms ease-out)
- ✓ Tab switching works without flicker
- ✓ Email validation follows RFC 5322 standard
- ✓ Phone validation accepts US formats
- ✓ Components are fully responsive (mobile, tablet, desktop)

---

### ✅ Phase 3: Firebase Integration
**Estimated Time:** 3-4 hours

- [ ] **3.1** Create useOfferCapture hook
  - [ ] Create `hooks/useOfferCapture.ts`
  - [ ] Implement Firebase save logic
  - [ ] Add error handling
  - [ ] Add retry logic (3 attempts)
  - [ ] Add loading states

- [ ] **3.2** Set up Firebase collection structure
  - [ ] Create Firestore security rules
  - [ ] Set up indexes for queries
  - [ ] Add data validation rules
  - [ ] Document collection schema

- [ ] **3.3** Implement data mapping
  - [ ] Map calculator data to Firebase schema
  - [ ] Handle LCP-specific fields
  - [ ] Handle Guaranteed-specific fields
  - [ ] Add timestamp generation

**Acceptance Criteria:**
- ✓ Data saves successfully to Firebase
- ✓ All required fields are captured
- ✓ Security rules prevent unauthorized access
- ✓ Retry logic handles network failures
- ✓ Error messages are user-friendly

---

### ✅ Phase 4: Calculator Integration
**Estimated Time:** 2-3 hours

- [ ] **4.1** Integrate with GuaranteedOffer.tsx
  - [ ] Import OfferCaptureOverlay
  - [ ] Pass calculation result data
  - [ ] Pass payment/review data
  - [ ] Test overlay timing
  - [ ] Test data flow

- [ ] **4.2** Integrate with LCPaymentResultsPage.tsx
  - [ ] Import OfferCaptureOverlay
  - [ ] Pass LCP result data
  - [ ] Pass all form data (profile, health, etc.)
  - [ ] Test overlay timing
  - [ ] Test data flow

- [ ] **4.3** Add session tracking
  - [ ] Capture sessionId from context
  - [ ] Track user journey
  - [ ] Add analytics events

**Acceptance Criteria:**
- ✓ Overlay works on both calculators
- ✓ All data fields are correctly passed
- ✓ No console errors or warnings
- ✓ Session tracking is accurate
- ✓ Analytics events fire correctly

---

### ✅ Phase 5: Styling & Polish
**Estimated Time:** 2-3 hours

- [ ] **5.1** Implement professional styling
  - [ ] Match SmarterPayouts design system
  - [ ] Use green gradient buttons (#22c55e to #16a34a)
  - [ ] Add smooth transitions
  - [ ] Add hover effects
  - [ ] Add focus states for accessibility

- [ ] **5.2** Add animations
  - [ ] Slide-up entrance (300ms ease-out)
  - [ ] Fade-out exit (200ms ease-in)
  - [ ] Tab switch animation (150ms)
  - [ ] Success checkmark animation

- [ ] **5.3** Responsive design
  - [ ] Mobile (< 480px)
  - [ ] Tablet (480px - 768px)
  - [ ] Desktop (> 768px)
  - [ ] Test on real devices

**Acceptance Criteria:**
- ✓ Design matches existing calculator styling
- ✓ All animations are smooth (60fps)
- ✓ Responsive on all screen sizes
- ✓ Passes accessibility audit (WCAG 2.1 AA)
- ✓ No layout shifts or jank

---

### ✅ Phase 6: Testing & QA
**Estimated Time:** 3-4 hours

- [ ] **6.1** Unit testing
  - [ ] Test offer code generation
  - [ ] Test validation functions
  - [ ] Test data mapping
  - [ ] Achieve 90%+ coverage

- [ ] **6.2** Integration testing
  - [ ] Test Firebase save/retrieve
  - [ ] Test error scenarios
  - [ ] Test network failures
  - [ ] Test concurrent saves

- [ ] **6.3** E2E testing
  - [ ] Test complete user flow (Guaranteed)
  - [ ] Test complete user flow (LCP)
  - [ ] Test dismiss functionality
  - [ ] Test tab switching
  - [ ] Test form validation

- [ ] **6.4** Cross-browser testing
  - [ ] Chrome (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)
  - [ ] Edge (latest)
  - [ ] Mobile browsers

**Acceptance Criteria:**
- ✓ All unit tests pass
- ✓ All integration tests pass
- ✓ All E2E tests pass
- ✓ Works on all major browsers
- ✓ No critical bugs found

---

### ✅ Phase 7: Deployment
**Estimated Time:** 1-2 hours

- [ ] **7.1** Pre-deployment checks
  - [ ] Code review completed
  - [ ] All tests passing
  - [ ] No linter errors
  - [ ] Performance audit passed
  - [ ] Security audit passed

- [ ] **7.2** Staging deployment
  - [ ] Deploy to staging environment
  - [ ] Test with real Firebase data
  - [ ] Verify analytics tracking
  - [ ] Stakeholder approval

- [ ] **7.3** Production deployment
  - [ ] Deploy to production
  - [ ] Monitor error logs
  - [ ] Monitor Firebase usage
  - [ ] Monitor user engagement

**Acceptance Criteria:**
- ✓ Zero deployment errors
- ✓ All features work in production
- ✓ Firebase costs within budget
- ✓ No user-reported issues

---

## 🔧 Technical Specifications

### Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React | 18.x | UI components |
| **Language** | TypeScript | 5.x | Type safety |
| **Styling** | CSS Modules | - | Scoped styling |
| **Database** | Firebase Firestore | 10.x | Data storage |
| **Validation** | Zod | 3.x | Schema validation |
| **Testing** | Jest + RTL | - | Unit/integration tests |
| **E2E Testing** | Playwright | - | End-to-end tests |

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### Performance Targets

| Metric | Target | Critical |
|--------|--------|----------|
| **Time to Interactive** | < 3s | < 5s |
| **First Contentful Paint** | < 1.5s | < 2.5s |
| **Overlay Animation** | 60fps | 30fps |
| **Firebase Save Time** | < 500ms | < 1s |
| **Bundle Size Impact** | < 15KB | < 25KB |

---

## 📊 Data Schema

### TypeScript Interfaces

```typescript
/**
 * Main offer capture data structure
 */
export interface OfferCapture {
  // Unique identifier
  offerCode: string;              // Format: "GP-224-1234" or "LCP-200-5678"
  
  // Contact information
  contactInfo: {
    email?: string;               // RFC 5322 validated
    phone?: string;               // E.164 format preferred
    deliveryMethod: 'email' | 'sms';
    consentGiven: boolean;        // GDPR/CCPA compliance
  };
  
  // Offer details
  offerDetails: {
    calculatorType: 'guaranteed' | 'lcp';
    minPayout: number;
    maxPayout: number;
    familyProtectionNPV?: number; // LCP only
    currency: 'USD';              // Future: multi-currency support
  };
  
  // Payment details (from review step)
  paymentDetails: {
    paymentMode: string;          // "Monthly", "Annual", "Lump Sum"
    paymentAmount: string;
    startDate: string;            // ISO 8601 format
    endDate: string;              // ISO 8601 format
    annualIncrease?: number;      // Percentage
    payments?: LumpSumPayment[];  // For lump sum mode
  };
  
  // LCP specific data (optional)
  lcpDetails?: {
    ageRange: string;
    gender: string;
    bodyFrame: string;
    weight: string;
    smokeStatus: string;
    healthStatus: string;
    cardiacStatus: string;
    lcpKeys: string[];            // Adjustment keys
  };
  
  // Metadata
  metadata: {
    createdAt: Date;              // Firestore Timestamp
    sessionId: string;            // From CalculatorContext
    userAgent: string;            // Browser info
    ipAddress?: string;           // Optional (privacy considerations)
    referrer?: string;            // Traffic source
    version: string;              // Schema version for migrations
  };
}

/**
 * Lump sum payment structure
 */
export interface LumpSumPayment {
  amount: string;
  lumpSumDate: string;
}

/**
 * Offer code generation config
 */
export interface OfferCodeConfig {
  type: 'GP' | 'LCP';
  maxPayout: number;
  timestamp?: number;
}

/**
 * Form validation result
 */
export interface ValidationResult {
  isValid: boolean;
  errors: {
    email?: string;
    phone?: string;
  };
}
```

### Firebase Collection Structure

```
firestore/
└── offerCaptures/
    ├── GP-224-1234/
    │   ├── contactInfo: {...}
    │   ├── offerDetails: {...}
    │   ├── paymentDetails: {...}
    │   └── metadata: {...}
    │
    └── LCP-200-5678/
        ├── contactInfo: {...}
        ├── offerDetails: {...}
        ├── paymentDetails: {...}
        ├── lcpDetails: {...}
        └── metadata: {...}
```

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /offerCaptures/{offerCode} {
      // Allow create only (no read/update/delete for now)
      allow create: if request.auth == null && 
                      request.resource.data.offerCode == offerCode &&
                      request.resource.data.metadata.createdAt == request.time;
      
      // Admin access only (future)
      allow read, update, delete: if request.auth != null && 
                                    request.auth.token.admin == true;
    }
  }
}
```

### Firestore Indexes

```javascript
// Composite indexes for queries
{
  "indexes": [
    {
      "collectionGroup": "offerCaptures",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "metadata.createdAt", "order": "DESCENDING" },
        { "fieldPath": "offerDetails.calculatorType", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "offerCaptures",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "offerDetails.maxPayout", "order": "DESCENDING" },
        { "fieldPath": "metadata.createdAt", "order": "DESCENDING" }
      ]
    }
  ]
}
```

---

## 🧩 Component Structure

### File Organization

```
src/components/calculator/shared-results/
├── index.ts                              # Barrel exports
├── README.md                             # Component documentation
├── types.ts                              # TypeScript interfaces
│
├── components/
│   ├── OfferCaptureOverlay.tsx          # Main overlay container
│   ├── OfferCaptureOverlay.module.css   # Overlay styles
│   ├── OfferCaptureForm.tsx             # Email/SMS form
│   ├── OfferCaptureForm.module.css      # Form styles
│   ├── SuccessMessage.tsx               # Success feedback
│   ├── SuccessMessage.module.css        # Success styles
│   ├── ErrorMessage.tsx                 # Error feedback
│   └── ErrorMessage.module.css          # Error styles
│
├── hooks/
│   ├── useOfferCapture.ts               # Firebase save logic
│   ├── useOverlayTimer.ts               # 7-second delay timer
│   └── useFormValidation.ts             # Email/phone validation
│
├── utils/
│   ├── offerCodeGenerator.ts            # Code generation
│   ├── dataMapper.ts                    # Map calculator → Firebase
│   ├── validators.ts                    # Email/phone validators
│   └── constants.ts                     # Config constants
│
└── __tests__/
    ├── OfferCaptureOverlay.test.tsx
    ├── OfferCaptureForm.test.tsx
    ├── useOfferCapture.test.ts
    ├── offerCodeGenerator.test.ts
    └── validators.test.ts
```

### Component Props

#### OfferCaptureOverlay

```typescript
interface OfferCaptureOverlayProps {
  // Offer data
  calculatorType: 'guaranteed' | 'lcp';
  calculationResult: GuaranteedCalculationResult | LCPCalculationResult;
  
  // Payment/form data
  paymentDetails: PaymentDetails;
  lcpDetails?: LCPDetails;
  
  // Session tracking
  sessionId: string;
  
  // Callbacks
  onSuccess?: (offerCode: string) => void;
  onError?: (error: Error) => void;
  onDismiss?: () => void;
  
  // Config
  delaySeconds?: number;          // Default: 7
  autoHideSuccess?: boolean;      // Default: true
  autoHideDelay?: number;         // Default: 3000ms
}
```

#### OfferCaptureForm

```typescript
interface OfferCaptureFormProps {
  offerCode: string;
  onSubmit: (data: ContactFormData) => Promise<void>;
  isLoading: boolean;
  error?: string;
}

interface ContactFormData {
  deliveryMethod: 'email' | 'sms';
  email?: string;
  phone?: string;
  consentGiven: boolean;
}
```

---

## 🔥 Firebase Integration

### Setup Instructions

1. **Install Firebase SDK**
```bash
npm install firebase@10.x
```

2. **Initialize Firebase** (already done in project)
```typescript
// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your config here
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

3. **Create Firestore Service**
```typescript
// src/services/offerCaptureService.ts
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { OfferCapture } from '../components/calculator/shared-results/types';

export class OfferCaptureService {
  private static COLLECTION = 'offerCaptures';
  
  static async saveOffer(data: OfferCapture): Promise<void> {
    const docRef = doc(collection(db, this.COLLECTION), data.offerCode);
    
    // Convert Date to Firestore Timestamp
    const firestoreData = {
      ...data,
      metadata: {
        ...data.metadata,
        createdAt: Timestamp.fromDate(data.metadata.createdAt)
      }
    };
    
    await setDoc(docRef, firestoreData);
  }
}
```

### Error Handling

```typescript
// Retry logic with exponential backoff
async function saveWithRetry(
  data: OfferCapture,
  maxRetries = 3
): Promise<void> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await OfferCaptureService.saveOffer(data);
      return; // Success!
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw new Error(`Failed after ${maxRetries} attempts: ${lastError.message}`);
}
```

---

## 🎨 UX/UI Guidelines

### Design Principles

1. **Non-Intrusive**: Overlay should enhance, not interrupt
2. **Clear Value**: Explain why user should share contact info
3. **Quick & Easy**: Minimize friction (1 field, 1 click)
4. **Professional**: Match existing calculator design
5. **Trustworthy**: Show security/privacy indicators

### Visual Design

#### Color Palette
```css
/* Primary Actions */
--primary-green: #22c55e;
--primary-green-dark: #16a34a;
--primary-green-light: #dcfce7;

/* Backgrounds */
--overlay-bg: rgba(0, 0, 0, 0.6);
--card-bg: #ffffff;
--input-bg: #f9fafb;

/* Text */
--text-primary: #1f2937;
--text-secondary: #6b7280;
--text-muted: #9ca3af;

/* States */
--success-green: #10b981;
--error-red: #ef4444;
--warning-yellow: #f59e0b;
```

#### Typography
```css
/* Headings */
--heading-font: 'Inter', -apple-system, sans-serif;
--heading-weight: 700;
--heading-size: 1.5rem;

/* Body */
--body-font: 'Inter', -apple-system, sans-serif;
--body-weight: 400;
--body-size: 1rem;

/* Labels */
--label-weight: 600;
--label-size: 0.875rem;
```

#### Spacing
```css
/* Consistent spacing scale */
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
```

### Animation Specifications

```css
/* Overlay entrance */
@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Overlay exit */
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Success checkmark */
@keyframes checkmarkDraw {
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

/* Tab switch */
@keyframes tabSwitch {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### Accessibility Requirements

- [ ] **ARIA Labels**: All interactive elements have descriptive labels
- [ ] **Keyboard Navigation**: Full keyboard support (Tab, Enter, Esc)
- [ ] **Focus Management**: Visible focus indicators, focus trap in overlay
- [ ] **Screen Readers**: Proper semantic HTML, ARIA live regions
- [ ] **Color Contrast**: WCAG 2.1 AA compliance (4.5:1 minimum)
- [ ] **Motion**: Respect `prefers-reduced-motion` setting
- [ ] **Touch Targets**: Minimum 44x44px for mobile

---

## 🧪 Testing Strategy

### Unit Tests

```typescript
// Example: offerCodeGenerator.test.ts
describe('generateOfferCode', () => {
  it('should generate code with correct format', () => {
    const code = generateOfferCode('GP', 224200);
    expect(code).toMatch(/^GP-\d{3}-\d{4}$/);
  });
  
  it('should generate unique codes', () => {
    const codes = new Set();
    for (let i = 0; i < 1000; i++) {
      codes.add(generateOfferCode('GP', 224200));
    }
    expect(codes.size).toBe(1000);
  });
  
  it('should handle edge cases', () => {
    expect(generateOfferCode('LCP', 0)).toMatch(/^LCP-0-\d{4}$/);
    expect(generateOfferCode('GP', 999999999)).toMatch(/^GP-999999-\d{4}$/);
  });
});
```

### Integration Tests

```typescript
// Example: useOfferCapture.test.ts
describe('useOfferCapture', () => {
  it('should save offer to Firebase', async () => {
    const { result } = renderHook(() => useOfferCapture());
    
    await act(async () => {
      await result.current.saveOffer(mockOfferData);
    });
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.success).toBe(true);
  });
  
  it('should handle Firebase errors', async () => {
    // Mock Firebase error
    jest.spyOn(OfferCaptureService, 'saveOffer').mockRejectedValue(
      new Error('Network error')
    );
    
    const { result } = renderHook(() => useOfferCapture());
    
    await act(async () => {
      await result.current.saveOffer(mockOfferData);
    });
    
    expect(result.current.error).toBeTruthy();
    expect(result.current.success).toBe(false);
  });
});
```

### E2E Tests

```typescript
// Example: offerCapture.spec.ts (Playwright)
test('complete offer capture flow', async ({ page }) => {
  // Navigate to calculator
  await page.goto('/calculations/guaranteed');
  
  // Fill out calculator
  await page.fill('[data-testid="payment-amount"]', '3500');
  await page.fill('[data-testid="start-date"]', '2025-01-01');
  await page.fill('[data-testid="end-date"]', '2045-01-01');
  await page.click('[data-testid="calculate-button"]');
  
  // Wait for offer to display
  await page.waitForSelector('[data-testid="offer-display"]');
  
  // Wait 7 seconds for overlay
  await page.waitForSelector('[data-testid="offer-capture-overlay"]', {
    timeout: 8000
  });
  
  // Fill email
  await page.click('[data-testid="email-tab"]');
  await page.fill('[data-testid="email-input"]', 'test@example.com');
  await page.click('[data-testid="submit-button"]');
  
  // Verify success
  await page.waitForSelector('[data-testid="success-message"]');
  expect(await page.textContent('[data-testid="success-message"]'))
    .toContain('Offer sent successfully');
});
```

### Test Coverage Goals

| Category | Target | Critical |
|----------|--------|----------|
| **Unit Tests** | 90% | 80% |
| **Integration Tests** | 80% | 70% |
| **E2E Tests** | Key flows | Happy path |
| **Accessibility** | 100% WCAG AA | 100% WCAG A |

---

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] All tests passing (unit, integration, E2E)
- [ ] Code review approved by 2+ developers
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Bundle size analysis completed
- [ ] Performance audit passed (Lighthouse score > 90)
- [ ] Accessibility audit passed (aXe, WAVE)
- [ ] Security audit completed
- [ ] Firebase security rules deployed
- [ ] Firestore indexes created
- [ ] Environment variables configured
- [ ] Documentation updated
- [ ] Changelog updated

### Staging Deployment

- [ ] Deploy to staging environment
- [ ] Smoke test all features
- [ ] Test with real Firebase (staging project)
- [ ] Verify analytics tracking
- [ ] Test on multiple devices
- [ ] Stakeholder demo completed
- [ ] QA sign-off received

### Production Deployment

- [ ] Create deployment branch
- [ ] Tag release version
- [ ] Deploy to production
- [ ] Monitor error logs (first 30 minutes)
- [ ] Monitor Firebase usage
- [ ] Monitor performance metrics
- [ ] Verify analytics data
- [ ] Test production environment
- [ ] Notify team of successful deployment
- [ ] Update status page

### Post-Deployment

- [ ] Monitor for 24 hours
- [ ] Check Firebase costs
- [ ] Review user feedback
- [ ] Address any critical issues
- [ ] Document lessons learned
- [ ] Plan next iteration

---

## 🔮 Future Enhancements

### Phase 2: Email/SMS Integration
**Priority:** High  
**Estimated Time:** 2 weeks

- [ ] Integrate SendGrid for email delivery
- [ ] Integrate Twilio for SMS delivery
- [ ] Create email templates
- [ ] Create SMS templates
- [ ] Add delivery tracking
- [ ] Add bounce handling
- [ ] Add unsubscribe mechanism

### Phase 3: Offer Retrieval Portal
**Priority:** Medium  
**Estimated Time:** 3 weeks

- [ ] Build offer lookup page
- [ ] Implement secure code verification
- [ ] Display saved offer details
- [ ] Add "Resend" functionality
- [ ] Add "Update Contact" functionality
- [ ] Add offer expiration logic

### Phase 4: Admin Dashboard
**Priority:** Medium  
**Estimated Time:** 4 weeks

- [ ] Build admin authentication
- [ ] Create offer management interface
- [ ] Add search/filter capabilities
- [ ] Add export to CSV
- [ ] Add analytics dashboard
- [ ] Add conversion tracking

### Phase 5: Advanced Features
**Priority:** Low  
**Estimated Time:** Ongoing

- [ ] A/B testing framework
- [ ] Multi-language support
- [ ] Custom branding options
- [ ] Integration with CRM
- [ ] Automated follow-up sequences
- [ ] Machine learning for optimization

---

## 📚 Resources & References

### Documentation
- [Firebase Firestore Docs](https://firebase.google.com/docs/firestore)
- [React Best Practices 2025](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance auditing
- [aXe DevTools](https://www.deque.com/axe/devtools/) - Accessibility testing
- [Playwright](https://playwright.dev/) - E2E testing
- [Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) - Bundle size analysis

### Design Inspiration
- [Stripe Checkout](https://stripe.com/docs/payments/checkout) - Payment capture UX
- [Intercom Messenger](https://www.intercom.com/) - Overlay timing
- [HubSpot Forms](https://www.hubspot.com/products/marketing/forms) - Form validation

---

## 📞 Support & Contact

### Development Team
- **Lead Developer:** [Name]
- **Firebase Admin:** [Name]
- **UX Designer:** [Name]
- **QA Engineer:** [Name]

### Communication Channels
- **Slack:** #offer-capture-module
- **Email:** dev-team@smarterpayouts.com
- **Issue Tracker:** GitHub Issues

### Office Hours
- **Daily Standup:** 9:00 AM EST
- **Code Review:** 2:00 PM EST
- **Demo Sessions:** Fridays 3:00 PM EST

---

## 📝 Changelog

### Version 1.0.0 (Planned)
- Initial implementation
- Core overlay functionality
- Firebase integration
- Email/SMS preference collection
- Unique offer code generation

### Version 1.1.0 (Future)
- Actual email/SMS delivery
- Offer retrieval portal
- Enhanced analytics

### Version 2.0.0 (Future)
- Admin dashboard
- CRM integration
- Advanced features

---

## ✅ Progress Tracker

**Overall Progress:** 0% Complete

### Quick Status
- ✅ **Completed:** 0/7 phases
- 🚧 **In Progress:** 0/7 phases
- ⏳ **Pending:** 7/7 phases

### Phase Status
1. [ ] Phase 1: Foundation & Setup (0%)
2. [ ] Phase 2: Core Components (0%)
3. [ ] Phase 3: Firebase Integration (0%)
4. [ ] Phase 4: Calculator Integration (0%)
5. [ ] Phase 5: Styling & Polish (0%)
6. [ ] Phase 6: Testing & QA (0%)
7. [ ] Phase 7: Deployment (0%)

---

**Last Updated:** October 20, 2025  
**Next Review:** After Phase 1 completion  
**Document Version:** 1.0.0

---

*This document is a living document and will be updated as the project progresses. All team members should review and provide feedback.*

