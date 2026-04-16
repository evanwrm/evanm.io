import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = context => {
    const site = context.site?.origin;
    const body = `# *
User-agent: *
Allow: /

# Host
Host: ${site}

# Sitemaps
Sitemap: ${site}/sitemap-index.xml
`;
    return new Response(body, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
};
