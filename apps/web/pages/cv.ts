import type { APIRoute } from "astro";
import { settingsFind } from "@/lib/sanity/queries";
import { isReference } from "@/lib/sanity/utils";

export const prerender = false;

export const GET: APIRoute = async () => {
    const { cv } = await settingsFind();
    if (!isReference(cv?.asset) && cv?.asset.url)
        return Response.redirect(cv.asset.url, 307);
    return Response.redirect("/", 307);
};
