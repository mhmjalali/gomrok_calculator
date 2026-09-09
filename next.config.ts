import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits a self-contained .next/standalone build (minimal node_modules included)
  // so the Docker image doesn't need `pnpm install` at runtime — see Dockerfile,
  // which sets DOCKER_BUILD=1 before running the build.
  //
  // Left off for every other build (Vercel included): Vercel has its own build/
  // packaging pipeline and doesn't need this, and forcing it on there causes a
  // build-time crash (ENOENT on .next/next-server.js.nft.json) in current Next.js.
  ...(process.env.DOCKER_BUILD ? { output: "standalone" as const } : {}),
};

export default nextConfig;
