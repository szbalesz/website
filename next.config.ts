import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/7tv-proxy/:path*',
        destination: 'https://cdn.7tv.app/:path*',
      },
      {
        source: '/7tv-api-proxy/:path*',
        destination: 'https://api.7tv.app/:path*',
      },
      {
        source: '/discord-proxy/:path*',
        destination: 'https://cdn.discordapp.com/:path*',
      },
      {
        source: '/media-proxy/:path*',
        destination: 'https://media.discordapp.net/:path*',
      },
      {
        source: '/spotify-proxy/:path*',
        destination: 'https://i.scdn.co/:path*',
      },
      {
        source: '/wiki-proxy/:path*',
        destination: 'https://upload.wikimedia.org/:path*',
      }
    ]
  },
};

export default nextConfig;
