import { env } from "@/lib/env/server.mjs";
import { createInnerContext } from "@/lib/server/context";
import { createCaller } from "@/lib/server/routers/app";
import { isReference } from "@/lib/services/sanity/utils";
import { articleValidator } from "@/lib/validators/Article";
import { getYear } from "date-fns";
import { Feed } from "feed";
import { z } from "zod";

export const rssFormats = ["rss2", "atom1", "json1"] as const;
export type RssFormat = (typeof rssFormats)[number];
export const RssEnum = z.enum(rssFormats);

export const generateRssFeed = async () => {
    const caller = createCaller(await createInnerContext());
    const [articles, socials, global] = await Promise.all([
        caller.articles.find({ sort: "_createdAt desc" }),
        caller.socials.find(),
        caller.settings.find()
    ]);
    const parsedArticles = articleValidator.array().parse(articles);

    const email = socials?.find(social => social.socialId === "email")?.url.substring(7);
    const author = {
        name: `${global.firstName} ${global.lastName}`,
        email,
        link: env.NEXT_PUBLIC_SITE_URL
    };

    const feed = new Feed({
        title: "Feed Title",
        description: "This is my personal feed!",
        id: env.NEXT_PUBLIC_SITE_URL,
        link: env.NEXT_PUBLIC_SITE_URL,
        // language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
        image: `${env.NEXT_PUBLIC_SITE_URL}/favicons/apple-touch-icon.png`,
        favicon: `${env.NEXT_PUBLIC_SITE_URL}/favicons/favicon.ico`,
        copyright: `All rights reserved ${getYear(Date.now())}, ${global.firstName} ${
            global.lastName
        }`,
        // updated: new Date(2013, 6, 14), // optional, default = today
        // generator: "awesome", // optional, default = 'Feed for Node.js'
        feedLinks: {
            rss2: `${env.NEXT_PUBLIC_SITE_URL}/blog/rss?format=rss2`,
            atom1: `${env.NEXT_PUBLIC_SITE_URL}/blog/rss?format=atom1`,
            json1: `${env.NEXT_PUBLIC_SITE_URL}/blog/rss?format=json1`
        },
        author
    });
    feed.addContributor(author);
    // feed.addCategory("Technology");

    parsedArticles.forEach(article => {
        feed.addItem({
            title: article.title,
            id: article.slug,
            link: `${env.NEXT_PUBLIC_SITE_URL}/blog/${article.slug}`,
            description: article.logline ?? "",
            content: article.content,
            author: [author],
            contributor: [author],
            date: new Date(article._updatedAt),
            image: !isReference(article.thumbnail?.asset) ? article.thumbnail?.asset.url : undefined
        });
    });

    return feed;
};

export const getRssFeed = async (format: RssFormat) => {
    const feed = await generateRssFeed();

    const feedMap: Record<RssFormat, () => string> = {
        rss2: feed.rss2,
        atom1: feed.atom1,
        json1: feed.json1
    };
    const generatedFeed = feedMap[format]();

    return generatedFeed;
};
