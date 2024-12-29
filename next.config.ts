import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  env:{
    SERVER:process.env.SERVER,
    NEXT_PUBLIC_RESUME_PATH:process.env.NEXT_PUBLIC_RESUME_PATH,
    RESUMENAME:process.env.RESUMENAME
  },
  eslint:{
    ignoreDuringBuilds:true
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });
    return config;
  },
  /* config options here */
};

export default nextConfig;
