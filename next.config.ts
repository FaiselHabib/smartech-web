import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Serve modern formats — Next negotiates AVIF first, then WebP, then the
    // original. Typically 30–60% smaller than the source PNG/JPEG.
    formats: ["image/avif", "image/webp"],
    // Cache optimized images at the edge for 1 year (immutable hashed URLs).
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "smartech-group.com" },
      // Supabase Storage public URLs — any project ref under supabase.co
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
