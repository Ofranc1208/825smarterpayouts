"use client";

import React from 'react';
import { useAssistant } from '../../../../contexts/AssistantContext';
import styles from './QuickHelpBadge.module.css';

/**
 * ============================================================================
 * QUICK HELP BADGE - SHARED COMPONENT
 * ============================================================================
 *
 * Centralized Quick Help badge for all LCP calculator steps.
 * Provides consistent styling and interaction across all steps.
 *
 * Features:
 * - Compact info badge with lightbulb emoji
 * - Opens Mint AI assistant panel
 * - Hover effects and transitions
 * - Responsive design
 */

export interface QuickHelpBadgeProps {
  className?: string;
}

const QuickHelpBadge: React.FC<QuickHelpBadgeProps> = ({ className }) => {
  const { openAssistant } = useAssistant();

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <button
        className={styles.badge}
        onClick={openAssistant}
        type="button"
        aria-label="Open Quick Help Assistant"
      >
        <span className={styles.icon}>💡</span>
        Quick Help
      </button>
    </div>
  );
};

export default QuickHelpBadge;

// Export props interface for TypeScript users
export type { QuickHelpBadgeProps };

