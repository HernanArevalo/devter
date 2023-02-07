/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      }
    ],
    domains: ['avatars.githubusercontent.com', 'pbs.twimg.com']
    
  },

}

module.exports = nextConfig
