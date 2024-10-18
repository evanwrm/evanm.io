import { z } from "zod";
import { sanityTimestampValidator } from "./sanity-timestamp";

export const sanityReferencesValidator = z.object({
    _ref: z.string(),
    _type: z.literal("reference")
});
export type SanityReference = z.infer<typeof sanityReferencesValidator>;

export const sanityDocumentValidator = z
    .object({
        _id: z.string(),
        _type: z.string(),
        _rev: z.string()
    })
    .merge(sanityTimestampValidator);
export type SanityDocument = z.infer<typeof sanityDocumentValidator>;
