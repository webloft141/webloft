import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // We use third-party logo URLs; keep this flexible.
    remotePatterns: [
      { protocol: "https", hostname: "img.logo.dev" },
      { protocol: "https", hostname: "logo.dev" },
    ],
  },
};

export default nextConfig;
