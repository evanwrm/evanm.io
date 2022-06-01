/** @type {import('next').NextConfig} */
const analyzerMode = process.env.ANALYZE === "true";

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: analyzerMode
});
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const withPWA = require("next-pwa");
const withPreact = require("next-plugin-preact");

const baseConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    i18n: {
        locales: ["en-us", "en"],
        defaultLocale: "en-us"
    },
    images: {
        loader: "default",
        domains: ["localhost"]
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

module.exports = withPlugins(plugins, {
    ...baseConfig,
    ["!" + PHASE_DEVELOPMENT_SERVER]: {},
    [PHASE_DEVELOPMENT_SERVER]: {}
});
