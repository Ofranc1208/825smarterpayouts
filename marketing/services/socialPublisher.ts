import crypto from 'crypto';
import xApiService from './xApiService';
import facebookApiService from './facebookApiService';
import linkedinApiService from './linkedinApiService';

// Simple in-memory deduplication cache
const recentPosts = new Map<string, number>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

function generateContentHash(content: string, platform: string): string {
  return crypto.createHash('sha256').update(`${platform}:${content.trim().toLowerCase()}`).digest('hex').slice(0, 16);
}

function isDuplicate(content: string, platform: string): boolean {
  const hash = generateContentHash(content, platform);
  const posted = recentPosts.get(hash);
  const now = Date.now();
  
  if (posted && now - posted < CACHE_TTL) {
    return true;
  }
  
  // Clean old entries while we're here
  const keysToDelete: string[] = [];
  recentPosts.forEach((timestamp, key) => {
    if (now - timestamp > CACHE_TTL) {
      keysToDelete.push(key);
    }
  });
  keysToDelete.forEach(key => recentPosts.delete(key));
  
  recentPosts.set(hash, now);
  return false;
}

export async function publishToSocialMedia(
  content: string, 
  platform: string = 'x',
  mediaUrl?: string,
  mediaType?: 'image' | 'video'
): Promise<void> {
  const DRY_RUN = process.env.MARKETING_DRY_RUN !== 'false'; // Default to dry run
  
  // Audit log entry
  const logEntry = {
    timestamp: new Date().toISOString(),
    platform,
    content: content.slice(0, 100) + (content.length > 100 ? '...' : ''),
    contentLength: content.length,
    mediaUrl: mediaUrl || 'none',
    mediaType: mediaType || 'none',
    dryRun: DRY_RUN,
    action: 'publishToSocialMedia'
  };
  
  // Check for duplicates
  if (isDuplicate(content, platform)) {
    console.log('[socialPublisher] Duplicate content detected, skipping:', logEntry);
    return;
  }
  
  if (DRY_RUN) {
    console.log('[socialPublisher] DRY RUN - Would publish to social media:', logEntry);
    // Test X API connection if configured (but don't post)
    if (platform === 'x' && xApiService.isReady()) {
      const connectionTest = await xApiService.testConnection();
      if (connectionTest.success) {
        console.log('[socialPublisher] DRY RUN - X API connection verified:', connectionTest.user);
      } else {
        console.log('[socialPublisher] DRY RUN - X API connection failed:', connectionTest.error);
      }
    }
    
    // Test Facebook connection in DRY_RUN mode
    if (platform === 'facebook' && facebookApiService.isReady()) {
      const connectionTest = await facebookApiService.testConnection();
      if (connectionTest.success) {
        console.log('[socialPublisher] DRY RUN - Facebook API connection verified:', connectionTest.user);
      } else {
        console.log('[socialPublisher] DRY RUN - Facebook API connection failed:', connectionTest.error);
      }
    }
    
    // Test LinkedIn connection in DRY_RUN mode
    if (platform === 'linkedin' && linkedinApiService.isReady()) {
      const connectionTest = await linkedinApiService.testConnection();
      if (connectionTest.success) {
        console.log('[socialPublisher] DRY RUN - LinkedIn API connection verified:', connectionTest.user);
      } else {
        console.log('[socialPublisher] DRY RUN - LinkedIn API connection failed:', connectionTest.error);
      }
    }
  } else {
    console.log('[socialPublisher] Publishing to social media:', logEntry);
    
    // Real posting logic
    if (platform === 'x') {
      const result = await xApiService.postTweet(content, mediaUrl, mediaType);
      if (result.success) {
        console.log('[socialPublisher] Successfully posted to X:', result.data);
      } else {
        console.error('[socialPublisher] Failed to post to X:', result.error);
        throw new Error(`X API Error: ${result.error}`);
      }
    } else if (platform === 'facebook') {
      const result = await facebookApiService.postToPage(content, mediaUrl, mediaType);
      if (result.success) {
        console.log('[socialPublisher] Successfully posted to Facebook:', result.data);
      } else {
        console.error('[socialPublisher] Failed to post to Facebook:', result.error);
        throw new Error(`Facebook API Error: ${result.error}`);
      }
    } else if (platform === 'linkedin') {
      const result = await linkedinApiService.postToCompanyPage(content, mediaUrl, mediaType);
      if (result.success) {
        console.log('[socialPublisher] Successfully posted to LinkedIn:', result.data);
      } else {
        console.error('[socialPublisher] Failed to post to LinkedIn:', result.error);
        throw new Error(`LinkedIn API Error: ${result.error}`);
      }
    } else {
      console.log('[socialPublisher] Unknown platform:', platform);
    }
  }
}