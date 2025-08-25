/**
 * Preload Links Component
 * 
 * Handles resource preloading for performance optimization.
 * 
 * @component PreloadLinks
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function PreloadLinks() {
  return (
    <link
      rel="preload"
      href="/assets/videos/promos/counting-cash.mp4"
      type="video/mp4"
    />
  );
}
