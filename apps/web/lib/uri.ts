import { parseRelativeUrl } from "next/dist/shared/lib/router/utils/parse-relative-url";
import type { ParsedUrl } from "next/dist/shared/lib/router/utils/parse-url";
import { searchParamsToUrlQuery } from "next/dist/shared/lib/router/utils/querystring";
import { env } from "@/lib/env/client.mjs";

export const getBaseUrl = () => {
    if (typeof window !== "undefined") return "";
    if (env.NEXT_PUBLIC_VERCEL_URL) return env.NEXT_PUBLIC_VERCEL_URL;
    return env.NEXT_PUBLIC_SITE_URL;
};

// https://github.com/vercel/next.js/blob/canary/packages/next/shared/lib/router/utils/parse-url.ts
// Need to check if it only consists of the hash
export const parseUrl = (url: string): ParsedUrl => {
    if (url.startsWith("/") || url.startsWith("#")) {
        return parseRelativeUrl(url);
    }

    const parsedURL = new URL(url);
    return {
        hash: parsedURL.hash,
        hostname: parsedURL.hostname,
        href: parsedURL.href,
        pathname: parsedURL.pathname,
        port: parsedURL.port,
        protocol: parsedURL.protocol,
        query: searchParamsToUrlQuery(parsedURL.searchParams),
        search: parsedURL.search,
        slashes:
            parsedURL.href.slice(
                parsedURL.protocol.length,
                parsedURL.protocol.length + 2,
            ) === "//",
    };
};

export const isExternal = (url: string, baseLocation: string = "/") => {
    const match = parseUrl(url);
    const location = parseUrl(baseLocation);

    return (
        match.protocol !== location.protocol ||
        match.hostname !== location.hostname ||
        match.port !== location.port
    );
};
