import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  webpack: (config) => {
    config.watchOptions = {
      ignored: [
        "**/contracts/**",
        "**/ignition/**",
        "**/test/**",
        "**/typechain-types/**",
      ],
    };
    return config;
  },
};

module.exports = nextConfig;
