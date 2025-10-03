# 🎨 Typography System - Modular Structure

This folder contains the modular typography system for the entire application.

## 📁 Structure

```
typography/
├── index.ts              ← Orchestrator (exports everything)
├── fontScales.ts         ← TYPOGRAPHY constants (sizes, weights, line heights)
├── textHelpers.ts        ← Helper functions (getHeadingStyles, getBodyStyles, etc.)
├── textPresets.ts        ← TEXT_PRESETS (pre-configured styles)
├── iconSizes.ts          ← ICON_SIZES constants
└── README.md             ← This file
```

## 🚀 Usage

### Import Everything (Convenience)
```typescript
import { TYPOGRAPHY, TEXT_PRESETS, getHeadingStyles } from '@/src/components/shared/styles/typography';
```

### Import Specific Modules (Better Tree-Shaking)
```typescript
// Just font scales
import { TYPOGRAPHY } from '@/src/components/shared/styles/typography/fontScales';

// Just helper functions
import { getHeadingStyles, getBodyStyles } from '@/src/components/shared/styles/typography/textHelpers';

// Just presets
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography/textPresets';

// Just icon sizes
import { ICON_SIZES } from '@/src/components/shared/styles/typography/iconSizes';
```

## 📦 Modules

### `fontScales.ts` - Core Typography Constants
- `TYPOGRAPHY.fontSize` - Font size scale (headings, body text)
- `TYPOGRAPHY.fontWeight` - Font weight scale
- `TYPOGRAPHY.lineHeight` - Line height scale
- `TYPOGRAPHY.letterSpacing` - Letter spacing variants

**Use when:** You need raw typography constants.

### `textHelpers.ts` - Utility Functions
- `getHeadingStyles(level)` - Get complete heading styles (h1-h6)
- `getBodyStyles(size, weight)` - Get body text styles
- `getBadgeStyles()` - Get badge/label styles
- `getCardTitleStyles(size)` - Get card title styles
- `getResponsiveHeadingStyles()` - Get responsive heading styles with clamp

**Use when:** You need to generate consistent text styles programmatically.

### `textPresets.ts` - Pre-configured Styles
- Hero section presets (`heroTitle`, `heroSubtitle`)
- Section header presets (`sectionTitle`, `sectionSubtitle`)
- Card presets (`cardTitle`, `cardText`, `cardSubtext`)
- Stat, testimonial, FAQ, link presets

**Use when:** You need common, pre-configured text styles.

### `iconSizes.ts` - Icon Size Scale
- `ICON_SIZES` - Standardized icon dimensions (xsmall, small, medium, large, xlarge)

**Use when:** You need consistent icon sizing.

## 📝 Examples

### Heading with Custom Styles
```typescript
import { getHeadingStyles } from '@/src/components/shared/styles/typography/textHelpers';

<h1 style={getHeadingStyles('h1', { marginBottom: '2rem' })}>
  My Title
</h1>
```

### Using Presets
```typescript
import { TEXT_PRESETS } from '@/src/components/shared/styles/typography/textPresets';

<h2 style={TEXT_PRESETS.sectionTitle}>Section Title</h2>
<p style={TEXT_PRESETS.cardText}>Card content</p>
```

### Direct Constants
```typescript
import { TYPOGRAPHY } from '@/src/components/shared/styles/typography/fontScales';

<p style={{ 
  fontSize: TYPOGRAPHY.fontSize.body.large,
  fontWeight: TYPOGRAPHY.fontWeight.medium 
}}>
  Custom text
</p>
```

## 🔄 Backwards Compatibility

The old `typography.ts` file still exists and re-exports everything from this modular structure.
All existing imports will continue to work:

```typescript
// Still works!
import { TYPOGRAPHY, TEXT_PRESETS } from '@/src/components/shared/styles/typography';
```

## 💡 Best Practices

1. **Use presets first** - Check `textPresets.ts` for common use cases
2. **Use helpers second** - Use helper functions for custom but consistent styles
3. **Use constants last** - Only use raw constants when you need fine-grained control
4. **Import specifically** - Import from specific modules for better tree-shaking
5. **Stay consistent** - Always use the typography system, never hardcode font sizes

## 🎯 Benefits

✅ **Modular** - Import only what you need  
✅ **Clear** - Each file has ONE responsibility  
✅ **Discoverable** - Easy to find specific utilities  
✅ **Maintainable** - Smaller files = easier to update  
✅ **Flexible** - Multiple import strategies supported

