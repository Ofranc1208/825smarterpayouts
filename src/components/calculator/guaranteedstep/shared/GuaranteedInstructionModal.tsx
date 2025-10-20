"use client";

import React, { useEffect } from 'react';
import styles from './GuaranteedInstructionModal.module.css';

interface GuaranteedInstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const GuaranteedInstructionModal: React.FC<GuaranteedInstructionModalProps> = ({
  isOpen,
  onClose,
  title = "📋 Page Instructions",
  children
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="instruction-modal-title"
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h3 id="instruction-modal-title" className={styles.title}>
            {title}
          </h3>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close instructions"
          >
            ×
          </button>
        </div>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default GuaranteedInstructionModal;

