export const STEP_REGISTRY = {
  // Guaranteed Flow Steps
  'guaranteed-get-amount': {
    question: 'What is the total payment amount you would like to receive?',
    inputType: 'number',
  },
  'guaranteed-get-start-date': {
    question: 'When should these payments start?',
    inputType: 'date',
  },
  // LCP Flow Steps
  'lcp-get-amount': {
    question: 'What is the total investment amount?',
    inputType: 'number',
  },
  'lcp-get-birth-date': {
    question: 'What is your date of birth?',
    inputType: 'date',
  },
  'lcp-get-gender': {
    question: 'What is your gender?',
    inputType: 'choice',
    choices: ['Male', 'Female'],
  },
  // Compare Offer Flow Steps
  'compare-offer-choice': {
    question: 'User is presented with offer comparison choices.',
    inputType: 'choice',
    choices: ['Upload Offer Document', 'Enter Offer Details Manually'],
  },
  // Add other steps as needed...
}; 