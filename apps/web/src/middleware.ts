import { env } from "@/lib/env/client.mjs";
import { settingsFind } from "@/lib/services/sanity/queries";
import { isReference } from "@/lib/services/sanity/utils";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
    const url = request.nextUrl.clone();

    // Redirects

    // CV
    if (["/cv", "/resume"].includes(url.pathname)) {
        const { cv, resume } = await settingsFind();
        if (url.pathname === "/cv" && !isReference(cv?.asset) && cv?.asset.url)
            return NextResponse.redirect(new URL(cv.asset.url), 307);
        if (url.pathname === "/resume" && !isReference(resume?.asset) && resume?.asset.url)
            return NextResponse.redirect(new URL(resume.asset.url), 307);
    }
    // RSS
    if (["/rss"].includes(url.pathname))
        return NextResponse.redirect(`${env.NEXT_PUBLIC_SITE_URL}/rss.xml`, 301);
    if (["/blog/rss"].includes(url.pathname))
        return NextResponse.redirect(`${env.NEXT_PUBLIC_SITE_URL}/rss.xml`, 301);

    return NextResponse.next();
};

export const config = {
    matcher: ["/cv", "/resume", "/rss", "/blog/rss"]
};
