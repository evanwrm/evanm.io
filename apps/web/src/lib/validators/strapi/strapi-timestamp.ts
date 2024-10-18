import { z } from "zod";

export const strapiTimestampValidator = z.object({
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    publishedAt: z.string().datetime().nullish()
});

export type StrapiTimestamp = z.infer<typeof strapiTimestampValidator>;
