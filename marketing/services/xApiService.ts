import { TwitterApi } from 'twitter-api-v2';

// X API Configuration Interface
interface XApiConfig {
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  accessSecret: string;
}

// X API Service Class
class XApiService {
  private client: TwitterApi | null = null;
  private isConfigured = false;

  constructor() {
    this.initializeClient();
  }

  private initializeClient(): void {
    try {
      const config: XApiConfig = {
        apiKey: process.env.X_API_KEY || '',
        apiSecret: process.env.X_API_SECRET || '',
        accessToken: process.env.X_ACCESS_TOKEN || '',
        accessSecret: process.env.X_ACCESS_SECRET || '',
      };

      // Check if all required credentials are present
      const hasAllCredentials = Object.values(config).every(value => value.length > 0);
      
      if (hasAllCredentials) {
        this.client = new TwitterApi({
          appKey: config.apiKey,
          appSecret: config.apiSecret,
          accessToken: config.accessToken,
          accessSecret: config.accessSecret,
        });
        this.isConfigured = true;
        console.log('[XApiService] X API client initialized successfully');
      } else {
        console.log('[XApiService] X API credentials not found - will operate in simulation mode');
        this.isConfigured = false;
      }
    } catch (error) {
      console.error('[XApiService] Error initializing X API client:', error);
      this.isConfigured = false;
    }
  }

  // Check if the service is properly configured
  public isReady(): boolean {
    return this.isConfigured && this.client !== null;
  }

  // Post a tweet to X
  public async postTweet(content: string, mediaUrl?: string, mediaType?: 'image' | 'video'): Promise<{ success: boolean; data?: any; error?: string }> {
    if (!this.isReady()) {
      return {
        success: false,
        error: 'X API not configured. Missing credentials in environment variables.'
      };
    }

    try {
      // Validate content length (X has 280 character limit)
      if (content.length > 280) {
        return {
          success: false,
          error: `Tweet too long: ${content.length} characters (max 280)`
        };
      }

      if (content.trim().length === 0) {
        return {
          success: false,
          error: 'Tweet content cannot be empty'
        };
      }

      // Post the tweet
      const tweet = await this.client!.v2.tweet(content);
      
      console.log('[XApiService] Tweet posted successfully:', {
        id: tweet.data.id,
        text: tweet.data.text
      });

      return {
        success: true,
        data: {
          id: tweet.data.id,
          text: tweet.data.text,
          url: `https://x.com/user/status/${tweet.data.id}`
        }
      };

    } catch (error: any) {
      console.error('[XApiService] Error posting tweet:', error);
      
      // Handle specific X API errors
      let errorMessage = 'Unknown error occurred while posting to X';
      
      if (error.code === 403) {
        errorMessage = 'Access denied. Check X API permissions.';
      } else if (error.code === 401) {
        errorMessage = 'Authentication failed. Check X API credentials.';
      } else if (error.code === 429) {
        errorMessage = 'Rate limit exceeded. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage
      };
    }
  }

  // Test the API connection
  public async testConnection(): Promise<{ success: boolean; user?: any; error?: string }> {
    if (!this.isReady()) {
      return {
        success: false,
        error: 'X API not configured'
      };
    }

    try {
      const user = await this.client!.v2.me();
      console.log('[XApiService] Connection test successful:', user.data.username);
      
      return {
        success: true,
        user: {
          id: user.data.id,
          username: user.data.username,
          name: user.data.name
        }
      };
    } catch (error: any) {
      console.error('[XApiService] Connection test failed:', error);
      return {
        success: false,
        error: error.message || 'Connection test failed'
      };
    }
  }
}

// Export singleton instance
export const xApiService = new XApiService();
export default xApiService;
