import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // AVIF first (smaller than WebP) for the local-fallback path that goes
    // through Next's optimizer; Sanity images use the custom loader's
    // auto=format instead. Order matters: AVIF preferred, WebP fallback.
    formats: ["image/avif", "image/webp"],
    qualities: [50, 65, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
