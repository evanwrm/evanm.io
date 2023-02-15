import { env } from "@/lib/env/client.mjs";
import { getRssFeed, RssFormat, rssFormats } from "@/lib/rss";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// TODO: check appdir route support
export const GET = async (req: NextRequest) => {
    const formatParsed = z.enum(rssFormats).safeParse(req.nextUrl.searchParams.get("format"));
    const format: RssFormat = formatParsed.success ? formatParsed.data : "rss2";

    try {
        const feed = await getRssFeed(format);

        const formatContentMap: Record<RssFormat, string> = {
            rss2: "application/xml",
            atom1: "application/xml",
            json1: "application/json"
        };

        return new Response(feed, {
            headers: {
                "Content-Type": formatContentMap[format],
                "Cache-Control": `public, s-maxage=${env.NEXT_PUBLIC_RSS_CACHE_TIME}, stale-while-revalidate`
            },
            status: 200
        });
    } catch (e) {
        return NextResponse.json({ message: "Failed to generate feed." }, { status: 500 });
    }
};

export const revalidate = 3600;
