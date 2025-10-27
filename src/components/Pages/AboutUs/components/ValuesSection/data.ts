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
    description: "No hidden fees or surprise charges.",
    icon: "🎯",
    color: "#059669",
    backgroundColor: "#f0fdf4"
  },
  {
    title: "Client Protection",
    description: "Court-approved transactions protect your interests.",
    icon: "🛡️",
    color: "#d97706",
    backgroundColor: "#fef3c7"
  },
  {
    title: "Speed & Efficiency",
    description: "Faster quotes and quicker payouts.",
    icon: "⚡",
    color: "#2563eb",
    backgroundColor: "#dbeafe"
  },
  {
    title: "Respectful Service",
    description: "No pressure, just education and support.",
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
  description: "Core principles that guide our service.",
  sectionId: "values"
} as const;
