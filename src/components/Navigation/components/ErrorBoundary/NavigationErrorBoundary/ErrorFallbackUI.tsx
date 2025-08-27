/**
 * Error Fallback UI Components
 * 
 * Modular UI components for navigation error boundary fallback
 * 
 * @module ErrorFallbackUI
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

import React from 'react';
import type { ErrorInfo } from 'react';

export interface ErrorFallbackUIProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
  retryCount: number;
  componentName: string;
  showErrorDetails?: boolean;
  enableRetry?: boolean;
  onRetry: () => void;
  onReset: () => void;
}

/**
 * Main Error Fallback UI Component
 */
export const ErrorFallbackUI: React.FC<ErrorFallbackUIProps> = ({
  error,
  errorInfo,
  errorId,
  retryCount,
  componentName,
  showErrorDetails = process.env.NODE_ENV === 'development',
  enableRetry = true,
  onRetry,
  onReset
}) => {
  const fallbackStyle: React.CSSProperties = {
    padding: '1rem',
    margin: '0.5rem 0',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '0.375rem',
    color: '#dc2626',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '0.875rem',
    lineHeight: '1.25rem'
  };

  return (
    <div 
      style={fallbackStyle}
      role="alert"
      aria-live="assertive"
      aria-labelledby={`nav-error-title-${errorId}`}
      aria-describedby={`nav-error-desc-${errorId}`}
    >
      <ErrorHeader errorId={errorId} />
      <ErrorMessage errorId={errorId} />
      <ErrorActions 
        retryCount={retryCount}
        enableRetry={enableRetry}
        onRetry={onRetry}
        onReset={onReset}
      />
      {showErrorDetails && error && (
        <ErrorDetails 
          error={error}
          errorInfo={errorInfo}
          errorId={errorId}
          retryCount={retryCount}
          componentName={componentName}
        />
      )}
      <AccessibilityHelp />
    </div>
  );
};

/**
 * Error Header Component
 */
const ErrorHeader: React.FC<{ errorId: string }> = ({ errorId }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
    <span style={{ fontSize: '1.25rem', marginRight: '0.5rem' }}>⚠️</span>
    <h3 
      id={`nav-error-title-${errorId}`}
      style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}
    >
      Navigation Error
    </h3>
  </div>
);

/**
 * Error Message Component
 */
const ErrorMessage: React.FC<{ errorId: string }> = ({ errorId }) => (
  <p 
    id={`nav-error-desc-${errorId}`}
    style={{ margin: '0 0 1rem 0', color: '#7f1d1d' }}
  >
    There was a problem loading the navigation. The page is still functional, 
    but some navigation features may not work properly.
  </p>
);

/**
 * Error Action Buttons Component
 */
interface ErrorActionsProps {
  retryCount: number;
  enableRetry: boolean;
  onRetry: () => void;
  onReset: () => void;
}

const ErrorActions: React.FC<ErrorActionsProps> = ({
  retryCount,
  enableRetry,
  onRetry,
  onReset
}) => {
  const maxRetries = 3;

  const buttonStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    margin: '0.5rem 0.5rem 0 0',
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500'
  };

  const secondaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#6b7280',
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {enableRetry && retryCount < maxRetries && (
        <button
          onClick={onRetry}
          style={buttonStyle}
          aria-label={`Retry loading navigation (attempt ${retryCount + 1} of ${maxRetries})`}
        >
          Retry ({maxRetries - retryCount} left)
        </button>
      )}
      
      <button
        onClick={onReset}
        style={secondaryButtonStyle}
        aria-label="Reset navigation error state"
      >
        Reset
      </button>
      
      <button
        onClick={() => window.location.reload()}
        style={secondaryButtonStyle}
        aria-label="Reload the entire page"
      >
        Reload Page
      </button>
    </div>
  );
};

/**
 * Error Details Component (Development)
 */
interface ErrorDetailsProps {
  error: Error;
  errorInfo: ErrorInfo | null;
  errorId: string;
  retryCount: number;
  componentName: string;
}

const ErrorDetails: React.FC<ErrorDetailsProps> = ({
  error,
  errorInfo,
  errorId,
  retryCount,
  componentName
}) => (
  <details style={{ marginTop: '1rem' }}>
    <summary style={{ cursor: 'pointer', fontWeight: '600', marginBottom: '0.5rem' }}>
      Error Details (Development)
    </summary>
    <div style={{ 
      backgroundColor: '#1f2937', 
      color: '#f9fafb', 
      padding: '1rem', 
      borderRadius: '0.25rem',
      fontSize: '0.75rem',
      fontFamily: 'monospace',
      overflow: 'auto',
      maxHeight: '200px'
    }}>
      <div><strong>Error:</strong> {error.message}</div>
      <div><strong>Component:</strong> {componentName}</div>
      <div><strong>Error ID:</strong> {errorId}</div>
      <div><strong>Retry Count:</strong> {retryCount}</div>
      {error.stack && (
        <div style={{ marginTop: '0.5rem' }}>
          <strong>Stack Trace:</strong>
          <pre style={{ margin: '0.25rem 0 0 0', whiteSpace: 'pre-wrap' }}>
            {error.stack}
          </pre>
        </div>
      )}
      {errorInfo && (
        <div style={{ marginTop: '0.5rem' }}>
          <strong>Component Stack:</strong>
          <pre style={{ margin: '0.25rem 0 0 0', whiteSpace: 'pre-wrap' }}>
            {errorInfo.componentStack}
          </pre>
        </div>
      )}
    </div>
  </details>
);

/**
 * Accessibility Help Component
 */
const AccessibilityHelp: React.FC = () => (
  <div style={{ 
    marginTop: '1rem', 
    padding: '0.75rem', 
    backgroundColor: '#f3f4f6', 
    borderRadius: '0.25rem',
    fontSize: '0.75rem',
    color: '#374151'
  }}>
    <strong>Accessibility Note:</strong> You can still navigate the site using:
    <ul style={{ margin: '0.25rem 0 0 1rem', paddingLeft: 0 }}>
      <li>Browser back/forward buttons</li>
      <li>Bookmarks or direct URLs</li>
      <li>Search functionality (if available)</li>
      <li>Keyboard shortcuts: Alt+1 (main content), Alt+2 (navigation)</li>
    </ul>
  </div>
);

export default ErrorFallbackUI;
