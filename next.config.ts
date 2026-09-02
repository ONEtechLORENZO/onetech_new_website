import path from "node:path";
import type { NextConfig } from "next";

// GH_PAGES=1 builds the static export served from the GitHub Pages subpath.
const ghPages = process.env.GH_PAGES === "1";
const basePath = ghPages ? "/onetech_new_website" : "";

const nextConfig: NextConfig = {
  devIndicators: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // Pin the workspace root so Next ignores unrelated lockfiles higher up the tree.
  turbopack: { root: path.resolve(process.cwd()) },
  ...(ghPages && {
    output: "export" as const,
    basePath,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
