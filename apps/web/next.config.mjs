// @ts-check
import withPWA from "@ducanh2912/next-pwa";
import bundleAnalyzer from "@next/bundle-analyzer";
import withPlugins from "next-compose-plugins";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";
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
    experimental: {
        nextScriptWorkers: true
    }
};
const plugins = [
    [withBundleAnalyzer],
    [
        withPWA,
        {
            pwa: {
                dest: "public",
                register: true
                // sw: "service-worker.js"
            }
        },
        ["!" + PHASE_DEVELOPMENT_SERVER]
    ]
];

export default withPlugins(plugins, {
    ...baseConfig,
    ["!" + PHASE_DEVELOPMENT_SERVER]: {},
    [PHASE_DEVELOPMENT_SERVER]: {}
});
