import { sanityDocumentValidator } from "@/lib/validators/sanity/sanity-document";
import { z } from "zod";

export const landingValidator = z
    .object({
        logline: z.string().nullish(),
        intro: z.string().nullish(),
        includeIntro: z.boolean().nullish(),
        includeBlog: z.boolean().nullish(),
        includeContact: z.boolean().nullish(),
        includeEducation: z.boolean().nullish(),
        includeExperience: z.boolean().nullish(),
        includeProjects: z.boolean().nullish(),
        includePublications: z.boolean().nullish(),
        includeSkills: z.boolean().nullish()
    })
    .merge(sanityDocumentValidator);
export type Landing = z.infer<typeof landingValidator>;
