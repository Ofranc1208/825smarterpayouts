// Time tracking utilities
import { trackEvent } from './eventTracking';

// Track time spent on page/sections
export const trackTimeOnPage = (): (() => void) => {
  const startTime = Date.now();
  let isActive = true;
  let totalActiveTime = 0;
  let lastActiveTime = startTime;
  
  // Track when user becomes active/inactive
  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (isActive) {
        totalActiveTime += Date.now() - lastActiveTime;
        isActive = false;
      }
    } else {
      if (!isActive) {
        lastActiveTime = Date.now();
        isActive = true;
      }
    }
  };
  
  // Track mouse movement and keyboard activity
  const handleActivity = () => {
    if (!isActive) {
      lastActiveTime = Date.now();
      isActive = true;
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  document.addEventListener('mousemove', handleActivity, { passive: true });
  document.addEventListener('keydown', handleActivity, { passive: true });
  document.addEventListener('scroll', handleActivity, { passive: true });
  
  // Send time tracking data periodically
  const interval = setInterval(() => {
    const currentTime = Date.now();
    const currentActiveTime = isActive ? totalActiveTime + (currentTime - lastActiveTime) : totalActiveTime;
    const timeOnPage = Math.round(currentActiveTime / 1000);
    
    if (timeOnPage > 0 && timeOnPage % 30 === 0) {
      trackEvent(
        'time_on_page',
        'engagement',
        'time_tracking',
        `${timeOnPage}s`,
        timeOnPage,
        {
          page_location: window.location.href,
          active_time: timeOnPage,
          total_time: Math.round((currentTime - startTime) / 1000)
        }
      );
    }
  }, 1000);
  
  // Cleanup function
  return () => {
    clearInterval(interval);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    document.removeEventListener('mousemove', handleActivity);
    document.removeEventListener('keydown', handleActivity);
    document.removeEventListener('scroll', handleActivity);
    
    // Send final time tracking data
    const endTime = Date.now();
    const finalActiveTime = isActive ? totalActiveTime + (endTime - lastActiveTime) : totalActiveTime;
    const finalTimeOnPage = Math.round(finalActiveTime / 1000);
    
    if (finalTimeOnPage > 0) {
      trackEvent(
        'time_on_page_final',
        'engagement',
        'session_end',
        `${finalTimeOnPage}s`,
        finalTimeOnPage,
        {
          page_location: window.location.href,
          active_time: finalTimeOnPage,
          total_time: Math.round((endTime - startTime) / 1000),
          session_end: true
        }
      );
    }
  };
};
