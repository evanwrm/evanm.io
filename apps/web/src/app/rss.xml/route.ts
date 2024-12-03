import { getRssFeed, RssFormat, rssFormats } from "@/lib/rss";
import { NextRequest } from "next/server";
import { z } from "zod";

export const revalidate = 3600;

const schema = z.object({ format: z.enum(rssFormats) });

export const GET = async (req: NextRequest) => {
    const params = req.nextUrl.searchParams;
    const { success, data } = schema.safeParse({ format: params.get("format") ?? "rss2" });
    if (!success)
        return Response.json(
            { message: "Invalid request.", status: "error", now: Date.now() },
            { status: 400 }
        );
    const { format } = data;

    try {
        const feed = await getRssFeed(format);
        const formatContentMap: Record<RssFormat, string> = {
            rss2: "application/xml",
            atom1: "application/xml",
            json1: "application/json"
        };
        return new Response(feed, {
            headers: { "Content-Type": formatContentMap[format] },
            status: 200
        });
    } catch (e) {
        console.error(e);
        return Response.json(
            { message: "Failed to generate feed.", status: "error", now: Date.now() },
            { status: 500 }
        );
    }
};
