import path from "node:path";
import type { NextConfig } from "next";

// GH_PAGES=1 builds the static export served from the GitHub Pages subpath.
const ghPages = process.env.GH_PAGES === "1";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Pin the workspace root so Next ignores unrelated lockfiles higher up the tree.
  turbopack: { root: path.resolve(process.cwd()) },
  ...(ghPages && {
    output: "export" as const,
    basePath: "/onetech_new_website",
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
