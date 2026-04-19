import { z } from "astro/zod";
import { ActionError, defineAction } from "astro:actions";
import {
    articleIncrementViews,
    resumeRequestCreate,
} from "@/lib/sanity/mutations";
import { resumeRequestCreateValidator } from "@/lib/validators/resumeRequest";

export const server = {
    incrementViews: defineAction({
        input: z.object({ documentId: z.string() }),
        handler: async ({ documentId }) => {
            await articleIncrementViews(documentId);
            return { ok: true };
        },
    }),
    requestResume: defineAction({
        accept: "json",
        input: resumeRequestCreateValidator,
        handler: async data => {
            if (data.siteUrl) return { ok: true }; // honeypot field
            try {
                await resumeRequestCreate(data);
            } catch (e) {
                console.error("resumeRequestCreate failed", e);
                throw new ActionError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Unable to submit request",
                });
            }
            return { ok: true };
        },
    }),
};
