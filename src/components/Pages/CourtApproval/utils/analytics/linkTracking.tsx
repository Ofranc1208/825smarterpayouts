// Link and navigation tracking utilities
import { trackEvent } from './eventTracking';

// Track external link clicks
export const trackExternalLinkClick = (
  url: string, 
  linkText: string, 
  position: string
): void => {
  trackEvent(
    'external_link_click',
    'navigation',
    'click',
    url,
    undefined,
    {
      link_url: url,
      link_text: linkText,
      link_position: position,
      outbound: true
    }
  );
};

// Track internal navigation
export const trackInternalNavigation = (
  fromPage: string,
  toPage: string,
  linkText: string
): void => {
  trackEvent(
    'internal_navigation',
    'navigation',
    'click',
    `${fromPage}_to_${toPage}`,
    undefined,
    {
      from_page: fromPage,
      to_page: toPage,
      link_text: linkText,
      navigation_type: 'internal'
    }
  );
};

// Track download clicks
export const trackDownloadClick = (
  fileName: string,
  fileType: string,
  fileSize?: number
): void => {
  trackEvent(
    'file_download',
    'download',
    'click',
    fileName,
    fileSize,
    {
      file_name: fileName,
      file_type: fileType,
      file_size: fileSize
    }
  );
};

// Track CTA button clicks
export const trackCTAClick = (
  ctaText: string,
  ctaType: 'primary' | 'secondary',
  section: string,
  position: string
): void => {
  trackEvent(
    'cta_click',
    'engagement',
    'click',
    `${section}_${ctaType}`,
    undefined,
    {
      cta_text: ctaText,
      cta_type: ctaType,
      section: section,
      position: position
    }
  );
};
