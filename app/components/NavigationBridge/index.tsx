/**
 * Navigation Bridge Module
 * 
 * This module contains bridge components that connect Next.js App Router 
 * routing logic with complex systems in src/. These components handle 
 * simple routing concerns while delegating complex functionality to 
 * the appropriate src/ systems.
 * 
 * Architecture Purpose:
 * - Maintains clean separation between app/ (routing) and src/ (complex systems)
 * - Provides simple, focused bridge components
 * - Keeps Next.js routing concerns in app/ directory
 * - Delegates complex UI logic to src/ systems
 * 
 * @module NavigationBridge
 * @author SmarterPayouts Team
 * @since 2024
 */

// Main navigation bridge
export { default as ConditionalNavbar } from './ConditionalNavbar';
export { default } from './ConditionalNavbar';

// Future bridge components can be added here
// export { default as SomeOtherBridge } from './SomeOtherBridge';
