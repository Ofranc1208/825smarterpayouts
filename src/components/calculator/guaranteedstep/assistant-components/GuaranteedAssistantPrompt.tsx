"use client";

import React from 'react';
import { useGuaranteedAssistant } from '../../../../contexts/GuaranteedAssistantContext';
import styles from './GuaranteedAssistantPrompt.module.css';

/**
 * ============================================================================
 * GUARANTEED ASSISTANT PROMPT - CALL TO ACTION
 * ============================================================================
 *
 * Displays a prominent call-to-action button to open the Guaranteed AI assistant.
 * This component is shown at the top of the Guaranteed calculator flow to encourage
 * users to get help when needed.
 *
 * Features:
 * - Animated pulsing effect to draw attention
 * - Responsive design for all screen sizes
 * - Accessible button with proper ARIA labels
 * - Smooth hover and active states
 *
 * @example
 * ```tsx
 * import { GuaranteedAssistantPrompt } from './assistant-components';
 *
 * <GuaranteedAssistantPrompt />
 * ```
 */
const GuaranteedAssistantPrompt: React.FC = () => {
  const { openAssistant } = useGuaranteedAssistant();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <strong className={styles.title}>Need help?</strong>
          <span className={styles.subtitle}>
            Ask Guaranteed Assistant instantly
          </span>
        </div>
        <button
          className={styles.button}
          onClick={openAssistant}
          type="button"
          aria-label="Open AI Assistant for help"
        >
          Ask Assistant
        </button>
      </div>
    </div>
  );
};

export default GuaranteedAssistantPrompt;
