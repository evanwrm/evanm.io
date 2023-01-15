// @ts-check
// const { env } = require("./src/lib/env/server.mjs");

/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
    changefreq: "daily",
    priority: 0.7,
    sitemapSize: 5000,
    generateRobotsTxt: true,
    exclude: ["/api", "/admin", "/404"]
};

module.exports = sitemapConfig;
