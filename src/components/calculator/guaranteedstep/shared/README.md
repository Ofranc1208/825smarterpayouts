# 🔗 Shared Components - Guaranteed Payment Calculator

## 📋 Overview

The **shared components** folder contains reusable UI components that are used across multiple step components in the Guaranteed Payment Calculator. These components provide consistent styling, behavior, and accessibility features throughout the application.

## 🏗️ Component Architecture

```
shared/
├── GuaranteedButton.tsx              # Centralized button component
├── GuaranteedSection.tsx             # Section layout with labels
├── GuaranteedFormInput.tsx           # Form inputs with validation
├── GuaranteedNavigationButton.tsx    # Back/Next navigation
├── QuickHelpBadge.tsx                # Help badge component
├── GuaranteedInstructionButton.tsx   # Instruction button
├── GuaranteedInstructionModal.tsx    # Instruction modal
├── GuaranteedCalculationLink.tsx     # Calculation link component
└── index.ts                          # Barrel exports
```

## 🎯 Component Details

### **GuaranteedButton** - Centralized Button Component

**Purpose:** Provides consistent button styling and behavior across all steps

**Usage:**
```typescript
import { GuaranteedButton } from './shared';

// Option button (for selections)
<GuaranteedButton
  variant="option"
  selected={isSelected}
  onClick={() => setSelected(true)}
>
  Monthly Payment
</GuaranteedButton>

// Next button (for navigation)
<GuaranteedButton
  variant="next"
  disabled={!isValid}
  onClick={handleNext}
>
  Continue →
</GuaranteedButton>
```

**Props:**
```typescript
interface GuaranteedButtonProps {
  variant: 'option' | 'next';
  selected?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
```

**Features:**
- ✅ **Two variants:** `option` (selection buttons) and `next` (navigation)
- ✅ **Selection states:** Visual feedback for selected options
- ✅ **Hover effects:** Smooth transitions and visual feedback
- ✅ **Accessibility:** Keyboard navigation and ARIA attributes
- ✅ **Responsive design:** Adapts to different screen sizes

### **GuaranteedSection** - Section Layout Component

**Purpose:** Provides consistent section layout with labels and optional tooltips

**Usage:**
```typescript
import { GuaranteedSection } from './shared';

<GuaranteedSection
  label="Payment Frequency"
  tooltip="Choose how often you receive payments"
>
  <GuaranteedButton variant="option">Monthly</GuaranteedButton>
  <GuaranteedButton variant="option">Quarterly</GuaranteedButton>
</GuaranteedSection>
```

**Props:**
```typescript
interface GuaranteedSectionProps {
  label: string;
  tooltip?: string;
  children: React.ReactNode;
  className?: string;
}
```

**Features:**
- ✅ **Consistent spacing:** Standardized gap between label and content
- ✅ **Optional tooltips:** Clickable ? icon with hover information
- ✅ **Keyboard navigation:** Full accessibility support
- ✅ **Responsive layout:** Adapts to mobile and desktop

### **GuaranteedFormInput** - Form Input Component

**Purpose:** Provides consistent form input styling with validation states

**Usage:**
```typescript
import { GuaranteedFormInput } from './shared';

<GuaranteedFormInput
  type="text"
  value={amount}
  onChange={setAmount}
  placeholder="Enter payment amount"
  error="Amount must be greater than 0"
  isValid={amount > 0}
/>
```

**Props:**
```typescript
interface GuaranteedFormInputProps {
  type: 'text' | 'date' | 'number';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  isValid?: boolean;
  className?: string;
}
```

**Features:**
- ✅ **Validation states:** Visual feedback for valid/invalid inputs
- ✅ **Error messages:** Clear error display below inputs
- ✅ **Focus management:** Proper focus and blur handling
- ✅ **Accessibility:** ARIA attributes and screen reader support

### **GuaranteedNavigationButton** - Navigation Component

**Purpose:** Provides consistent back/next navigation buttons

**Usage:**
```typescript
import { GuaranteedNavigationButton } from './shared';

<div className={styles.navigation}>
  <GuaranteedNavigationButton
    direction="back"
    onClick={handleBack}
    disabled={!canGoBack}
  />
  <GuaranteedNavigationButton
    direction="next"
    onClick={handleNext}
    disabled={!isValid}
  />
</div>
```

**Props:**
```typescript
interface GuaranteedNavigationButtonProps {
  direction: 'back' | 'next';
  onClick: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}
```

**Features:**
- ✅ **Two directions:** Back (←) and Next (→) variants
- ✅ **Disabled states:** Visual feedback for unavailable actions
- ✅ **ARIA labels:** Proper screen reader support
- ✅ **Keyboard navigation:** Full accessibility

### **QuickHelpBadge** - Help Badge Component

**Purpose:** Provides quick access to the AI assistant

**Usage:**
```typescript
import { QuickHelpBadge } from './shared';

<QuickHelpBadge />
```

**Features:**
- ✅ **Consistent placement:** Appears in top-right of each step
- ✅ **Assistant integration:** Opens Guaranteed AI Assistant
- ✅ **Visual consistency:** Matches design system colors
- ✅ **Responsive design:** Adapts to different screen sizes

