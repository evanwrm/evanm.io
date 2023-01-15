import { z } from "zod";

export const mediaFormatValidator = z.object({
    name: z.string().nullish(),
    url: z.string().url(),
    width: z.number().nullish(),
    height: z.number().nullish(),
    size: z.number(),
    ext: z.string(),
    mime: z.string(),
    hash: z.string()
});

export const strapiMediaValidator = z
    .object({
        alternativeText: z.string().nullish(),
        caption: z.string().nullish(),
        formats: z
            .union([z.string(), z.object({ thumbnail: mediaFormatValidator.nullish() })])
            .nullish(),
        previewUrl: z.string().url().nullish(),
        provider: z.string().nullish()
    })
    .merge(mediaFormatValidator);

export type StrapiMedia = z.infer<typeof strapiMediaValidator>;
