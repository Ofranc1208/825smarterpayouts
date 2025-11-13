/**
 * Testimonial Image Optimization Script
 * 
 * This script optimizes testimonial images for the website:
 * - Resizes to 400x400px (optimal for 230px circular display)
 * - Converts to WebP format for better performance
 * - Maintains JPG fallback for compatibility
 * - Applies quality optimization (85%)
 */

const fs = require('fs');
const path = require('path');

// Try to load sharp, if not available, provide instructions
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('⚠️  Sharp not installed. Install it with: npm install sharp --save-dev');
  console.log('Or optimize images manually to 400x400px and place in public/assets/images/testimonials/');
  process.exit(1);
}

const INPUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'images');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'images', 'testimonials');
const TARGET_SIZE = 400;
const QUALITY = 85;

// Testimonial images to process
const testimonialImages = [
  'Test1.JPG',
  'Test2.JPG',
  'Test3.JPG',
  'Test4.JPG',
  'Test5.JPG',
  'Test6.JPG'
];

async function optimizeImage(filename) {
  const inputPath = path.join(INPUT_DIR, filename);
  const baseName = filename.toLowerCase().replace('.jpg', '');
  const webpPath = path.join(OUTPUT_DIR, `${baseName}.webp`);
  const jpgPath = path.join(OUTPUT_DIR, `${baseName}.jpg`);

  try {
    console.log(`📸 Processing ${filename}...`);

    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      console.log(`   ❌ File not found: ${filename}`);
      return;
    }

    // Get original dimensions
    const metadata = await sharp(inputPath).metadata();
    console.log(`   📐 Original: ${metadata.width}x${metadata.height}`);

    // Resize and convert to WebP
    await sharp(inputPath)
      .resize(TARGET_SIZE, TARGET_SIZE, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: QUALITY })
      .toFile(webpPath);
    
    console.log(`   ✅ Created WebP: ${baseName}.webp (400x400)`);

    // Resize and save as JPG fallback
    await sharp(inputPath)
      .resize(TARGET_SIZE, TARGET_SIZE, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: QUALITY })
      .toFile(jpgPath);
    
    console.log(`   ✅ Created JPG: ${baseName}.jpg (400x400)`);

  } catch (error) {
    console.error(`   ❌ Error processing ${filename}:`, error.message);
  }
}

async function main() {
  console.log('🎨 Testimonial Image Optimization');
  console.log('================================\n');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Created output directory: ${OUTPUT_DIR}\n`);
  }

  // Process all images
  for (const image of testimonialImages) {
    await optimizeImage(image);
    console.log('');
  }

  console.log('✨ Optimization complete!');
  console.log(`📂 Optimized images saved to: ${OUTPUT_DIR}`);
}

main().catch(console.error);

