/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: process.env.NODE_ENV === 'production' ? '/business-blog' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/business-blog/' : '',
}

module.exports = nextConfig

