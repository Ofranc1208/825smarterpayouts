"use client";

import React from 'react';
import { useGuaranteedAssistant } from '../../../../contexts/GuaranteedAssistantContext';
import styles from './QuickHelpBadge.module.css';

/**
 * ============================================================================
 * QUICK HELP BADGE - SHARED COMPONENT
 * ============================================================================
 *
 * Centralized Quick Help badge for all Guaranteed calculator steps.
 * Provides consistent styling and interaction across all steps.
 *
 * Features:
 * - Compact info badge with lightbulb emoji
 * - Opens Guaranteed AI assistant panel
 * - Hover effects and transitions
 * - Responsive design
 */

export interface QuickHelpBadgeProps {
  className?: string;
}

const QuickHelpBadge: React.FC<QuickHelpBadgeProps> = ({ className }) => {
  const { openAssistant } = useGuaranteedAssistant();

  return (
    <button
      className={`${styles.badge} ${className || ''}`}
      onClick={openAssistant}
      type="button"
      aria-label="Open Quick AI Help Assistant"
    >
      <span className={styles.icon}>💡</span>
      Quick AI Help
    </button>
  );
};

export default QuickHelpBadge;

// Export props interface for TypeScript users
export type { QuickHelpBadgeProps };
