import { z } from "zod";
import { sanityDocumentValidator } from "@/lib/validators/sanity/sanity-document";

export const socialValidator = z
    .object({
        socialId: z.string(),
        name: z.string(),
        description: z.string().nullish(),
        url: z.string().url(),
        iconId: z.string(),
    })
    .merge(sanityDocumentValidator);
export type SocialLink = z.infer<typeof socialValidator>;
