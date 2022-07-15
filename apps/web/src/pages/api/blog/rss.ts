import { NextApiRequest, NextApiResponse } from "next";
import { generateRssFeed, RssEnum, RssFormat } from "../../../lib/rss";
import { NEXT_PUBLIC_RSS_CACHE_TIME } from "../../../lib/utils/constants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const validFormat = RssEnum.safeParse(req.query.format).success;
    const format = validFormat ? (req.query.format as RssFormat) : RssEnum.enum.rss2;

    try {
        const feed = await generateRssFeed(format);
        console.log(feed);

        const formatContentMap = {
            [RssEnum.enum.rss2]: "application/xml",
            [RssEnum.enum.atom1]: "application/xml",
            [RssEnum.enum.json1]: "application/json"
        };
        res.setHeader("Content-Type", formatContentMap[format]);
        res.setHeader(
            "Cache-Control",
            `public, s-maxage=${NEXT_PUBLIC_RSS_CACHE_TIME}, stale-while-revalidate`
        );

        return res.send(feed);
    } catch (e) {
        res.status(500).json({ message: "Failed to generate feed." });
    }
};

export default handler;
