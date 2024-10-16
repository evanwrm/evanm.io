// @ts-check
import bundleAnalyzer from "@next/bundle-analyzer";
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants.js";
import { env } from "./src/lib/env/server.mjs";

const analyzerMode = env.ANALYZE === "true";
const withBundleAnalyzer = bundleAnalyzer({ enabled: analyzerMode });

/** @type {import('next').NextConfig} */
const baseConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
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

const nextConfig = async (phase, { defaultConfig }) => {
    const optional = (plugin, phases) => (phases.includes(phase) ? plugin : config => config);
    const plugins = [
        withBundleAnalyzer,
        optional(
            async config =>
                (await import("@serwist/next")).default({
                    cacheOnNavigation: true,
                    swSrc: "src/app/sw.ts",
                    swDest: "public/sw.js"
                })(config),
            [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD]
        )
    ];

    return plugins.reduce((config, plugin) => plugin(config), { ...defaultConfig, ...baseConfig });
};
export default nextConfig;
