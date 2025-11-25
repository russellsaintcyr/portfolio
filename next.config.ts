import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS || process.env.EXPORT_MODE;


const nextConfig: NextConfig = {
  ...(isGitHubPages && {
    output: 'export',
    basePath: '/portfolio',
    images: { 
      unoptimized: true 
    },
    env: {
      NEXT_PUBLIC_BASE_PATH: '/portfolio',
    },
  }),
  ...(!isGitHubPages && {
    images: {
      domains: [], // Add any external image domains here if needed
    },
    env: {
      NEXT_PUBLIC_BASE_PATH: '',
    },
  })
};

export default nextConfig;
