/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'revou-finalproject-backend-production.up.railway.app',
        },
        {
          protocol: 'https',
          hostname: 'example.com',
        },
      ],
    },
  };

export default nextConfig;