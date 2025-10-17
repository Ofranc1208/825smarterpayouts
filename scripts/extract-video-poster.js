/**
 * Video Poster Frame Extractor
 * 
 * This script provides instructions to extract a poster frame from your video.
 * Choose the method that works best for you.
 */

console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║        📸 VIDEO POSTER EXTRACTION GUIDE - 2025 Best Practices       ║
╚══════════════════════════════════════════════════════════════════════╝

Your video: public/assets/videos/promos/counting-cash.mp4
Target: public/assets/videos/promos/counting-cash-poster.jpg

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

METHOD 1: Online Tool (Easiest - No Installation)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Go to: https://ezgif.com/video-to-jpg
2. Upload: public/assets/videos/promos/counting-cash.mp4
3. Select frame at ~1-2 seconds (find a nice clear frame)
4. Click "Convert to JPG"
5. Download the image
6. Save as: counting-cash-poster.jpg
7. Place in: public/assets/videos/promos/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

METHOD 2: VLC Media Player (Windows/Mac/Linux)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Open VLC Media Player
2. Open: public/assets/videos/promos/counting-cash.mp4
3. Pause at a good frame (~1-2 seconds)
4. Video menu → Take Snapshot
5. Find the snapshot (usually in Pictures folder)
6. Rename to: counting-cash-poster.jpg
7. Move to: public/assets/videos/promos/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

METHOD 3: FFmpeg (Best Quality - Requires Installation)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Install FFmpeg:
  Windows: https://www.gyan.dev/ffmpeg/builds/
  Mac: brew install ffmpeg
  Linux: sudo apt install ffmpeg

Then run:
  ffmpeg -i public/assets/videos/promos/counting-cash.mp4 -ss 00:00:01 -vframes 1 -q:v 2 public/assets/videos/promos/counting-cash-poster.jpg

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

METHOD 4: Windows Photos App (Windows Only)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Right-click counting-cash.mp4
2. Open with → Photos
3. Click "Edit & Create" button at top
4. Select "Save photos" 
5. Choose a good frame (~1-2 seconds in)
6. Save as: counting-cash-poster.jpg
7. Move to: public/assets/videos/promos/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 2025 OPTIMIZATION TIPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Recommended Image Size: 1920x1080 (Full HD)
✅ Format: JPG (better compression than PNG for photos)
✅ Quality: 80-85% (sweet spot for quality vs size)
✅ Target File Size: 100-300 KB
✅ Use TinyJPG.com to compress if > 300 KB

🎯 What Frame to Choose:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Pick a frame 1-2 seconds into the video
- Choose a clear, representative moment
- Avoid motion blur or transitions
- Should look good as a static image
- Matches the video's aesthetic

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 TEMPORARY SOLUTION (Already Applied):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your code now uses a gradient fallback (no more 404 errors!).
But for best results, add a real poster image using one of the methods above.

The gradient shows instantly → video fades in when ready ✨

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// If you want to convert this to use the actual poster later, just:
// 1. Extract the frame using any method above
// 2. Update HeroVideo.tsx to use the image instead of gradient
console.log('\n✅ Current Status: Gradient fallback is working (no 404 errors)');
console.log('🎯 Next Step: Extract poster frame for even better performance\n');

