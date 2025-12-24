import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS || process.env.EXPORT_MODE;


const nextConfig: NextConfig = {
  ...(isGitHubPages && {
    output: 'export',
    basePath: '/portfolio',
    images: { 
      unoptimized: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'image-cdn-ak.spotifycdn.com',
        },
        {
          protocol: 'https',
          hostname: 'image-cdn-fa.spotifycdn.com',
        },
      ],
    },
    env: {
      NEXT_PUBLIC_BASE_PATH: '/portfolio',
    },
  }),
  ...(!isGitHubPages && {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'image-cdn-ak.spotifycdn.com',
        },
        {
          protocol: 'https',
          hostname: 'image-cdn-fa.spotifycdn.com',
        },
        {
          protocol: 'https',
          hostname: 'mosaic.scdn.co',
        },
      ],
    },
    env: {
      NEXT_PUBLIC_BASE_PATH: '',
    },
  })
};

export default nextConfig;
