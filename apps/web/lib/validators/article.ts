import { z } from "zod";
import { sanityDocumentValidator } from "@/lib/validators/sanity/sanity-document";
import { sanityMediaValidator } from "@/lib/validators/sanity/sanity-media";
import { tagValidator } from "@/lib/validators/tag";

export const articleValidator = z
    .object({
        title: z.string(),
        slug: z.string(),
        logline: z.string().nullish(),
        content: z.string(),
        tags: z.array(tagValidator).nullish(),
        thumbnail: sanityMediaValidator.nullish(),
        media: z.array(sanityMediaValidator).nullish(),
        stats: z.object({
            time: z.number(),
            words: z.number(),
            views: z.number(),
        }),
    })
    .merge(sanityDocumentValidator);
export type Article = z.infer<typeof articleValidator>;
