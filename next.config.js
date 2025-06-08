/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com']
  },
  basePath: '/business-blog',
  assetPrefix: '/business-blog/',
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig

