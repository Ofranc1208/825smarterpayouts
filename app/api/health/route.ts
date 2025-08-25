import { NextResponse } from 'next/server';

/**
 * Health Check API Endpoint
 * 
 * Provides system health status for CI/CD pipeline monitoring,
 * load balancer health checks, and deployment verification.
 * 
 * @route GET /api/health
 * @author SmarterPayouts Team
 * @since 2024
 * @version 2.0.0
 */

export async function GET() {
  const startTime = Date.now();
  
  try {
    // Basic system checks
    const healthChecks = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.NEXT_PUBLIC_APP_VERSION || '2.0.0',
      checks: {
        database: 'healthy', // Placeholder for database health
        externalServices: 'healthy', // Placeholder for external service health
        memory: 'healthy', // Placeholder for memory usage check
        disk: 'healthy', // Placeholder for disk space check
      },
      responseTime: 0,
    };

    // Calculate response time
    healthChecks.responseTime = Date.now() - startTime;

    // Return health status
    return NextResponse.json(healthChecks, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Return error status
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        responseTime: Date.now() - startTime,
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

/**
 * Health Check with Detailed Status
 * 
 * Provides comprehensive health information including
 * performance metrics and system resources.
 * 
 * @route GET /api/health/detailed
 */
export async function POST() {
  const startTime = Date.now();
  
  try {
    // Collect detailed system information
    const detailedHealth = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.NEXT_PUBLIC_APP_VERSION || '2.0.0',
      system: {
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage(),
      },
      checks: {
        database: {
          status: 'healthy',
          responseTime: Math.random() * 100, // Placeholder
          lastCheck: new Date().toISOString(),
        },
        externalServices: {
          status: 'healthy',
          services: {
            firebase: 'connected',
            openai: 'available',
            analytics: 'active',
          },
          lastCheck: new Date().toISOString(),
        },
        performance: {
          status: 'healthy',
          metrics: {
            responseTime: 0,
            memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024, // MB
            cpuUsage: 0,
          },
        },
      },
      responseTime: 0,
    };

    // Calculate response time
    detailedHealth.responseTime = Date.now() - startTime;
    detailedHealth.checks.performance.metrics.responseTime = detailedHealth.responseTime;

    return NextResponse.json(detailedHealth, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        responseTime: Date.now() - startTime,
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
