import { SANITY_APP_TOKEN } from "astro:env/server";
import * as z from "zod";
import { sanityClient } from "@/lib/sanity/client";
import type { ResumeRequestCreate } from "@/lib/validators/resumeRequest";

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

export async function resumeRequestCreate(data: ResumeRequestCreate) {
    return sanityClient.create(
        {
            _type: "resumeRequest",
            name: data.name,
            workEmail: data.workEmail,
            company: data.company,
            siteUrl: data.siteUrl,
            note: data.note,
            status: "pending",
        },
        { token: SANITY_APP_TOKEN },
    );
}
