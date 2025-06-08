/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/business-blog',
  assetPrefix: '/business-blog/',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig

