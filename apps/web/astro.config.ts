import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { defineConfig, envField, fontProviders } from "astro/config";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");
const adapter =
    process.env.ASTRO_ADAPTER === "node"
        ? node({ mode: "standalone" })
        : vercel({
              isr: {
                  expiration: 60,
                  exclude: [/^\/_actions\//, /^\/api\//],
              },
              maxDuration: 30,
              imageService: true,
          });

export default defineConfig({
    site: env.SITE_URL,
    redirects: {
        "/rss": "/rss.xml",
        "/blog/rss": "/rss.xml",
        "/sitemap.xml": "/sitemap-index.xml",
    },
    output: "static",
    adapter,
    integrations: [
        react({
            babel: {
                plugins: ["babel-plugin-react-compiler"],
            },
        }),
        sitemap({
            customSitemaps: env.SITE_URL
                ? [`${env.SITE_URL}/blog-sitemap.xml`]
                : [],
        }),
    ],
    srcDir: ".",
    prefetch: { defaultStrategy: "viewport" },
    image: { domains: ["cdn.sanity.io", "res.cloudinary.com"] },
    fonts: [
        {
            provider: fontProviders.fontsource(),
            name: "Plus Jakarta Sans",
            cssVariable: "--font-sans",
            weights: ["100 900"],
            subsets: ["latin"],
        },
        {
            provider: fontProviders.fontsource(),
            name: "Fira Code",
            cssVariable: "--font-mono",
            weights: ["100 900"],
            subsets: ["latin"],
        },
    ],
    env: {
        schema: {
            // Sanity
            SANITY_PROJECT_ID: envField.string({
                context: "server",
                access: "secret",
            }),
            SANITY_DATASET: envField.string({
                context: "server",
                access: "secret",
                default: "production",
            }),
            SANITY_API_VERSION: envField.string({
                context: "server",
                access: "secret",
                default: "2024-01-01",
            }),
            SANITY_APP_TOKEN: envField.string({
                context: "server",
                access: "secret",
                optional: true,
            }),
        },
    },
});
