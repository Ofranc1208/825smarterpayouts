/**
 * Analytics Utilities for YouTube Channel
 * 
 * Advanced analytics utilities for tracking user behavior, conversion funnels,
 * and business intelligence on the YouTube Channel page.
 * 
 * @module AnalyticsUtils
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0 - Enterprise Edition
 */

/**
 * Conversion funnel stages
 */
export enum ConversionStage {
  AWARENESS = 'awareness',
  INTEREST = 'interest',
  CONSIDERATION = 'consideration',
  INTENT = 'intent',
  EVALUATION = 'evaluation',
  PURCHASE = 'purchase'
}

/**
 * User segment types
 */
export enum UserSegment {
  NEW_VISITOR = 'new_visitor',
  RETURNING_VISITOR = 'returning_visitor',
  ENGAGED_USER = 'engaged_user',
  HIGH_VALUE_USER = 'high_value_user',
  CONVERSION_READY = 'conversion_ready'
}

/**
 * Event tracking configuration
 */
export interface EventConfig {
  category: string;
  action: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  customDimensions?: Record<string, string>;
  customMetrics?: Record<string, number>;
}

/**
 * User behavior data
 */
export interface UserBehaviorData {
  sessionId: string;
  userId?: string;
  timestamp: number;
  pageUrl: string;
  referrer: string;
  userAgent: string;
  screenResolution: string;
  viewportSize: string;
  scrollDepth: number;
  timeOnPage: number;
  interactions: number;
  conversionStage: ConversionStage;
  userSegment: UserSegment;
}

/**
 * Video engagement metrics
 */
export interface VideoEngagementMetrics {
  videoId: string;
  title: string;
  playCount: number;
  completionRate: number;
  averageWatchTime: number;
  engagementRate: number;
  clickThroughRate: number;
  conversionRate: number;
}

/**
 * Generate unique session ID
 */
export function generateSessionId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return `session-${timestamp}-${random}`;
}

/**
 * Detect user segment based on behavior
 */
export function detectUserSegment(behaviorData: Partial<UserBehaviorData>): UserSegment {
  const {
    timeOnPage = 0,
    scrollDepth = 0,
    interactions = 0,
    referrer = ''
  } = behaviorData;

  // High-value user detection
  if (timeOnPage > 300 && scrollDepth > 75 && interactions > 5) {
    return UserSegment.HIGH_VALUE_USER;
  }

  // Conversion-ready user detection
  if (timeOnPage > 180 && scrollDepth > 50 && interactions > 3) {
    return UserSegment.CONVERSION_READY;
  }

  // Engaged user detection
  if (timeOnPage > 120 && scrollDepth > 25 && interactions > 1) {
    return UserSegment.ENGAGED_USER;
  }

  // Returning visitor detection (simplified - in real implementation, use cookies/localStorage)
  if (referrer.includes(window.location.hostname)) {
    return UserSegment.RETURNING_VISITOR;
  }

  return UserSegment.NEW_VISITOR;
}

/**
 * Determine conversion stage based on user actions
 */
export function determineConversionStage(actions: string[]): ConversionStage {
  const actionStageMap: Record<string, ConversionStage> = {
    'page_view': ConversionStage.AWARENESS,
    'video_play': ConversionStage.INTEREST,
    'video_complete': ConversionStage.CONSIDERATION,
    'cta_hover': ConversionStage.INTENT,
    'cta_click': ConversionStage.EVALUATION,
    'form_submit': ConversionStage.PURCHASE
  };

  // Find the highest stage reached
  const stages = actions.map(action => actionStageMap[action]).filter(Boolean);
  const stageOrder = Object.values(ConversionStage);
  
  return stages.reduce((highest, current) => {
    const currentIndex = stageOrder.indexOf(current);
    const highestIndex = stageOrder.indexOf(highest);
    return currentIndex > highestIndex ? current : highest;
  }, ConversionStage.AWARENESS);
}

/**
 * Calculate video engagement score
 */
export function calculateVideoEngagementScore(metrics: VideoEngagementMetrics): number {
  const weights = {
    completionRate: 0.3,
    averageWatchTime: 0.25,
    engagementRate: 0.2,
    clickThroughRate: 0.15,
    conversionRate: 0.1
  };

  const normalizedMetrics = {
    completionRate: Math.min(metrics.completionRate / 100, 1),
    averageWatchTime: Math.min(metrics.averageWatchTime / 300, 1), // Normalize to 5 minutes
    engagementRate: Math.min(metrics.engagementRate / 100, 1),
    clickThroughRate: Math.min(metrics.clickThroughRate / 10, 1), // Normalize to 10%
    conversionRate: Math.min(metrics.conversionRate / 5, 1) // Normalize to 5%
  };

  const score = Object.entries(weights).reduce((total, [metric, weight]) => {
    return total + (normalizedMetrics[metric as keyof typeof normalizedMetrics] * weight);
  }, 0);

  return Math.round(score * 100);
}

/**
 * Generate conversion funnel report
 */
