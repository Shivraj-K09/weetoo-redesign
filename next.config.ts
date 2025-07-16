import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
  },
  images: {
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "picsum.photos",
      "lh3.googleusercontent.com",
      "elraqghnwdysyqskvqgn.supabase.co",
    ],
  },
};

export default nextConfig;
