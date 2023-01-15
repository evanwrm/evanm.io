import { sanityDocumentValidator } from "@/lib/validators/sanity/SanityDocument";
import { sanityMediaValidator } from "@/lib/validators/sanity/SanityMedia";
import { z } from "zod";
import { tagValidator } from "./Tag";

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
            words: z.number()
        })
    })
    .merge(sanityDocumentValidator);
export type Article = z.infer<typeof articleValidator>;
