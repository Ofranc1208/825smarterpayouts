/**
 * ⚠️ DEPRECATED - This file is no longer in use ⚠️
 * 
 * This component has been replaced by the new modular VideoCard implementation
 * located in the VideoGallery module.
 * 
 * ## Migration Path
 * 
 * **DO NOT USE THIS FILE** - It is kept for reference only and will be removed
 * in a future cleanup.
 * 
 * **Use instead:**
 * ```tsx
 * import { VideoCard } from '@/components/Pages/youtube-channel/components/VideoGallery';
 * // OR
 * import VideoCard from '@/components/Pages/youtube-channel/components/VideoGallery/gallery-grid/VideoCard';
 * ```
 * 
 * ## Active Component Location
 * 
 * The active, maintained VideoCard component is located at:
 * - `src/components/Pages/youtube-channel/components/VideoGallery/gallery-grid/VideoCard.tsx`
 * 
 * ## Why This Was Deprecated
 * 
 * This VideoCard was part of the old monolithic VideoGallerySection structure.
 * The codebase has been refactored to use a modular architecture with better
 * separation of concerns in the VideoGallery module.
 * 
 * ## Current Status
 * 
 * - ✅ Active: `VideoGallery/gallery-grid/VideoCard.tsx` (303 lines)
 * - ❌ Deprecated: `VideoGallerySection/VideoCard.tsx` (this file - 287 lines)
 * 
 * The VideoGallerySection folder is marked for future removal. All active
 * imports should use the VideoGallery module instead.
 * 
 * @deprecated Since 2024 - Use VideoGallery/gallery-grid/VideoCard instead
 * @see {@link src/components/Pages/youtube-channel/components/VideoGallery/gallery-grid/VideoCard.tsx}
 */

'use client';

// Re-export from the active component location to prevent breaking changes
// This allows existing imports to continue working during migration
export { default } from '../VideoGallery/gallery-grid/VideoCard';
