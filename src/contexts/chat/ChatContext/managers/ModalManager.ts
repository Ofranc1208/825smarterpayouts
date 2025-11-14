/**
 * Modal Manager - Orchestrator Pattern
 *
 * Manages all modal states and interactions in the chat system.
 * Extracted from ChatContext for better separation of concerns.
 */

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

export class ModalManager {
  private state: ModalState;
  private setState: (state: ModalState) => void;
  private logUserChoiceAsMessage: (text: string) => void;

  constructor(
    initialState: ModalState,
    setState: (state: ModalState) => void,
    logUserChoiceAsMessage: (text: string) => void
  ) {
    this.state = initialState;
    this.setState = setState;
    this.logUserChoiceAsMessage = logUserChoiceAsMessage;
  }

  getState(): ModalState {
    return this.state;
  }

  openSMSModal(): void {
    this.logUserChoiceAsMessage('📱 Text Message');
    this.setState({ ...this.state, showSMSModal: true });
  }

  closeSMSModal(): void {
    this.setState({ ...this.state, showSMSModal: false });
  }

  openAppointmentModal(): void {
    this.logUserChoiceAsMessage('📅 Book an Appointment');
    this.setState({ ...this.state, showAppointmentModal: true });
  }

  closeAppointmentModal(): void {
    this.setState({ ...this.state, showAppointmentModal: false });
  }

  handlePhoneCall(): void {
    this.logUserChoiceAsMessage('📞 Phone Consultation');
    if (typeof window !== 'undefined') {
      const phoneNumber = '+18552143510';
      const telUrl = `tel:${phoneNumber}`;
      console.log('[ModalManager] Initiating phone call with URL:', telUrl);
      window.location.href = telUrl;
    }
  }

  updateState(updates: Partial<ModalState>): void {
    this.state = { ...this.state, ...updates };
    this.setState(this.state);
  }
}
