import type { APIContext } from "astro";
import { articleFind } from "@/lib/sanity/queries";

export const prerender = false;

export async function GET(context: APIContext) {
    const site = context.site?.origin ?? "https://evanm.io";
    const articles = await articleFind({ sort: "_createdAt desc" });

    const body = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...articles.map(article => {
            const loc = `${site}/blog/${article.slug}`;
            const lastmod = new Date(article._updatedAt ?? article._createdAt);

            return [
                "  <url>",
                `    <loc>${loc}</loc>`,
                `    <lastmod>${lastmod.toISOString()}</lastmod>`,
                "  </url>",
            ].join("\n");
        }),
        "</urlset>",
        "",
    ].join("\n");

    return new Response(body, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
}
