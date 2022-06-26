import bundleAnalyzer from "@next/bundle-analyzer";
import DuplicatePackageCheckerPlugin from "duplicate-package-checker-webpack-plugin";
import withPlugins from "next-compose-plugins";
import withPreact from "next-plugin-preact";
import withPWA from "next-pwa";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";
import { env } from "./src/lib/server/env.js";

// @ts-check
const analyzerMode = env.ANALYZE === "true";
const withBundleAnalyzer = bundleAnalyzer({ enabled: analyzerMode });

/** @type {import('next').NextConfig} */
const baseConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    i18n: {
        locales: ["en-us", "en"],
        defaultLocale: "en-us"
    },
    images: {
        loader: "default",
        formats: ["image/avif", "image/webp"],
        domains: ["localhost", "res.cloudinary.com"]
    },
    webpack(config, _options) {
        if (analyzerMode) config.plugins.push(new DuplicatePackageCheckerPlugin());

        return config;
    },
    experimental: {
        esmExternals: false
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
    ],
    withPreact
];

export default withPlugins(plugins, {
    ...baseConfig,
    ["!" + PHASE_DEVELOPMENT_SERVER]: {},
    [PHASE_DEVELOPMENT_SERVER]: {}
});
