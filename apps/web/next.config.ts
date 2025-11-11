import { env } from "@/lib/env/server.mjs";
import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const analyzerMode = env.ANALYZE === "true";
const withBundleAnalyzer = bundleAnalyzer({ enabled: analyzerMode });

const baseConfig: NextConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    images: {
        loader: "default",
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            { hostname: "localhost" },
            { hostname: "res.cloudinary.com" },
            { hostname: "cdn.sanity.io" }
        ]
    }
};

export default withBundleAnalyzer(baseConfig);
