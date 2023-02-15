import { sanityDocumentValidator } from "@/lib/validators/sanity/SanityDocument";
import { sanityMediaValidator } from "@/lib/validators/sanity/SanityMedia";
import { z } from "zod";

export const settingsValidator = z
    .object({
        firstName: z.string().nullish(),
        lastName: z.string().nullish(),
        avatar: sanityMediaValidator.nullish(),
        cv: sanityMediaValidator.nullish(),
        resume: sanityMediaValidator.nullish()
    })
    .merge(sanityDocumentValidator);
export type Settings = z.infer<typeof settingsValidator>;
