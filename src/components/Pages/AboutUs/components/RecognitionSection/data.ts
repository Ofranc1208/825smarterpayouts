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
    title: "BBB Accredited Business",
    description: "Committed to trust and transparency since 2017",
    icon: "🏆",
    type: "accreditation",
    link: "https://www.bbb.org/us/fl/smarterpayouts"
  },
  {
    title: "Florida State Licensed",
    description: "Registered with SunBiz Corporation Search",
    icon: "📜",
    type: "license",
    link: "https://search.sunbiz.org/Inquiry/CorporationSearch/SearchResults"
  },
  {
    title: "Secure & Compliant",
    description: "Full legal compliance in all 50 states",
    icon: "🔒",
    type: "certification"
  },
  {
    title: "Industry Innovation",
    description: "First company with instant online quotes",
    icon: "🚀",
    type: "award"
  }
];

/**
 * Section configuration
 */
export const RECOGNITION_CONFIG = {
  title: "Recognition & Compliance",
  subtitle: "Trusted & Verified",
  description: "Our credentials and recognition demonstrate our commitment to excellence, transparency, and regulatory compliance in the structured settlement industry.",
  sectionId: "recognition"
} as const;
