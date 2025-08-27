/**
 * Lazy Load Fallback UI
 * 
 * Fallback UI components for lazy load error boundary
 * 
 * @module LazyLoadFallbackUI
 * @author SmarterPayouts Team
 * @since 2024
 */

'use client';

import React from 'react';

interface LazyLoadFallbackUIProps {
  componentName: string;
  error: Error | null;
  retryCount: number;
  errorId: string;
  enableRetry: boolean;
  maxRetries: number;
  onRetry: () => void;
  onReset: () => void;
}

/**
 * Default fallback UI for lazy load errors
 */
export const LazyLoadFallbackUI: React.FC<LazyLoadFallbackUIProps> = ({
  componentName,
  error,
  retryCount,
  errorId,
  enableRetry,
  maxRetries,
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
    <div 
      style={fallbackStyle}
      role="alert"
      aria-live="assertive"
      aria-labelledby={`lazy-error-title-${errorId}`}
      aria-describedby={`lazy-error-desc-${errorId}`}
    >
      <LazyLoadErrorHeader componentName={componentName} errorId={errorId} />
      <LazyLoadErrorMessage componentName={componentName} errorId={errorId} />
      <LazyLoadErrorActions 
        componentName={componentName}
        retryCount={retryCount}
        maxRetries={maxRetries}
        enableRetry={enableRetry}
        onRetry={onRetry}
        onReset={onReset}
        buttonStyle={buttonStyle}
        secondaryButtonStyle={secondaryButtonStyle}
      />
      <LazyLoadErrorDetails 
        componentName={componentName}
        error={error}
        errorId={errorId}
        retryCount={retryCount}
      />
    </div>
  );
};

/**
 * Error header component
 */
const LazyLoadErrorHeader: React.FC<{ componentName: string; errorId: string }> = ({
  componentName,
  errorId
}) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
    <span style={{ fontSize: '1.25rem', marginRight: '0.5rem' }}>⚠️</span>
    <h3 
      id={`lazy-error-title-${errorId}`}
      style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}
    >
      Failed to Load {componentName}
    </h3>
  </div>
);

/**
 * Error message component
 */
const LazyLoadErrorMessage: React.FC<{ componentName: string; errorId: string }> = ({
  componentName,
  errorId
}) => (
  <p 
    id={`lazy-error-desc-${errorId}`}
    style={{ margin: '0 0 1rem 0', color: '#7f1d1d' }}
  >
    The {componentName.toLowerCase()} component failed to load. 
    This might be due to a network issue or temporary problem.
  </p>
);

/**
 * Error action buttons component
 */
interface LazyLoadErrorActionsProps {
  componentName: string;
  retryCount: number;
  maxRetries: number;
  enableRetry: boolean;
  onRetry: () => void;
  onReset: () => void;
  buttonStyle: React.CSSProperties;
  secondaryButtonStyle: React.CSSProperties;
}

const LazyLoadErrorActions: React.FC<LazyLoadErrorActionsProps> = ({
  componentName,
  retryCount,
  maxRetries,
  enableRetry,
  onRetry,
  onReset,
  buttonStyle,
  secondaryButtonStyle
}) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
    {enableRetry && retryCount < maxRetries && (
      <button
        onClick={onRetry}
        style={buttonStyle}
        aria-label={`Retry loading ${componentName} (attempt ${retryCount + 1} of ${maxRetries})`}
      >
        Retry ({maxRetries - retryCount} left)
      </button>
    )}
    
    <button
      onClick={onReset}
      style={secondaryButtonStyle}
      aria-label={`Reset ${componentName} error state`}
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

/**
 * Error details component (development only)
 */
interface LazyLoadErrorDetailsProps {
  componentName: string;
  error: Error | null;
  errorId: string;
  retryCount: number;
}

const LazyLoadErrorDetails: React.FC<LazyLoadErrorDetailsProps> = ({
  componentName,
  error,
  errorId,
  retryCount
}) => {
  if (process.env.NODE_ENV !== 'development' || !error) {
    return null;
  }

  return (
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
        <div><strong>Component:</strong> {componentName}</div>
        <div><strong>Error:</strong> {error.message}</div>
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
      </div>
    </details>
  );
};

export default LazyLoadFallbackUI;
