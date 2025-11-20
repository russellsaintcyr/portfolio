import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { 
    unoptimized: true 
  }
  // Optional: If your repo name is 'my-app', you need a basePath for correct asset paths
  // basePath: '/my-app',
};

export default nextConfig;
