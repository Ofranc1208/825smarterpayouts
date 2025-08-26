"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
// Guaranteed flow is self-contained and uses its own assistant panel/provider
// Assistant functionality now handled by top-level "Need help?" button
// Inline styles to match project preference

interface GuaranteedStepContainerProps {
  title: string;
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

const GuaranteedStepContainerContent: React.FC<GuaranteedStepContainerProps> = ({ title, children, currentStep, totalSteps }) => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  // Assistant actions are handled by top-level "Need help?" button and `GuaranteedAssistantPanel`
  
  // Build the back URL with session ID and chat=open
  const backUrl = sessionId 
    ? `/mint-intelligent-chat?sessionId=${sessionId}&chat=open`
    : '/mint-intelligent-chat?chat=open';

  const containerStyle: React.CSSProperties = {
    maxWidth: 400,
    margin: '0 auto',
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
    padding: '0.5rem 0.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #f0f0f0',
    marginBottom: '0.5rem'
  };

  const backLinkStyle: React.CSSProperties = {
    color: '#666',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'color 0.2s ease'
  };

  const headerRightStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 12
  };

  const stepIndicatorStyle: React.CSSProperties = {
    color: '#666',
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: '0.01em'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '0.8rem',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: '0.2rem',
    letterSpacing: '-0.01em',
    color: '#22b455'
  };



  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <Link href={backUrl} style={backLinkStyle}>
          ‹ Back to Chat
        </Link>
        <div style={headerRightStyle}>
          <span style={stepIndicatorStyle}>
            Step {currentStep} of {totalSteps}
          </span>
        </div>
      </header>
      <h2 style={titleStyle}>{title}</h2>
      {children}
    </div>
  );
};

const GuaranteedStepContainer: React.FC<GuaranteedStepContainerProps> = (props) => {
  return (
    <Suspense fallback={
      <div style={{
        maxWidth: 400,
        margin: '0 auto',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
        padding: '0.5rem 0.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px'
      }}>
        <div style={{ color: '#666', fontSize: '0.9rem' }}>Loading...</div>
      </div>
    }>
      <GuaranteedStepContainerContent {...props} />
    </Suspense>
  );
};

export default GuaranteedStepContainer; 