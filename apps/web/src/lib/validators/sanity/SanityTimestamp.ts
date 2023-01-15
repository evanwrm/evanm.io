import { z } from "zod";

export const sanityTimestampValidator = z.object({
    _createdAt: z.string().datetime(),
    _updatedAt: z.string().datetime()
});

export type SanityTimestamp = z.infer<typeof sanityTimestampValidator>;
