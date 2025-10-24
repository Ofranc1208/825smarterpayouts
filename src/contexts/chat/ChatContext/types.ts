/**
 * ChatContext Types - Orchestrator Pattern
 *
 * Type definitions for the ChatContext orchestrator pattern.
 * Extracted from main ChatContext for better organization.
 */

import React from 'react';

export interface ChoiceHandlerDependencies {
  advanceConversation: (transition: {
    userMessageText: string;
    botConfirmationText: string;
  }) => Promise<void>;
  setVisibleMessages: React.Dispatch<React.SetStateAction<any[]>>;
  startConversationalForm: () => Promise<void>;
  handleSpecialistChoice: (choice: 'live_chat' | 'sms' | 'phone_call' | 'appointment') => Promise<void>;
}

export interface ModalState {
  showSMSModal: boolean;
  showAppointmentModal: boolean;
}

export interface ModalActions {
  openSMSModal: () => void;
  closeSMSModal: () => void;
  openAppointmentModal: () => void;
  closeAppointmentModal: () => void;
}

export interface ChatContextDependencies {
  visibleMessages: any[];
  setVisibleMessages: React.Dispatch<React.SetStateAction<any[]>>;
  logUserChoiceAsMessage: (text: string) => void;
  sessionId: string;
  mode: 'calculate' | 'specialist';
  startConversationalForm: () => Promise<void>;
  advanceConversation: (transition: {
    userMessageText: string;
    botConfirmationText: string;
  }) => Promise<void>;
  handleSpecialistChoice: (choice: 'live_chat' | 'sms' | 'phone_call' | 'appointment') => Promise<void>;
}

export interface ChatOrchestratorConfig {
  mode: 'calculate' | 'specialist';
  sessionId: string;
  dependencies: ChatContextDependencies;
}

export type ChoiceType = 'Our Process' | 'General Questions' | 'New Quote' | 'Compare An Offer';
export type SpecialistChoiceType = 'live_chat' | 'sms' | 'phone_call' | 'appointment';
