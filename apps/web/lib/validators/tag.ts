import { z } from "zod";
import { sanityDocumentValidator } from "@/lib/validators/sanity/sanity-document";

export const tagValidator = z
    .object({
        name: z.string(),
        description: z.string().nullish(),
        iconId: z.string().nullish(),
    })
    .merge(sanityDocumentValidator);
export type Tag = z.infer<typeof tagValidator>;
