import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
  },
  images: {
    domains: ["source.unsplash.com", "images.unsplash.com", "picsum.photos"],
  },
};

export default nextConfig;