### **GuaranteedInstructionButton** - Instruction Button

**Purpose:** Provides access to step-by-step instructions

**Usage:**
```typescript
import { GuaranteedInstructionButton } from './shared';

<GuaranteedInstructionButton onClick={() => setShowInstructions(true)} />
```

**Features:**
- ✅ **Modal integration:** Opens instruction modal when clicked
- ✅ **Visual feedback:** Hover effects and transitions
- ✅ **Accessibility:** Proper ARIA labels and keyboard support

### **GuaranteedInstructionModal** - Instruction Modal

**Purpose:** Displays detailed instructions for each step

**Usage:**
```typescript
import { GuaranteedInstructionModal } from './shared';

<GuaranteedInstructionModal
  isOpen={showInstructions}
  onClose={() => setShowInstructions(false)}
>
  <p>Detailed step instructions...</p>
</GuaranteedInstructionModal>
```

**Features:**
- ✅ **Modal overlay:** Backdrop with blur effect
- ✅ **Responsive design:** Adapts to screen size
- ✅ **Close functionality:** Click backdrop or close button
- ✅ **Keyboard support:** Escape key to close

## 🎨 Styling Guidelines

### **CSS Modules**
Each component has its own CSS module for scoped styling:

- `GuaranteedButton.module.css` - Button variants and states
- `GuaranteedSection.module.css` - Section layout and tooltips
- `GuaranteedFormInput.module.css` - Input validation states
- `GuaranteedNavigationButton.module.css` - Navigation styling
- `QuickHelpBadge.module.css` - Badge styling
- `GuaranteedInstructionButton.module.css` - Button styling
- `GuaranteedInstructionModal.module.css` - Modal overlay and content

### **Design Tokens**
```css
/* Colors */
--primary-green: #22c55e;
--primary-green-dark: #16a34a;
--error-red: #ef4444;
--warning-yellow: #f59e0b;

/* Spacing */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;

/* Typography */
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;
```

## 🚀 Usage Examples

### **Complete Step Component Example**
```typescript
import React, { useState } from 'react';
import GuaranteedStepContainer from '../GuaranteedStepContainer';
import {
  GuaranteedButton,
  GuaranteedSection,
  GuaranteedNavigationButton,
  QuickHelpBadge
} from '../shared';
import styles from './MyStep.module.css';

const MyStep = ({ onNext, currentStep, totalSteps }) => {
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <GuaranteedStepContainer
      title="Select Payment Option"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <QuickHelpBadge />

      <GuaranteedSection label="Choose your option">
        <GuaranteedButton
          variant="option"
          selected={selectedOption === 'option1'}
          onClick={() => setSelectedOption('option1')}
        >
          Option 1
        </GuaranteedButton>
        <GuaranteedButton
          variant="option"
          selected={selectedOption === 'option2'}
          onClick={() => setSelectedOption('option2')}
        >
          Option 2
        </GuaranteedButton>
      </GuaranteedSection>

      <div className={styles.navigation}>
        <GuaranteedNavigationButton
          direction="next"
          onClick={() => onNext({ option: selectedOption })}
          disabled={!selectedOption}
        />
      </div>
    </GuaranteedStepContainer>
  );
};
```

## 🔧 Development Guidelines

### **Adding New Shared Components**
1. **Create component** in `shared/` folder
2. **Add CSS module** with same name
3. **Export from index.ts**
4. **Add TypeScript interface**
5. **Follow existing patterns**

### **Component Requirements**
- **Single Responsibility:** One clear purpose per component
- **Reusable:** Should work across multiple step components
- **Accessible:** ARIA attributes and keyboard navigation
- **Responsive:** Works on mobile and desktop
- **Type Safe:** Complete TypeScript interfaces

### **Styling Best Practices**
- **CSS Modules:** Use scoped classes only
- **Responsive Design:** Include mobile breakpoints
- **Accessibility:** Focus states and high contrast support
- **Consistency:** Follow established design patterns

## 🎯 Benefits

### **Consistency**
- ✅ **Unified design** across all step components
- ✅ **Standardized interactions** and behaviors
- ✅ **Consistent spacing** and typography

### **Maintainability**
- ✅ **Centralized styling** - Change once, update everywhere
- ✅ **Modular components** - Easy to modify individual pieces
- ✅ **Type safety** - Catch errors at compile time

### **Developer Experience**
- ✅ **Predictable APIs** - Same props across similar components
- ✅ **Good documentation** - Clear usage examples
- ✅ **Easy testing** - Isolated, testable components

## 🚨 Troubleshooting

### **Common Issues**
1. **Styling conflicts** - Check CSS module class names
2. **Type errors** - Verify props match interfaces
3. **Import errors** - Ensure exports in index.ts
4. **Responsive issues** - Test on different screen sizes

### **Debugging Tips**
- **Use React DevTools** to inspect component tree
- **Check CSS classes** in browser developer tools
- **Verify props** with TypeScript strict mode
- **Test accessibility** with screen readers

---

**🏆 Result:** A comprehensive set of **reusable UI components** that provide consistent, accessible, and maintainable interfaces across the entire Guaranteed Payment Calculator application.
