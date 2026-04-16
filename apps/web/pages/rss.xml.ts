import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { articleFind, settingsFind, socialFind } from "@/lib/sanity/queries";
import { isReference } from "@/lib/sanity/utils";

export const prerender = false;

export async function GET(context: APIContext) {
    const [articles, settings, socials] = await Promise.all([
        articleFind({ sort: "_createdAt desc" }),
        settingsFind(),
        socialFind(),
    ]);

    const site = context.site?.origin ?? "https://localhost:4321";
    const name = `${settings.firstName} ${settings.lastName}`;
    const email = socials
        ?.find(social => social.socialId === "email")
        ?.url.substring(7);

    const title = `${name}'s Blog`;

    return rss({
        title,
        description: `Articles by ${name}`,
        site,
        xmlns: { atom: "http://www.w3.org/2005/Atom" },
        customData: [
            `<language>en</language>`,
            `<copyright>All rights reserved ${new Date().getFullYear()}, ${name}</copyright>`,
            `<managingEditor>${email} (${name})</managingEditor>`,
            `<image>
                <url>${site}/static/favicons/apple-touch-icon.png</url>
                <title>${title}</title>
                <link>${site}</link>
            </image>`,
            `<atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml"/>`,
        ].join("\n"),
        items: articles.map(article => ({
            title: article.title,
            description: article.logline ?? "",
            link: `/blog/${article.slug}`,
            pubDate: new Date(article._createdAt),
            content: article.content,
            author: email ? `${email} (${name})` : name,
            ...(article.thumbnail && !isReference(article.thumbnail.asset)
                ? {
                      enclosure: {
                          url: article.thumbnail.asset.url,
                          type: article.thumbnail.asset.mimeType,
                          length: article.thumbnail.asset.size,
                      },
                  }
                : {}),
        })),
    });
}
