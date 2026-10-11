import type { NextConfig } from "next";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/$/, "");

const nextConfig: NextConfig = {
  // NEXT_DIST_DIR lets a verification build run beside a live `next start` without touching .next
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Fallback: /pdf/2025.pdf on the frontend origin proxies to the API's static PDFs
  // (files placed in public/pdf/ are served first).
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [{ source: "/pdf/:path*", destination: `${API_URL}/pdf/:path*` }],
    };
  },
};

export default nextConfig;
