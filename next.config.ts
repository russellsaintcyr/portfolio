import type { NextConfig } from "next";

// Image Optimization using the default loader is not compatible with `{ output: 'export' }`.
const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/portfolio',
  images: { 
    unoptimized: true 
  }
};

export default nextConfig;
