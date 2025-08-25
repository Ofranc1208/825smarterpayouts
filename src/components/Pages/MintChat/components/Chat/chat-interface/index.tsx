/**
 * Chat Interface Module
 * 
 * Exports all interface-related components for the MintChat chat section.
 * Provides clean, modular access to chat manager wrapper and container
 * components with enterprise-grade structure.
 * 
 * @module ChatInterface
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

// Main container component (default export)
export { default } from './ChatContainer';

// Individual components for granular access
export { default as ChatContainer } from './ChatContainer';
export { default as ChatManagerWrapper } from './ChatManagerWrapper';
