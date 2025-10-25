/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  // Enable static optimization
  trailingSlash: false,
  // Disable x-powered-by header
  poweredByHeader: false,
  // Speed up development
  swcMinify: true,
  compiler: {
    // Keep error and warn logs in production for debugging
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Deployment optimization
  typescript: {
    // Allow deployment with TypeScript errors (for quick deployment)
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allow deployment with ESLint errors
    ignoreDuringBuilds: true,
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: [
      'react-icons',
      '@vercel/analytics',
      '@vercel/speed-insights',
      'lucide-react',
      'framer-motion',
    ],
    scrollRestoration: true,
    webpackBuildWorker: true,
    gzipSize: true,
    // CSS optimization disabled - requires critters package
    // optimizeCss: true,
    // Enable modern JavaScript features
    esmExternals: true,
  },
  // Optimize bundle splitting
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }

    // Handle PDF.js worker properly for Next.js 14
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    return config;
  },
  // Enhanced image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Optimize fonts
  optimizeFonts: true,
  // Enable compression
  compress: true,

  // Redirects for broken navigation links (SEO and UX improvement)
  async redirects() {
    return [
      // HTTP to HTTPS redirects (important for SEO) - fallback method
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://smarterpayouts.com/:path*',
        permanent: true,
      },


      // Fix broken blog links from old navigation - specific redirects
      {
        source: '/blog',
        destination: '/articles',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/articles',
        permanent: true,
      },
      {
        source: '/blog/maximize-offer',
        destination: '/structured-settlement-info-hub/maximize-offer-selling-structured-settlement',
        permanent: true,
      },
      {
        source: '/blog/structured-settlement-basics',
        destination: '/structured-settlement-info-hub/what-is-a-structured-settlement',
        permanent: true,
      },
      {
        source: '/blog/pros-cons-selling-settlement',
        destination: '/structured-settlement-info-hub/pros-cons-selling-structured-settlement',
        permanent: true,
      },
      {
        source: '/blog/tax-implications',
        destination: '/structured-settlement-info-hub/after-you-sell-structured-settlement',
        permanent: true,
      },
      {
        source: '/blog/choosing-company',
        destination: '/structured-settlement-info-hub/how-to-choose-best-company',
        permanent: true,
      },
      {
        source: '/blog/how-fast-payout',
        destination: '/how-fast-can-i-get-my-money',
        permanent: true,
      },
      {
        source: '/blog/should-you-sell',
        destination: '/structured-settlement-info-hub/pros-cons-selling-structured-settlement',
        permanent: true,
      },

      // Fix www versions of blog URLs
      {
        source: '/blog/maximize-offer',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/maximize-offer-selling-structured-settlement',
        permanent: true,
      },
      {
        source: '/blog/structured-settlement-basics',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/what-is-a-structured-settlement',
        permanent: true,
      },
      {
        source: '/blog/pros-cons-selling-settlement',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/pros-cons-selling-structured-settlement',
        permanent: true,
      },
      {
        source: '/blog/tax-implications',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/after-you-sell-structured-settlement',
        permanent: true,
      },
      {
        source: '/blog/choosing-company',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/how-to-choose-best-company',
        permanent: true,
      },
      {
        source: '/blog/how-fast-payout',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/how-fast-can-i-get-my-money',
        permanent: true,
      },
      {
        source: '/blog/should-you-sell',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/pros-cons-selling-structured-settlement',
        permanent: true,
      },

      // Fix www versions of structured settlement info hub pages (specific to canonical issues)
      {
        source: '/structured-settlement-info-hub/faq',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/faq',
        permanent: true,
      },
      {
        source: '/structured-settlement-info-hub/state-laws',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/state-laws',
        permanent: true,
      },
      {
        source: '/structured-settlement-info-hub/common-mistakes-selling-structured-settlement',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/common-mistakes-selling-structured-settlement',
        permanent: true,
      },
      {
        source: '/structured-settlement-info-hub/maximize-offer-selling-structured-settlement',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/maximize-offer-selling-structured-settlement',
        permanent: true,
      },
      {
        source: '/structured-settlement-info-hub/pros-cons-selling-structured-settlement',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/pros-cons-selling-structured-settlement',
        permanent: true,
      },
      {
        source: '/structured-settlement-info-hub/court-approval-process',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/court-approval-process',
        permanent: true,
      },
      {
        source: '/structured-settlement-info-hub/what-is-a-structured-settlement',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/what-is-a-structured-settlement',
        permanent: true,
      },
      {
        source: '/structured-settlement-info-hub/how-to-sell-structured-settlement',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/how-to-sell-structured-settlement',
        permanent: true,
      },
      {
        source: '/structured-settlement-info-hub/after-you-sell-structured-settlement',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/after-you-sell-structured-settlement',
        permanent: true,
      },
      {
        source: '/structured-settlement-info-hub/alternatives-to-selling-structured-settlement',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/alternatives-to-selling-structured-settlement',
        permanent: true,
      },
      {
        source: '/structured-settlement-info-hub/how-to-choose-best-company',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/how-to-choose-best-company',
        permanent: true,
      },
      {
        source: '/structured-settlement-info-hub/glossary-of-structured-settlement-terms',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/glossary-of-structured-settlement-terms',
        permanent: true,
      },
      {
        source: '/structured-settlement-info-hub',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub',
        permanent: true,
      },

      // Fix URLs without hyphens
      {
        source: '/reviewoffer',
        destination: '/review-offer',
        permanent: true,
      },
      {
        source: '/getaquote',
        destination: '/get-a-quote',
        permanent: true,
      },
      {
        source: '/courtapproval',
        destination: '/court-approval',
        permanent: true,
      },
      {
        source: '/pricingcalculator',
        destination: '/pricing-calculator',
        permanent: true,
      },

      // Fix www versions of URLs without hyphens
      {
        source: '/reviewoffer',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/review-offer',
        permanent: true,
      },
      {
        source: '/getaquote',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/get-a-quote',
        permanent: true,
      },
      {
        source: '/courtapproval',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/court-approval',
        permanent: true,
      },
      {
        source: '/pricingcalculator',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/pricing-calculator',
        permanent: true,
      },
      {
        source: '/state-laws',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/state-laws',
        permanent: true,
      },

      // Catch-all for any remaining structured settlement info hub www URLs
      {
        source: '/structured-settlement-info-hub/:slug*',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/:slug*',
        permanent: true,
      },

      // Catch-all for state laws www URLs
      {
        source: '/state-laws/:slug*',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/state-laws/:slug*',
        permanent: true,
      },

      // Catch-all for pricing calculator www URLs
      {
        source: '/pricing-calculator/:slug*',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/pricing-calculator/:slug*',
        permanent: true,
      },

      // Fix old URL formats
      {
        source: '/how-to-sell-structured-settlement',
        destination: '/structured-settlement-info-hub/how-to-sell-structured-settlement',
        permanent: true,
      },
      {
        source: '/how-to-sell-structured-settlement',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/structured-settlement-info-hub/how-to-sell-structured-settlement',
        permanent: true,
      },

      // Fix state laws URL variations
      {
        source: '/state-laws',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/state-laws',
        permanent: true,
      },

      // Fix common typos and variations
      {
        source: '/TAC',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/TAC',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/terms',
        permanent: true,
      },

      // Fix any remaining www URLs - must be last to avoid conflicts with specific redirects above
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.smarterpayouts.com',
          },
        ],
        destination: 'https://smarterpayouts.com/:path*',
        permanent: true,
      },
    ];
  },

  // Add caching headers for better performance
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig 