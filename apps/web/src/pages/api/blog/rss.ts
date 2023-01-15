import { env } from "@/lib/env/client.mjs";
import { getRssFeed, RssFormat, rssFormats } from "@/lib/rss";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const formatParsed = z.enum(rssFormats).safeParse(req.query.format);
    const format: RssFormat = formatParsed.success ? formatParsed.data : "rss2";

    try {
        const feed = await getRssFeed(format);

        const formatContentMap: Record<RssFormat, string> = {
            rss2: "application/xml",
            atom1: "application/xml",
            json1: "application/json"
        };
        res.setHeader("Content-Type", formatContentMap[format]);
        res.setHeader(
            "Cache-Control",
            `public, s-maxage=${env.NEXT_PUBLIC_RSS_CACHE_TIME}, stale-while-revalidate`
        );

        return res.send(feed);
    } catch (e) {
        res.status(500).json({ message: "Failed to generate feed." });
    }
};

export default handler;
