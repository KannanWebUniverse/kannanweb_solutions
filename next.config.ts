import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  env:{
    NEXT_PUBLIC_RESUME_PATH:process.env.NEXT_PUBLIC_RESUME_PATH,
    NEXT_PUBLIC_RESUMENAME:process.env.NEXT_PUBLIC_RESUMENAME
  },
  eslint:{
    ignoreDuringBuilds:true
  },
  webpack: (config,{ isServer }) => {
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });
    if (isServer) {
      config.externals.push("canvas");
    }
    return config;
  },
  /* config options here */
};

export default nextConfig;
