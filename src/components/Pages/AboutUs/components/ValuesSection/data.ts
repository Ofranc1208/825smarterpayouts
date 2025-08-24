/**
 * Values Section Data
 * 
 * Centralized data configuration for company values and content.
 * Separating data from components for better maintainability and
 * easier content management.
 * 
 * @module ValuesData
 * @author SmarterPayouts Team
 * @since 2024
 */

import type { CompanyValue } from '../../types';

/**
 * Company values data
 */
export const COMPANY_VALUES: CompanyValue[] = [
  {
    title: "Transparency First",
    description: "No hidden fees, no surprise charges. You see exactly what you're getting before you commit.",
    icon: "🎯",
    color: "#059669",
    backgroundColor: "#f0fdf4"
  },
  {
    title: "Client Protection",
    description: "Every transaction is court-approved and regulated. Your interests are always protected.",
    icon: "🛡️",
    color: "#d97706",
    backgroundColor: "#fef3c7"
  },
  {
    title: "Speed & Efficiency",
    description: "Technology-driven processes mean faster quotes and quicker payouts for you.",
    icon: "⚡",
    color: "#2563eb",
    backgroundColor: "#dbeafe"
  },
  {
    title: "Respectful Service",
    description: "No pressure, no pushy sales tactics. We educate and support, never coerce.",
    icon: "🤝",
    color: "#7c3aed",
    backgroundColor: "#f3e8ff"
  }
];

/**
 * Section configuration
 */
export const VALUES_CONFIG = {
  title: "Our Values",
  subtitle: "What Drives Us Every Day",
  description: "These core principles guide every interaction and decision we make. They're not just words on a page—they're the foundation of how we serve our clients.",
  sectionId: "values"
} as const;
