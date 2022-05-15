/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const baseConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    i18n: {
        locales: ["en-US"],
        defaultLocale: "en-US"
    },
    // Using env as config since runtime config isn't supported by serverless deployments
    env: {
        url: "https://evanm.io",
        siteName: "evanm.io",
        siteDisplayName: "Evan Madill's Portfolio Website",
        description: "The frontend component of a portfolio website running Next.js",
        locale: "en_US"
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
