# 💰 Lump Sum Components - Guaranteed Payment Calculator

## 📋 Overview

The **lump-sum-components** folder contains specialized UI components for handling lump sum payment input forms in the Guaranteed Payment Calculator. These components work together to create a seamless user experience for entering multiple payment details with validation and guidance.

## 🏗️ Component Architecture

```
lump-sum-components/
├── GuaranteedNumberOfPaymentsInput.tsx   # Payment count selection
├── GuaranteedPaymentCard.tsx             # Individual payment form card
├── GuaranteedPaymentAmountInput.tsx      # Amount input with $ prefix
└── index.ts                              # Barrel exports
```

## 🎯 Component Details

### **GuaranteedNumberOfPaymentsInput** - Payment Count Selection

**Purpose:** Allows users to specify how many lump sum payments they want to enter (1-10)

**Usage:**
```typescript
import { GuaranteedNumberOfPaymentsInput } from './lump-sum-components';

<GuaranteedNumberOfPaymentsInput
  value={numberOfPayments}
  onChange={setNumberOfPayments}
  error={errors['numberOfPayments']}
/>
```

**Props:**
```typescript
interface GuaranteedNumberOfPaymentsInputProps {
  value: number | '';
  onChange: (value: string) => void;
  error?: string;
}
```

**Features:**
- ✅ **Range validation:** Only accepts values 1-10
- ✅ **Guidance tooltip:** Shows helpful information when focused
- ✅ **Error states:** Visual feedback for invalid input
- ✅ **Auto-guidance:** Tooltip appears when user starts typing

### **GuaranteedPaymentCard** - Individual Payment Form Card

**Purpose:** Displays a complete form card for a single lump sum payment

**Usage:**
```typescript
import { GuaranteedPaymentCard } from './lump-sum-components';

<GuaranteedPaymentCard
  payment={payment}
  index={index}
  errors={errors}
  onPaymentChange={handlePaymentChange}
/>
```

**Props:**
```typescript
interface GuaranteedPaymentCardProps {
  payment: GuaranteedPayment;
  index: number;
  errors: Record<string, string>;
  onPaymentChange: (index: number, field: 'amount' | 'lumpSumDate', value: string) => void;
}
```

**Features:**
- ✅ **Complete form:** Amount input and date selection in one card
- ✅ **Auto-scroll:** Automatically scrolls to next field when completed
- ✅ **Error handling:** Individual error states for each field
- ✅ **Responsive design:** Adapts to mobile and desktop layouts

### **GuaranteedPaymentAmountInput** - Amount Input Component

**Purpose:** Specialized input for payment amounts with $ prefix and validation

**Usage:**
```typescript
import { GuaranteedPaymentAmountInput } from './lump-sum-components';

<GuaranteedPaymentAmountInput
  value={payment.amount}
  onChange={handleAmountChange}
  error={errors[`payment-${index}-amount`]}
  index={index}
/>
```

**Props:**
```typescript
interface GuaranteedPaymentAmountInputProps {
  value: string | number | undefined;
  onChange: (value: string) => void;
  error?: string;
  index: number;
}
```

**Features:**
- ✅ **$ prefix:** Visual dollar sign prefix for clarity
- ✅ **Input filtering:** Only allows numbers and decimal points
- ✅ **Max digits:** Prevents input beyond 7 digits before decimal
- ✅ **Focus effects:** Enhanced focus states for better UX

## 🔄 Component Integration

### **How Components Work Together**

```
Number of Payments → GuaranteedNumberOfPaymentsInput
    ↓
Generate Cards → GuaranteedPaymentCard (1 per payment)
    ↓
Each Card Contains → GuaranteedPaymentAmountInput + Date Input
    ↓
Validation → Individual field validation + overall form validation
```

### **Complete Lump Sum Flow**
```typescript
// In GuaranteedLumpSumAmountOverview.tsx
<GuaranteedNumberOfPaymentsInput
  value={numberOfPayments}
  onChange={handleNumberChange}
  error={errors['numberOfPayments']}
/>

{typeof numberOfPayments === 'number' && numberOfPayments > 0 && (
  <div className={styles.paymentsContainer}>
    {payments.map((payment, index) => (
      <GuaranteedPaymentCard
        key={index}
        payment={payment}
        index={index}
        errors={errors}
        onPaymentChange={handlePaymentChange}
      />
    ))}
  </div>
)}
```

## 🎨 Styling Architecture

### **CSS Modules**
Each component has its own CSS module for scoped styling:

