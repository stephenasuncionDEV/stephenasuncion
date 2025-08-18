/** @type {import('next').NextConfig} */

/* eslint-disable-next-line  @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = withBundleAnalyzer({
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stephenasuncion.dev",
      },
      {
        hostname: "localhost",
        port: "3005",
      },
    ],
  },
  transpilePackages: ["geist"],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
});

module.exports = nextConfig;
