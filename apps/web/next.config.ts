import { env } from "@/lib/env/server.mjs";
import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const analyzerMode = env.ANALYZE === "true";
const withBundleAnalyzer = bundleAnalyzer({ enabled: analyzerMode });

const baseConfig: NextConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    typescript: { ignoreBuildErrors: true }, // TODO: Vercel fsr
    eslint: { ignoreDuringBuilds: true }, // TODO: Vercel fsr
    images: {
        loader: "default",
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            { hostname: "localhost" },
            { hostname: "res.cloudinary.com" },
            { hostname: "cdn.sanity.io" }
        ]
    },
    experimental: { nextScriptWorkers: true }
};

export default withBundleAnalyzer(baseConfig);
