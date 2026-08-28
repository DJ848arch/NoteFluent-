import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["vexflow"],
  // Cursor Preview proxies through a non-localhost origin; Next 16 blocks
  // /_next assets unless that host is allowlisted.
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "*.localhost",
    "**.localhost",
    "*.cursor.sh",
    "*.cursor.com",
    "*.cloud.cursor.com",
  ],
};

export default nextConfig;
