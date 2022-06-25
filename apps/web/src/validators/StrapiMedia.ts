import { z } from "zod";

export const strapiMediaValidator = z.object({
    name: z.string().nullish(),
    alternativeText: z.string().nullish(),
    caption: z.string().nullish(),
    width: z.number().nullish(),
    height: z.number().nullish(),
    hash: z.string(),
    ext: z.string(),
    mime: z.string(),
    size: z.number(),
    url: z.string().url(),
    previewUrl: z.string().url().nullish(),
    provider: z.string().nullish()
});

export type StrapiMedia = z.infer<typeof strapiMediaValidator>;
