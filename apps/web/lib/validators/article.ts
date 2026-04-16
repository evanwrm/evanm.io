import * as z from "zod";
import {
    sanityDocumentValidator,
    sanityMediaValidator,
} from "@/lib/validators/sanity";
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
    .extend(sanityDocumentValidator.shape);
export type Article = z.infer<typeof articleValidator>;
