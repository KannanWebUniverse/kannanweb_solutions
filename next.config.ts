import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  env:{
    SERVER:process.env.SERVER,
    NEXT_PUBLIC_RESUME_PATH:process.env.NEXT_PUBLIC_RESUME_PATH,
    RESUMENAME:process.env.RESUMENAME
  }
  /* config options here */
};

export default nextConfig;
