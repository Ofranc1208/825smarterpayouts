// Form interaction tracking utilities
import { trackEvent } from './eventTracking';

// Track form interactions
export const trackFormInteraction = (
  formName: string,
  fieldName: string,
  action: 'focus' | 'blur' | 'change' | 'submit' | 'error',
  value?: string
): void => {
  trackEvent(
    'form_interaction',
    'form',
    action,
    `${formName}_${fieldName}`,
    undefined,
    {
      form_name: formName,
      field_name: fieldName,
      field_value: value ? value.substring(0, 50) : undefined,
      interaction_type: action
    }
  );
};

// Track form submission success/failure
export const trackFormSubmission = (
  formName: string,
  success: boolean,
  errorMessage?: string
): void => {
  trackEvent(
    success ? 'form_submit_success' : 'form_submit_error',
    'form',
    success ? 'submit_success' : 'submit_error',
    formName,
    success ? 1 : 0,
    {
      form_name: formName,
      success: success,
      error_message: errorMessage?.substring(0, 100)
    }
  );
};

// Track form abandonment
export const trackFormAbandonment = (
  formName: string,
  fieldsCompleted: number,
  totalFields: number,
  timeSpent: number
): void => {
  const completionRate = Math.round((fieldsCompleted / totalFields) * 100);
  
  trackEvent(
    'form_abandonment',
    'form',
    'abandon',
    formName,
    completionRate,
    {
      form_name: formName,
      fields_completed: fieldsCompleted,
      total_fields: totalFields,
      completion_rate: completionRate,
      time_spent: timeSpent
    }
  );
};
