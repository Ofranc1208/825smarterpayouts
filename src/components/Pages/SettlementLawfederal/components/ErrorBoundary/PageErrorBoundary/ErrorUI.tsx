'use client';

import { ReactNode } from 'react';

/**
 * Error UI Components Module
 * Following enterprise patterns - focused on error display components only
 */
export class ErrorUI {
  static renderPageError(
    error: Error | undefined,
    onRetry: () => void,
    onGoHome: () => void,
    onReportError: () => void
  ): ReactNode {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        padding: '2rem'
      }}>
        <div style={{
          maxWidth: '600px',
          textAlign: 'center',
          background: 'white',
          padding: '3rem',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          {ErrorUI.renderErrorIcon()}
          {ErrorUI.renderErrorTitle()}
          {ErrorUI.renderErrorDescription()}
          {ErrorUI.renderDevelopmentError(error)}
          {ErrorUI.renderActionButtons(onRetry, onGoHome, onReportError)}
          {ErrorUI.renderSupportInfo()}
        </div>
      </div>
    );
  }

  private static renderErrorIcon(): ReactNode {
    return (
      <div style={{ 
        fontSize: '4rem', 
        marginBottom: '1.5rem',
        animation: 'pulse 2s infinite'
      }}>
        ⚠️
      </div>
    );
  }

  private static renderErrorTitle(): ReactNode {
    return (
      <h1 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#dc2626',
        marginBottom: '1rem'
      }}>
        Settlement Law Page Error
      </h1>
    );
  }

  private static renderErrorDescription(): ReactNode {
    return (
      <p style={{
        color: '#6b7280',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        We encountered an error while loading the Settlement Law Federal page. 
        This is likely a temporary issue. Please try refreshing the page or contact our support team.
      </p>
    );
  }

  private static renderDevelopmentError(error: Error | undefined): ReactNode {
    if (process.env.NODE_ENV !== 'development' || !error) {
      return null;
    }

    return (
      <div style={{
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '0.5rem',
        padding: '1rem',
        marginBottom: '2rem',
        textAlign: 'left'
      }}>
        <h3 style={{ 
          color: '#dc2626', 
          marginBottom: '0.5rem', 
          fontSize: '0.875rem',
          fontWeight: '600'
        }}>
          Development Error Details:
        </h3>
        <pre style={{
          fontSize: '0.75rem',
          color: '#7f1d1d',
          overflow: 'auto',
          maxHeight: '200px',
          margin: 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}>
          {error.message}
          {'\n\n'}
          {error.stack}
        </pre>
      </div>
    );
  }

  private static renderActionButtons(
    onRetry: () => void,
    onGoHome: () => void,
    onReportError: () => void
  ): ReactNode {
    return (
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '2rem'
      }}>
        {ErrorUI.renderRetryButton(onRetry)}
        {ErrorUI.renderHomeButton(onGoHome)}
        {ErrorUI.renderReportButton(onReportError)}
      </div>
    );
  }

  private static renderRetryButton(onRetry: () => void): ReactNode {
    return (
      <button
        onClick={onRetry}
        style={{
          background: '#059669',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          border: 'none',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          fontSize: '0.875rem'
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.background = '#047857';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.background = '#059669';
        }}
      >
        🔄 Try Again
      </button>
    );
  }

  private static renderHomeButton(onGoHome: () => void): ReactNode {
    return (
      <button
        onClick={onGoHome}
        style={{
          background: '#6b7280',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          border: 'none',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          fontSize: '0.875rem'
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.background = '#4b5563';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.background = '#6b7280';
        }}
      >
        🏠 Go Home
      </button>
    );
  }

  private static renderReportButton(onReportError: () => void): ReactNode {
    return (
      <button
        onClick={onReportError}
        style={{
          background: '#dc2626',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          border: 'none',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          fontSize: '0.875rem'
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.background = '#b91c1c';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.background = '#dc2626';
        }}
      >
        📋 Report Error
      </button>
    );
  }

  private static renderSupportInfo(): ReactNode {
    return (
      <div style={{
        padding: '1rem',
        background: '#f0fdf4',
        borderRadius: '0.5rem',
        border: '1px solid #bbf7d0'
      }}>
        <p style={{
          fontSize: '0.875rem',
          color: '#166534',
          margin: 0,
          lineHeight: '1.5'
        }}>
          <strong>Need immediate help?</strong><br />
          Call us at <a 
            href="tel:+18555823506" 
            style={{ 
              color: '#059669',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            (855) 582-3506
          </a> or visit our <a 
            href="/" 
            style={{ 
              color: '#059669',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            homepage
          </a>.
        </p>
      </div>
    );
  }

  static addErrorStyles(): void {
    if (typeof document === 'undefined') return;

    // Add CSS animations and styles for error UI
    const styleId = 'settlement-law-error-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .settlement-law-error-container {
        animation: fadeIn 0.5s ease-out;
      }
    `;
    
    document.head.appendChild(style);
  }
}
