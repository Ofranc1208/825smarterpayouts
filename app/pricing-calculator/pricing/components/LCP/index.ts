// ========================================
// 🧬 LCP Health Questionnaire Components
// ========================================
// Completely independent from SRC folder - modular and contained

export { default as HealthQuestionnaire } from './HealthQuestionnaire';
export { default as PhysicalProfileStep } from './PhysicalProfileStep';
export { default as HealthProfileStep } from './HealthProfileStep';
export { default as ReviewStep } from './ReviewStep';

// Export types and utilities
export type { HealthProfile } from '../../utils/healthProfileMapper';
export { HealthProfileMapper } from '../../utils/healthProfileMapper';
