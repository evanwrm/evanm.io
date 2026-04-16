import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { articleIncrementViews } from "@/lib/sanity/mutations";

export const server = {
    incrementViews: defineAction({
        input: z.object({ documentId: z.string() }),
        handler: async ({ documentId }) => {
            await articleIncrementViews(documentId);
            return { ok: true };
        },
    }),
};
