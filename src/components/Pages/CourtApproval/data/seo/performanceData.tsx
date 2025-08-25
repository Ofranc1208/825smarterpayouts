// Performance optimization data for Court Approval page
import type { PerformanceHints } from '../../types/seoTypes';

// Performance Hints
export const performanceHints: PerformanceHints = {
  preconnect: [
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "https://www.google-analytics.com",
    "https://www.googletagmanager.com"
  ],
  prefetch: [
    "/quote",
    "/mint-chat",
    "/contact"
  ],
  preload: [
    {
      href: "/fonts/inter-var.woff2",
      as: "font",
      type: "font/woff2"
    },
    {
      href: "/images/hero-bg.webp",
      as: "image",
      type: "image/webp"
    },
    {
      href: "/css/critical.css",
      as: "style"
    }
  ],
  dns_prefetch: [
    "//www.google-analytics.com",
    "//fonts.googleapis.com",
    "//cdn.jsdelivr.net"
  ]
};
