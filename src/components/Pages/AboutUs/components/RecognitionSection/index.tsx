/**
 * Recognition Section Module
 * 
 * Ultra-modular recognition section components broken down for maximum
 * maintainability and enterprise-level architecture. Each component
 * handles a specific aspect of the recognition and compliance showcase.
 * 
 * @module RecognitionSection
 * @author SmarterPayouts Team
 * @since 2024
 */

// Main recognition section component
export { default as RecognitionSection } from './RecognitionSection';
export { default } from './RecognitionSection';

// Individual sub-components for flexibility
export { default as RecognitionHeader } from './RecognitionHeader';
export { default as RecognitionCard } from './RecognitionCard';
export { default as RecognitionGrid } from './RecognitionGrid';

// Data and configuration
export { RECOGNITION_ITEMS } from './data';
