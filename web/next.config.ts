import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/halal-nasdaq",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
