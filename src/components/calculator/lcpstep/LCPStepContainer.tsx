"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAssistant } from '../../../contexts/AssistantContext';


interface LCPStepContainerProps {
  title: string;
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

const LCPStepContainer: React.FC<LCPStepContainerProps> = ({ title, children, currentStep, totalSteps }) => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const { openAssistant } = useAssistant();
  
  // Build the back URL with session ID and chat=open
  const backUrl = sessionId 
    ? `/mint-intelligent-chat?sessionId=${sessionId}&chat=open`
    : '/mint-intelligent-chat?chat=open';

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      background: '#fff',
      borderRadius: '16px',
      boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
      padding: '0.5rem 0.75rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '0.5rem',
        borderBottom: '1px solid #f0f0f0',
        marginBottom: '0.5rem'
      }}>
        <Link 
          href={backUrl} 
          style={{
            color: '#666',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#333'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
        >
          ‹ Back to Chat
        </Link>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{
            color: '#666',
            fontSize: '0.85rem',
            fontWeight: '600',
            letterSpacing: '0.01em'
          }}>
            Step {currentStep} of {totalSteps}
          </span>
        </div>
      </header>
      <h2 style={{
        fontSize: '1rem',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '0.2rem',
        letterSpacing: '-0.01em',
        color: '#22b455'
      }}>{title}</h2>
      {children}
    </div>
  );
};

export default LCPStepContainer; 