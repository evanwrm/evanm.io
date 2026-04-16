import * as z from "zod";
import { sanityDocumentValidator } from "@/lib/validators/sanity";

export const socialValidator = z
    .object({
        socialId: z.string(),
        name: z.string(),
        description: z.string().nullish(),
        url: z.url(),
        iconId: z.string(),
    })
    .extend(sanityDocumentValidator.shape);
export type SocialLink = z.infer<typeof socialValidator>;
