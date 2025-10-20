"use client";

import React from 'react';
import styles from './GuaranteedInstructionButton.module.css';

interface GuaranteedInstructionButtonProps {
  onClick: () => void;
}

const GuaranteedInstructionButton: React.FC<GuaranteedInstructionButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      className={styles.instructionButton}
      onClick={onClick}
      aria-label="View page instructions"
    >
      <span className={styles.icon}>📋</span>
      Instructions
    </button>
  );
};

export default GuaranteedInstructionButton;

