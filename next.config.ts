import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits a self-contained .next/standalone build (minimal node_modules included)
  // so the Docker image doesn't need `pnpm install` at runtime — see Dockerfile.
  output: "standalone",
};

export default nextConfig;
