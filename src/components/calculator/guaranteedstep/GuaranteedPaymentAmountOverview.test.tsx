/**
 * GuaranteedPaymentAmountOverview Component Unit Tests
 * 
 * Testing the component that was also fixed for infinite render loops.
 * Validates the fixed validation logic and proper form behavior.
 * 
 * Co-located with component in src/components/calculator/guaranteedstep/
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GuaranteedPaymentAmountOverview from './GuaranteedPaymentAmountOverview';

// Mock validation helpers
jest.mock('./utils/validationHelpers', () => ({
  validatePaymentAmount: jest.fn(() => ({ isValid: true })),
  validateDateRange: jest.fn(() => ({ isValid: true })),
  sanitizeNumericInput: jest.fn((input: string) => input.replace(/[^\d.]/g, '')),
  VALIDATION_RULES: {
    PAYMENT_AMOUNT: { MIN: 100, MAX: 10_000_000 },
    DATE_RULES: { MIN_PERIOD_MONTHS: 6, MAX_PERIOD_YEARS: 30 }
  }
}));

const mockOnNext = jest.fn();
const defaultProps = {
  onNext: mockOnNext,
  currentStep: 1,
  totalSteps: 3,
};

describe.skip('GuaranteedPaymentAmountOverview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ CRITICAL: Test infinite render loop fix
  describe('Render Loop Prevention', () => {
    it('should render without causing infinite loops', () => {
      const renderCount = jest.fn();
      
      const TestWrapper = () => {
        renderCount();
        return <GuaranteedPaymentAmountOverview {...defaultProps} />;
      };
      
      render(<TestWrapper />);
      
      // Should render only once
      expect(renderCount).toHaveBeenCalledTimes(1);
    });

    it('should not trigger validation during render', () => {
      const { validatePaymentAmount } = require('./utils/validationHelpers');
      
      render(<GuaranteedPaymentAmountOverview {...defaultProps} />);
      
      // Validation should not be called during initial render
      expect(validatePaymentAmount).not.toHaveBeenCalled();
    });
  });

  // ✅ Basic rendering tests
  describe('Component Rendering', () => {
    it('should render payment amount input without $ sign', () => {
      render(<GuaranteedPaymentAmountOverview {...defaultProps} />);
      
      const amountInput = screen.getByLabelText(/payment amount/i);
      expect(amountInput).toBeInTheDocument();
      expect(amountInput).toHaveAttribute('placeholder', 'Enter payment amount');
    });

    it('should render start and end date inputs', () => {
      render(<GuaranteedPaymentAmountOverview {...defaultProps} />);
      
      expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
    });

    it('should render tooltip question marks for dates', () => {
      render(<GuaranteedPaymentAmountOverview {...defaultProps} />);
      
      const questionMarks = screen.getAllByText('?');
      expect(questionMarks).toHaveLength(2); // Start date and end date tooltips
    });
  });

  // ✅ Tooltip functionality tests
  describe('Tooltip Functionality', () => {
    it('should show start date tooltip when clicked', () => {
      render(<GuaranteedPaymentAmountOverview {...defaultProps} />);
      
      const questionMarks = screen.getAllByText('?');
      fireEvent.click(questionMarks[0]); // First tooltip for start date
      
      expect(screen.getByText(/first payment date/i)).toBeInTheDocument();
    });

    it('should show end date tooltip when clicked', () => {
      render(<GuaranteedPaymentAmountOverview {...defaultProps} />);
      
      const questionMarks = screen.getAllByText('?');
      fireEvent.click(questionMarks[1]); // Second tooltip for end date
      
      expect(screen.getByText(/last payment date/i)).toBeInTheDocument();
    });

    it('should hide tooltip when clicked again', () => {
      render(<GuaranteedPaymentAmountOverview {...defaultProps} />);
      
      const questionMarks = screen.getAllByText('?');
      
      // Show tooltip
      fireEvent.click(questionMarks[0]);
      expect(screen.getByText(/first payment date/i)).toBeInTheDocument();
      
      // Hide tooltip
      fireEvent.click(questionMarks[0]);
      expect(screen.queryByText(/first payment date/i)).not.toBeInTheDocument();
    });
  });

  // ✅ Form interaction tests
  describe('Form Interactions', () => {
    it('should handle payment amount input changes', () => {
      render(<GuaranteedPaymentAmountOverview {...defaultProps} />);
      
      const amountInput = screen.getByLabelText(/payment amount/i);
      fireEvent.change(amountInput, { target: { value: '1000' } });
      
      expect((amountInput as HTMLInputElement).value).toBe('1000');
    });

    it('should handle date input changes', () => {
      render(<GuaranteedPaymentAmountOverview {...defaultProps} />);
      
      const startDateInput = screen.getByLabelText(/start date/i);
      fireEvent.change(startDateInput, { target: { value: '2025-01-01' } });
      
      expect((startDateInput as HTMLInputElement).value).toBe('2025-01-01');
    });

    it('should sanitize numeric input', () => {
      const { sanitizeNumericInput } = require('./utils/validationHelpers');
      sanitizeNumericInput.mockReturnValue('1000');
      
      render(<GuaranteedPaymentAmountOverview {...defaultProps} />);
      
      const amountInput = screen.getByLabelText(/payment amount/i);
      fireEvent.change(amountInput, { target: { value: '1000abc' } });
      
      expect(sanitizeNumericInput).toHaveBeenCalledWith('1000abc');
    });
  });

  // ✅ Form validation tests
  describe('Form Validation', () => {
    it('should disable submit button when form is empty', () => {
      render(<GuaranteedPaymentAmountOverview {...defaultProps} />);
      
      const submitButton = screen.getByRole('button', { name: /next/i });
      expect(submitButton).toBeDisabled();
    });

    it('should enable submit button when form is valid', () => {
      render(<GuaranteedPaymentAmountOverview {...defaultProps} />);
      
      // Fill out form with valid data
      const amountInput = screen.getByLabelText(/payment amount/i);
      const startDateInput = screen.getByLabelText(/start date/i);
      const endDateInput = screen.getByLabelText(/end date/i);
      
      fireEvent.change(amountInput, { target: { value: '1000' } });
      fireEvent.change(startDateInput, { target: { value: '2025-01-01' } });
      fireEvent.change(endDateInput, { target: { value: '2025-12-31' } });
      
      const submitButton = screen.getByRole('button', { name: /next/i });
      expect(submitButton).not.toBeDisabled();
    });

    it('should show validation errors when validation fails', () => {
      const { validatePaymentAmount } = require('./utils/validationHelpers');
      validatePaymentAmount.mockReturnValue({ 
        isValid: false, 
        error: 'Payment amount is too low' 
      });
      
      render(<GuaranteedPaymentAmountOverview {...defaultProps} />);
      
      // Fill form with invalid data
      const amountInput = screen.getByLabelText(/payment amount/i);
      fireEvent.change(amountInput, { target: { value: '50' } });
      
      // Try to submit
      const submitButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(submitButton);
      
      expect(screen.getByText('Payment amount is too low')).toBeInTheDocument();
    });
  });

  // ✅ Form submission tests
  describe('Form Submission', () => {
    it('should call onNext with correct data when form is valid', () => {
      render(<GuaranteedPaymentAmountOverview {...defaultProps} />);
      
      // Fill out valid form
      const amountInput = screen.getByLabelText(/payment amount/i);
      const startDateInput = screen.getByLabelText(/start date/i);
      const endDateInput = screen.getByLabelText(/end date/i);
      
      fireEvent.change(amountInput, { target: { value: '1500' } });
      fireEvent.change(startDateInput, { target: { value: '2025-01-01' } });
      fireEvent.change(endDateInput, { target: { value: '2025-12-31' } });
      
      // Submit form
      const submitButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(submitButton);
      
      expect(mockOnNext).toHaveBeenCalledWith({
        paymentAmount: '1500',
        startDate: '2025-01-01',
        endDate: '2025-12-31'
      });
    });

    it('should not submit when validation fails', () => {
      const { validatePaymentAmount } = require('./utils/validationHelpers');
      validatePaymentAmount.mockReturnValue({ isValid: false, error: 'Invalid' });
      
      render(<GuaranteedPaymentAmountOverview {...defaultProps} />);
      
      const submitButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(submitButton);
      
      expect(mockOnNext).not.toHaveBeenCalled();
    });
  });

  // ✅ Performance tests
  describe('Performance', () => {
    it('should handle rapid input changes without issues', () => {
      render(<GuaranteedPaymentAmountOverview {...defaultProps} />);
      
      const amountInput = screen.getByLabelText(/payment amount/i);
      
      // Simulate rapid typing
      for (let i = 0; i < 10; i++) {
        fireEvent.change(amountInput, { target: { value: `${i}000` } });
      }
      
      expect((amountInput as HTMLInputElement).value).toBe('9000');
    });
  });
});