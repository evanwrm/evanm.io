import { z } from "zod";
import { strapiMediaValidator } from "./StrapiMedia";
import { timestampValidator } from "./Timestamp";

export const articleValidator = z
    .object({
        title: z.string(),
        slug: z.string(),
        description: z.string().nullish(),
        content: z.string(),
        tags: z.array(z.object({ tag: z.string() })),
        thumbnail: strapiMediaValidator.nullish(),
        media: z.array(strapiMediaValidator).nullish(),
        statsTime: z.number(),
        statsWords: z.number()
    })
    .merge(timestampValidator);
export type Article = z.infer<typeof articleValidator>;
