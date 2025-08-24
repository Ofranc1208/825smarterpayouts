import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepRenderer from './StepRenderer';

describe('StepRenderer', () => {
  test('should render the Guaranteed Payment Amount step', () => {
    render(<StepRenderer stepId="guaranteed-get-amount" />);
    expect(screen.getByText(/What is the total payment amount/i)).toBeInTheDocument();
  });

  test('should render the LCP Gender step', () => {
    render(<StepRenderer stepId="lcp-get-gender" />);
    expect(screen.getByText(/What is your gender\?/i)).toBeInTheDocument();
  });

  test('should render nothing for an invalid stepId', () => {
    const { container } = render(<StepRenderer stepId="an-invalid-id" />);
    expect(container.firstChild).toBeNull();
  });
}); 