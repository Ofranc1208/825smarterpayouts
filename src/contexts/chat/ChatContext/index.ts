/**
 * ChatContext Orchestrator Pattern - Index
 *
 * Main exports for the ChatContext orchestrator pattern.
 * Provides clean separation of concerns for chat functionality.
 */

// Handlers
export { ChoiceHandler } from './handlers/ChoiceHandler';
export type { ChoiceHandlerDependencies } from './handlers/ChoiceHandler';

// Managers
export { ModalManager } from './managers/ModalManager';
export type { ModalState, ModalActions } from './managers/ModalManager';

// Types
export type {
  ChoiceType,
  SpecialistChoiceType,
  ChatContextDependencies,
  ChatOrchestratorConfig
} from './types';
