// ============================================================================
// 🎯 GUARANTEED STEP - TYPE UTILITIES
// ============================================================================
// Utilities for converting between old and new type systems

import { GuaranteedFormData } from './guaranteedTypes';

/**
 * 🔄 Converts old global GuaranteedFormData to new self-contained type
 */
export const convertToSelfContainedFormData = (oldData: any): GuaranteedFormData => {
  return {
    paymentMode: oldData?.paymentMode as GuaranteedFormData['paymentMode'],
    annualIncrease: oldData?.annualIncrease,
    paymentAmount: oldData?.paymentAmount,
    startDate: oldData?.startDate,
    endDate: oldData?.endDate,
    payments: oldData?.payments
  };
};

/**
 * 🎯 Type guard for payment mode
 */
export const isValidPaymentMode = (mode: any): mode is GuaranteedFormData['paymentMode'] => {
  return ['Monthly', 'Quarterly', 'Semiannually', 'Annually', 'Lump Sum'].includes(mode);
};

/**
 * 🛡️ Safe string conversion for amounts
 */
export const safeStringify = (value: string | number | undefined): string => {
  if (value === undefined || value === null) return '';
  return value.toString();
};
