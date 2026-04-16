import type { APIRoute } from "astro";
import { settingsFind } from "@/lib/sanity/queries";
import { isReference } from "@/lib/sanity/utils";

export const prerender = false;

export const GET: APIRoute = async () => {
    const { resume } = await settingsFind();
    if (!isReference(resume?.asset) && resume?.asset.url)
        return Response.redirect(resume.asset.url, 307);
    return Response.redirect("/", 307);
};
