# Navigation Bridge Components

This directory contains bridge components that connect Next.js App Router routing logic with complex systems in the `src/` directory.

## Architecture Purpose

The NavigationBridge serves as a clean separation layer between:

- **`app/`** - Next.js routing concerns, simple page components
- **`src/`** - Complex, reusable business logic systems

## Components

### ConditionalNavbar
- **Purpose**: Conditionally shows/hides the navigation based on current route
- **Logic**: Simple routing logic (show navbar everywhere except homepage)
- **Delegation**: Delegates all complex navigation functionality to `src/components/Navigation`

## Design Principles

1. **Separation of Concerns**: Keep routing logic separate from complex UI systems
2. **Single Responsibility**: Each bridge component handles one specific routing concern
3. **Delegation**: Bridge components are thin wrappers that delegate to src/ systems
4. **Maintainability**: Clear boundaries make the codebase easier to maintain

## Usage

```typescript
// In app/layout.tsx
import ConditionalNavbar from './components/NavigationBridge';

// The bridge handles when to show navigation
<ConditionalNavbar />
```

## Future Extensions

Additional bridge components can be added here for other routing-to-system connections:

- `ConditionalFooter` - Footer visibility logic
- `ConditionalSidebar` - Sidebar routing logic  
- `ConditionalChat` - Chat system routing integration

## Benefits

- ✅ Clean architecture with clear boundaries
- ✅ Easy to understand and maintain
- ✅ Follows Next.js App Router patterns
- ✅ Preserves complex system modularity
- ✅ Simple to test and debug
