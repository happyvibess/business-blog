/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  images: { unoptimized: true },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/business-blog' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/business-blog' : '',
  trailingSlash: true,
}

