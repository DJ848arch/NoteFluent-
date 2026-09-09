import type { NextConfig } from "next";

const pagesBasePath = "/NoteFluent-";

// Keep `next dev` at `/`. Production/export (including GitHub Actions) must
// use the GitHub Pages project subpath.
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === "development" ? "" : pagesBasePath);

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
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
