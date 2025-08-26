import { NextRequest, NextResponse } from 'next/server';

/**
 * Web Vitals Analytics API Endpoint
 * 
 * Collects and processes Core Web Vitals data for performance monitoring.
 * Integrates with analytics services and provides performance insights.
 * 
 * @route POST /api/analytics/web-vitals
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  id: string;
  delta?: number;
  navigationType?: string;
  url?: string;
  userAgent?: string;
  timestamp?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const metric: WebVitalMetric = body;

    // Validate required fields
    if (!metric.name || typeof metric.value !== 'number' || !metric.rating || !metric.id) {
      return NextResponse.json(
        { error: 'Invalid web vital metric data' },
        { status: 400 }
      );
    }

    // Add additional context
    const enrichedMetric = {
      ...metric,
      timestamp: Date.now(),
      url: request.nextUrl.pathname,
      userAgent: request.headers.get('user-agent') || 'unknown',
      referrer: request.headers.get('referer') || 'direct',
    };

    // Log the metric for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Web Vital Collected - ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
        url: enrichedMetric.url,
      });
    }

    // Async analytics sending (don't await to avoid blocking response)
    if (process.env.NODE_ENV === 'production') {
      // Send to analytics services asynchronously
      setImmediate(async () => {
        try {
          // Example: Send to Google Analytics 4
          if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
            await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`, {
              method: 'POST',
              body: JSON.stringify({
                client_id: metric.id,
                events: [{
                  name: 'web_vital',
                  params: {
                    metric_name: metric.name,
                    metric_value: metric.value,
                    metric_rating: metric.rating,
                    page_location: enrichedMetric.url,
                  }
                }]
              }),
            });
          }
        } catch (error) {
          console.error('Failed to send web vital to analytics:', error);
        }
      });
    }

    // Store in database if needed (optional)
    // await storeWebVital(enrichedMetric);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Web vital recorded successfully',
        metric: metric.name,
        value: metric.value,
        rating: metric.rating
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Web Vitals API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process web vital metric' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for retrieving web vitals summary (optional)
 */
export async function GET(request: NextRequest) {
  try {
    // This could return aggregated web vitals data
    // For now, return a simple status
    return NextResponse.json({
      status: 'Web Vitals API is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve web vitals data' },
      { status: 500 }
    );
  }
}
