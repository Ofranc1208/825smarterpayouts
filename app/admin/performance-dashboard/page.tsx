import { Metadata } from 'next';
import { PerformanceDashboardPage } from '@/src/components/Pages/PerformanceDashboard';

// Force dynamic rendering for real-time data
export const dynamic = 'force-dynamic';

// Admin-only metadata
export const metadata: Metadata = {
  title: 'Performance Dashboard - Admin | SmarterPayouts',
  description: 'Real-time performance monitoring and analytics dashboard for SmarterPayouts admin team.',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

/**
 * Admin Performance Dashboard Page
 * 
 * Hidden admin-only page for monitoring:
 * - Real-time performance metrics
 * - Core Web Vitals across all pages
 * - User analytics and behavior
 * - System health monitoring
 * - Error tracking and alerts
 * 
 * @access Admin Only
 * @route /admin/performance-dashboard
 * @author SmarterPayouts Team
 * @since 2024
 */
export default function AdminPerformanceDashboardPage() {
  return <PerformanceDashboardPage />;
}