export function generateConversionFunnelReport(userData: UserBehaviorData[]): {
  stages: Record<ConversionStage, number>;
  conversionRates: Record<string, number>;
  dropOffPoints: string[];
} {
  const stageCounts = userData.reduce((acc, user) => {
    acc[user.conversionStage] = (acc[user.conversionStage] || 0) + 1;
    return acc;
  }, {} as Record<ConversionStage, number>);

  const stageOrder = Object.values(ConversionStage);
  const conversionRates: Record<string, number> = {};
  const dropOffPoints: string[] = [];

  for (let i = 1; i < stageOrder.length; i++) {
    const currentStage = stageOrder[i];
    const previousStage = stageOrder[i - 1];
    
    const currentCount = stageCounts[currentStage] || 0;
    const previousCount = stageCounts[previousStage] || 0;
    
    if (previousCount > 0) {
      const rate = (currentCount / previousCount) * 100;
      conversionRates[`${previousStage}_to_${currentStage}`] = rate;
      
      // Identify significant drop-off points (less than 50% conversion)
      if (rate < 50) {
        dropOffPoints.push(`${previousStage} to ${currentStage}`);
      }
    }
  }

  return {
    stages: stageCounts,
    conversionRates,
    dropOffPoints
  };
}

/**
 * A/B test configuration
 */
export interface ABTestConfig {
  testId: string;
  testName: string;
  variants: {
    control: any;
    treatment: any;
  };
  trafficSplit: number; // 0-100, percentage for treatment
  conversionGoal: string;
}

/**
 * Determine A/B test variant for user
 */
export function getABTestVariant(testConfig: ABTestConfig, userId: string): 'control' | 'treatment' {
  // Simple hash-based assignment for consistent user experience
  const hash = userId.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  
  const bucket = Math.abs(hash) % 100;
  return bucket < testConfig.trafficSplit ? 'treatment' : 'control';
}

/**
 * Heat map data generation
 */
export function generateHeatMapData(interactions: Array<{
  x: number;
  y: number;
  timestamp: number;
  type: 'click' | 'hover' | 'scroll';
}>): Array<{
  x: number;
  y: number;
  intensity: number;
}> {
  const heatMapPoints: Record<string, number> = {};
  
  interactions.forEach(interaction => {
    // Round coordinates to create heat map grid
    const gridX = Math.round(interaction.x / 10) * 10;
    const gridY = Math.round(interaction.y / 10) * 10;
    const key = `${gridX},${gridY}`;
    
    heatMapPoints[key] = (heatMapPoints[key] || 0) + 1;
  });
  
  return Object.entries(heatMapPoints).map(([coords, count]) => {
    const [x, y] = coords.split(',').map(Number);
    return {
      x,
      y,
      intensity: count
    };
  });
}

/**
 * Real-time analytics dashboard data
 */
export interface DashboardMetrics {
  activeUsers: number;
  pageViews: number;
  sessionDuration: number;
  bounceRate: number;
  conversionRate: number;
  topVideos: VideoEngagementMetrics[];
  userSegments: Record<UserSegment, number>;
  conversionFunnel: Record<ConversionStage, number>;
  realtimeEvents: EventConfig[];
}

/**
 * Generate dashboard metrics
 */
export function generateDashboardMetrics(
  userData: UserBehaviorData[],
  videoMetrics: VideoEngagementMetrics[],
  recentEvents: EventConfig[]
): DashboardMetrics {
  const totalUsers = userData.length;
  const totalSessions = new Set(userData.map(u => u.sessionId)).size;
  
  return {
    activeUsers: totalUsers,
    pageViews: userData.length,
    sessionDuration: userData.reduce((sum, u) => sum + u.timeOnPage, 0) / totalUsers,
    bounceRate: (userData.filter(u => u.interactions === 0).length / totalUsers) * 100,
    conversionRate: (userData.filter(u => u.conversionStage === ConversionStage.PURCHASE).length / totalUsers) * 100,
    topVideos: videoMetrics.sort((a, b) => b.engagementRate - a.engagementRate).slice(0, 5),
    userSegments: userData.reduce((acc, user) => {
      acc[user.userSegment] = (acc[user.userSegment] || 0) + 1;
      return acc;
    }, {} as Record<UserSegment, number>),
    conversionFunnel: userData.reduce((acc, user) => {
      acc[user.conversionStage] = (acc[user.conversionStage] || 0) + 1;
      return acc;
    }, {} as Record<ConversionStage, number>),
    realtimeEvents: recentEvents.slice(-10) // Last 10 events
  };
}

/**
 * Privacy-compliant data collection
 */
export function sanitizeUserData(userData: UserBehaviorData): Partial<UserBehaviorData> {
  // Remove or hash personally identifiable information
  return {
    sessionId: userData.sessionId,
    timestamp: userData.timestamp,
    pageUrl: userData.pageUrl.replace(/[?&]utm_[^&]*/g, ''), // Remove UTM parameters
    referrer: userData.referrer ? new URL(userData.referrer).hostname : '',
    screenResolution: userData.screenResolution,
    viewportSize: userData.viewportSize,
    scrollDepth: userData.scrollDepth,
    timeOnPage: userData.timeOnPage,
    interactions: userData.interactions,
    conversionStage: userData.conversionStage,
    userSegment: userData.userSegment
  };
}
