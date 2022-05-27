/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const baseConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    i18n: {
        locales: ["en-CA", "en-US"],
        defaultLocale: "en-CA"
    },
    images: {
        loader: "default",
        domains: ["localhost"]
    },

    // Using env as config since runtime config isn't supported by serverless deployments
    env: {
        url: "https://evanm.io",
        siteName: "evanm.io",
        siteDisplayName: "Evan Madill",
        description: "Portfolio website by Evan Madill",
        locale: "en_CA"
    }
};

module.exports = (phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            /* development only config options here */
            ...defaultConfig,
            ...baseConfig
        };
    }

    return {
        ...defaultConfig,
        ...baseConfig
    };
};
