"use server";

import { z } from "zod";
import { env } from "@/lib/env/server.mjs";
import { sanityClient } from "@/lib/services/sanity/client";

const articleIncrementViewsSchema = z.object({ documentId: z.string() });
type ArticleIncrementViewsRequest = z.infer<typeof articleIncrementViewsSchema>;
export const articleIncrementViews = async ({
    documentId,
}: ArticleIncrementViewsRequest) => {
    sanityClient
        .patch(documentId)
        .inc({ "stats.views": 1 })
        .commit({ token: env.SANITY_APP_TOKEN })
        .catch(console.error);
};
