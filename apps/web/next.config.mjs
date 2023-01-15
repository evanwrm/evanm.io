// @ts-check
import bundleAnalyzer from "@next/bundle-analyzer";
import withPlugins from "next-compose-plugins";
import withPWA from "next-pwa";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";
import { env } from "./src/lib/env/server.mjs";

const analyzerMode = env.ANALYZE === "true";
const withBundleAnalyzer = bundleAnalyzer({ enabled: analyzerMode });

/** @type {import('next').NextConfig} */
const baseConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    images: {
        loader: "default",
        formats: ["image/avif", "image/webp"],
        domains: ["localhost", "res.cloudinary.com", "cdn.sanity.io"]
    },
    experimental: {
        appDir: true,
        legacyBrowsers: false,
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
