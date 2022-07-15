import { getYear } from "date-fns";
import { Feed } from "feed";
import { z } from "zod";
import { Article, articleValidator } from "../validators/Article";
import { Global } from "../validators/Global";
import { SocialLink } from "../validators/Social";
import { fetchAPI } from "./api";
import { env } from "./server/env";

export const RssEnum = z.enum(["rss2", "atom1", "json1"]);
export type RssFormat = z.infer<typeof RssEnum>;

export const generateRssFeed = async (format: RssFormat) => {
    const [global, socials, articles] = await Promise.all([
        fetchAPI<Global>("/global", { populate: "*" }),
        fetchAPI<SocialLink[]>("/social-links", { populate: "*" }),
        fetchAPI<Article[]>("/articles", { populate: "*", sort: "updatedAt:desc" })
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
            description: article.description || "",
            content: article.content,
            author: [author],
            contributor: [author],
            date: article.updatedAt,
            image: article.thumbnail?.url
        });
    });

    const generatedFeed = {
        [RssEnum.enum.rss2]: feed.rss2,
        [RssEnum.enum.atom1]: feed.atom1,
        [RssEnum.enum.json1]: feed.json1
    }[format]();

    return generatedFeed;
};
