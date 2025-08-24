// LinkedIn API service for posting to company pages
// Uses LinkedIn Marketing API v2

interface LinkedInApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

interface LinkedInConnectionTest {
  success: boolean;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
  };
  error?: string;
}

class LinkedInApiService {
  private accessToken: string | undefined;
  private companyPageId: string | undefined;

  constructor() {
    this.accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    this.companyPageId = process.env.LINKEDIN_COMPANY_PAGE_ID;
  }

  /**
   * Check if the LinkedIn API service is properly configured
   */
  isReady(): boolean {
    return !!(this.accessToken && this.companyPageId);
  }

  /**
   * Test the LinkedIn API connection
   */
  async testConnection(): Promise<LinkedInConnectionTest> {
    if (!this.isReady()) {
      return {
        success: false,
        error: 'LinkedIn API not configured. Missing LINKEDIN_ACCESS_TOKEN or LINKEDIN_COMPANY_PAGE_ID'
      };
    }

    try {
      // Test with LinkedIn Profile API to verify token
      const response = await fetch('https://api.linkedin.com/v2/people/~', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });

      if (!response.ok) {
        return {
          success: false,
          error: `LinkedIn API error: ${response.status} ${response.statusText}`
        };
      }

      const userData = await response.json();
      
      return {
        success: true,
        user: {
          id: userData.id || 'unknown',
          firstName: userData.localizedFirstName || 'Unknown',
          lastName: userData.localizedLastName || 'User',
          profilePicture: userData.profilePicture?.displayImage || undefined
        }
      };
    } catch (error: any) {
      return {
        success: false,
        error: `LinkedIn API connection failed: ${error.message}`
      };
    }
  }

  /**
   * Post content to LinkedIn company page
   */
  async postToCompanyPage(
    content: string,
    mediaUrl?: string,
    mediaType?: 'image' | 'video'
  ): Promise<LinkedInApiResponse> {
    if (!this.isReady()) {
      return {
        success: false,
        error: 'LinkedIn API not configured. Missing access token or company page ID'
      };
    }

    try {
      // Construct the post payload for LinkedIn UGC API
      const postData: any = {
        author: `urn:li:organization:${this.companyPageId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: content
            },
            shareMediaCategory: mediaUrl ? 'IMAGE' : 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      };

      // Add media if provided
      if (mediaUrl && mediaType === 'image') {
        // For images, we need to upload the media first, then reference it
        // This is a simplified version - in production, you'd need to implement media upload
        postData.specificContent['com.linkedin.ugc.ShareContent'].media = [
          {
            status: 'READY',
            description: {
              text: 'Professional image for LinkedIn post'
            },
            media: mediaUrl, // In production, this would be the uploaded media URN
            title: {
              text: 'SmarterPayouts Professional Content'
            }
          }
        ];
        postData.specificContent['com.linkedin.ugc.ShareContent'].shareMediaCategory = 'IMAGE';
      }

      // Post to LinkedIn UGC API
      const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        const errorData = await response.text();
        return {
          success: false,
          error: `LinkedIn API error: ${response.status} ${response.statusText} - ${errorData}`
        };
      }

      const responseData = await response.json();
      
      return {
        success: true,
        data: {
          id: responseData.id,
          postUrl: `https://www.linkedin.com/feed/update/${responseData.id}`,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error: any) {
      return {
        success: false,
        error: `LinkedIn posting failed: ${error.message}`
      };
    }
  }

  /**
   * Upload media to LinkedIn (for future implementation)
   */
  private async uploadMedia(mediaUrl: string, mediaType: 'image' | 'video'): Promise<string | null> {
    // TODO: Implement LinkedIn media upload
    // This would involve:
    // 1. Register upload with LinkedIn
    // 2. Upload binary data
    // 3. Return the media URN for use in posts
    
    console.log('[linkedinApiService] Media upload not yet implemented:', { mediaUrl, mediaType });
    return null;
  }

  /**
   * Get company page information
   */
  async getCompanyPageInfo(): Promise<LinkedInApiResponse> {
    if (!this.isReady()) {
      return {
        success: false,
        error: 'LinkedIn API not configured'
      };
    }

    try {
      const response = await fetch(`https://api.linkedin.com/v2/organizations/${this.companyPageId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });

      if (!response.ok) {
        return {
          success: false,
          error: `LinkedIn API error: ${response.status} ${response.statusText}`
        };
      }

      const companyData = await response.json();
      
      return {
        success: true,
        data: {
          id: companyData.id,
          name: companyData.localizedName,
          description: companyData.localizedDescription,
          website: companyData.websiteUrl
        }
      };
    } catch (error: any) {
      return {
        success: false,
        error: `LinkedIn company info failed: ${error.message}`
      };
    }
  }
}

// Export singleton instance
const linkedinApiService = new LinkedInApiService();
export default linkedinApiService;
