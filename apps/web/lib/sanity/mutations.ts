import { SANITY_APP_TOKEN } from "astro:env/server";
import * as z from "zod";
import { sanityClient } from "@/lib/sanity/client";

export const articleIncrementViewsSchema = z.object({ documentId: z.string() });
export type ArticleIncrementViewsRequest = z.infer<
    typeof articleIncrementViewsSchema
>;
export async function articleIncrementViews(documentId: string) {
    return sanityClient
        .patch(documentId)
        .inc({ "stats.views": 1 })
        .commit({ token: SANITY_APP_TOKEN });
}
