import { sanityDocumentValidator } from "@/lib/validators/sanity/SanityDocument";
import { z } from "zod";

export const landingValidator = z
    .object({
        logline: z.string().nullish(),
        intro: z.string().nullish()
    })
    .merge(sanityDocumentValidator);
export type Landing = z.infer<typeof landingValidator>;
