/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: ''
      }
    ],
    domains: ['avatars.githubusercontent.com']
    
  },

}

module.exports = nextConfig
