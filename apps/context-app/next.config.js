/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@shared/core', '@shared/ui'],
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
