/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Vercel — pages pre-rendered at build time
  // Remove this if you want server-side rendering instead
  output: 'standalone',
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // SEO: trailing slashes off
  trailingSlash: false,

  // Enable React strict mode
  reactStrictMode: true,
}

module.exports = nextConfig
