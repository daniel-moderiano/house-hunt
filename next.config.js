/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.domain.com.au', 'bucket-api.domain.com.au'],
  },
}

module.exports = nextConfig
