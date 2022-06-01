/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: process.env.SITE_URL || "http://localhost:3000",
    changefreq: "daily",
    priority: 0.7,
    sitemapSize: 5000,
    generateRobotsTxt: true,
    exclude: ["/api", "/admin", "/404"]
};
