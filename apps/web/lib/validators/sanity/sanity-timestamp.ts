import { z } from "zod";

export const sanityTimestampValidator = z.object({
    _createdAt: z.iso.datetime(),
    _updatedAt: z.iso.datetime(),
});

export type SanityTimestamp = z.infer<typeof sanityTimestampValidator>;
