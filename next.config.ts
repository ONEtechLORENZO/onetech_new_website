import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Pin the workspace root so Next ignores unrelated lockfiles higher up the tree.
  turbopack: { root: path.resolve(process.cwd()) },
};

export default nextConfig;
