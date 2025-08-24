import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
}

export default function LoadingSpinner({ 
  size = 'medium', 
  color = '#09b44d',
  text = 'Loading...'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'spinner-border-sm',
    medium: 'spinner-border',
    large: 'spinner-border'
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4">
      <div 
        className={`${sizeClasses[size]} me-2`} 
        role="status" 
        style={{ color }}
      >
        <span className="visually-hidden">{text}</span>
      </div>
      {text && <span className="text-muted mt-2">{text}</span>}
    </div>
  );
} 