- `GuaranteedNumberOfPaymentsInput.module.css` - Input styling and guidance tooltip
- `GuaranteedPaymentCard.module.css` - Card layout and hover effects
- `GuaranteedPaymentAmountInput.module.css` - Amount input with $ prefix

### **Design Patterns**
```css
/* Card styling */
.paymentCard {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Amount input with $ prefix */
.amountInputWrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.dollarSign {
  position: absolute;
  left: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}
```

## 🚀 Usage Examples

### **Complete Payment Form**
```typescript
import React, { useState } from 'react';
import {
  GuaranteedNumberOfPaymentsInput,
  GuaranteedPaymentCard
} from './lump-sum-components';

const LumpSumForm = ({ onNext }) => {
  const [numberOfPayments, setNumberOfPayments] = useState<number | ''>('');
  const [payments, setPayments] = useState([]);
  const [errors, setErrors] = useState({});

  const handlePaymentChange = (index, field, value) => {
    const updatedPayments = [...payments];
    updatedPayments[index] = { ...updatedPayments[index], [field]: value };
    setPayments(updatedPayments);
  };

  return (
    <>
      <GuaranteedNumberOfPaymentsInput
        value={numberOfPayments}
        onChange={setNumberOfPayments}
        error={errors['numberOfPayments']}
      />

      {numberOfPayments > 0 && (
        <div className={styles.paymentsContainer}>
          {payments.map((payment, index) => (
            <GuaranteedPaymentCard
              key={index}
              payment={payment}
              index={index}
              errors={errors}
              onPaymentChange={handlePaymentChange}
            />
          ))}
        </div>
      )}
    </>
  );
};
```

### **Individual Payment Card**
```typescript
import { GuaranteedPaymentCard } from './lump-sum-components';

const PaymentForm = ({ payment, index, onChange, errors }) => (
  <GuaranteedPaymentCard
    payment={payment}
    index={index}
    errors={errors}
    onPaymentChange={onChange}
  />
);
```

## 🔧 Development Guidelines

### **Component Requirements**
- **Form Validation:** Each component handles its own validation
- **Error States:** Clear visual feedback for invalid inputs
- **Accessibility:** Proper ARIA labels and keyboard navigation
- **Responsive Design:** Works on mobile and desktop

### **Input Handling Best Practices**
- **Input Filtering:** Sanitize inputs as user types
- **Validation Feedback:** Show errors immediately when appropriate
- **Focus Management:** Guide user through form flow
- **Auto-scroll:** Move to next field when current is complete

### **Styling Guidelines**
- **CSS Modules:** Use scoped classes for all styling
- **Consistent Spacing:** Follow established design tokens
- **Focus States:** Clear visual feedback for keyboard users
- **Error States:** Distinct styling for invalid inputs

## 🎯 Advanced Features

### **Auto-scroll Between Fields**
The payment cards implement intelligent auto-scroll behavior:

```typescript
// Auto-scroll to next section when field is filled
useEffect(() => {
  if (amount && amountSectionRef.current) {
    amountSectionRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
}, [amount]);

useEffect(() => {
  if (date && dateSectionRef.current) {
    dateSectionRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
}, [date]);
```

### **Input Filtering and Validation**
```typescript
// Filter amount input to only allow numbers and decimals
const handleAmountChange = (value: string) => {
  const filteredValue = value
    .replace(/[^\d.]/g, '') // Remove non-numeric characters
    .replace(/^(\d*\.\d{0,2}).*$/, '$1'); // Limit decimal places

  onChange(filteredValue);
};
```

## 🚨 Troubleshooting

### **Common Issues**
1. **Validation not working** - Check error state management
2. **Auto-scroll issues** - Verify ref assignments and scroll behavior
3. **Input filtering problems** - Test regex patterns with various inputs
4. **Styling conflicts** - Check CSS module class names

### **Debugging Tips**
- **Use React DevTools** to inspect form state and validation
- **Test input filtering** with console logging
- **Verify auto-scroll** by checking ref assignments
- **Check responsive behavior** across different screen sizes

## 📚 Related Documentation

- **[Main Architecture Guide](../README.md)** - Overall application structure
- **[Lump Sum Overview Implementation](../GuaranteedLumpSumAmountOverview.tsx)** - Complete form implementation
- **[Form Input Components](../shared/README.md)** - Related input components

---

**🏆 Result:** A **comprehensive lump sum payment input system** that provides intuitive form handling, intelligent validation, and smooth user experience for entering multiple payment details.
