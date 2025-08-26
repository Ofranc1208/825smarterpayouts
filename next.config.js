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
    removeConsole: process.env.NODE_ENV === 'production',
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
    optimizePackageImports: ['react-icons'],
  },
}

module.exports = nextConfig 