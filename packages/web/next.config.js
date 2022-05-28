/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
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

module.exports = (phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return withPreact({
            /* development only config options here */
            ...defaultConfig,
            ...baseConfig
        });
    }

    return withPreact({
        ...defaultConfig,
        ...baseConfig
    });
};
