import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      { source: "/references", destination: "/projets", permanent: true },
      { source: "/portail-client", destination: "/contact", permanent: true },
      { source: "/offres", destination: "/expertises", permanent: true },
      { source: "/plateformes", destination: "/contact", permanent: true },
    ];
  },
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
  allowedDevOrigins: ["10.16.46.108", "localhost", "127.0.0.1"],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
