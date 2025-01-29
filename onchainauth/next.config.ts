import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXTAUTH_URL || "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: [
              "X-CSRF-Token",
              "X-Requested-With",
              "Accept",
              "Accept-Version",
              "Content-Length",
              "Content-MD5",
              "Content-Type",
              "Date",
              "X-Api-Version",
              "Authorization",
            ].join(", "),
          },
        ],
      },
      {
        source: "/api/auth/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXTAUTH_URL || "*",
          },
          { key: "Content-Type", value: "application/json" },
        ],
      },
    ];
  },
  // Updated key
  serverExternalPackages: [],
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "/api/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
