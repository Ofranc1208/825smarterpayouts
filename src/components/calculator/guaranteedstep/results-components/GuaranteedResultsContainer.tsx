"use client";

import React from 'react';
import styles from './GuaranteedResultsContainer.module.css';

export interface GuaranteedResultsContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * GuaranteedResultsContainer - Container for all result cards
 * Provides consistent layout and spacing for result displays
 */
const GuaranteedResultsContainer: React.FC<GuaranteedResultsContainerProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
    </div>
  );
};

export default GuaranteedResultsContainer;
