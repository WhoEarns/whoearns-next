/** @type {import('next').NextConfig} */
const nextConfig = {
  // Do NOT set output: 'standalone' when deploying to Vercel
  // Vercel handles its own optimised output format automatically

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  trailingSlash: false,
  reactStrictMode: true,
}

module.exports = nextConfig
