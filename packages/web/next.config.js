/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true"
});
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
    }
};
const plugins = [[withBundleAnalyzer], withPreact];

module.exports = withPlugins(plugins, {
    ...baseConfig,
    [PHASE_DEVELOPMENT_SERVER]: {}
});
