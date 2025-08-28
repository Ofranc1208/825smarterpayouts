/**
 * Auto-Refresh Hook
 * 
 * Manages automatic data refreshing for real-time dashboard updates
 */

import { useEffect } from 'react';

interface UseAutoRefreshProps {
  enabled: boolean;
  isRealDataEnabled: boolean;
  onRefresh: () => void;
  intervalMs?: number;
}

export function useAutoRefresh({ 
  enabled, 
  isRealDataEnabled, 
  onRefresh, 
  intervalMs = 30000 
}: UseAutoRefreshProps) {
  
  useEffect(() => {
    if (!enabled || !isRealDataEnabled) {
      return;
    }

    console.log(`🔄 Starting auto-refresh every ${intervalMs / 1000}s`);
    
    const interval = setInterval(() => {
      console.log('🔄 Auto-refreshing dashboard data...');
      onRefresh();
    }, intervalMs);

    return () => {
      console.log('🛑 Stopping auto-refresh');
      clearInterval(interval);
    };
  }, [enabled, isRealDataEnabled, intervalMs]); // Remove onRefresh from dependencies to prevent infinite loop
}
