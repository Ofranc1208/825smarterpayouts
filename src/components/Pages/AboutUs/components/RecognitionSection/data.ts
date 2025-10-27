/**
 * Recognition Section Data
 * 
 * Centralized data configuration for recognition items and credentials.
 * Separating data from components for better maintainability and
 * easier content management.
 * 
 * @module RecognitionData
 * @author SmarterPayouts Team
 * @since 2024
 */

import type { Recognition } from '../../types';

/**
 * Recognition and credentials data
 */
export const RECOGNITION_ITEMS: Recognition[] = [
  {
    title: "State Licensed",
    description: "Licensed corporation",
    icon: "📜",
    type: "license",
    link: "https://search.sunbiz.org/Inquiry/CorporationSearch/SearchResults"
  },
  {
    title: "Secure & Compliant",
    description: "Licensed to operate with full compliance",
    icon: "🔒",
    type: "certification"
  },
  {
    title: "Industry Innovation",
    description: "First with instant online quotes",
    icon: "🚀",
    type: "award"
  }
];

/**
 * Section configuration
 */
export const RECOGNITION_CONFIG = {
  title: "Recognition & Compliance",
  description: "Licensed and compliant with industry standards.",
  sectionId: "recognition"
} as const;
