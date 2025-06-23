/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['cdn.discordapp.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/icons/**',
      },
    ],
    unoptimized: true,
  },
  // Remove Discord.js specific configurations
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

export default nextConfig
