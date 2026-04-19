import * as z from "zod";
import { sanityDocumentValidator } from "@/lib/validators/sanity";

export const homeValidator = z
    .object({
        heading: z.string().nullish(),
        logline: z.string().nullish(),
        intro: z.string().nullish(),
        includeIntro: z.boolean().nullish(),
        includeBlog: z.boolean().nullish(),
        includeContact: z.boolean().nullish(),
        includeEducation: z.boolean().nullish(),
        includeExperience: z.boolean().nullish(),
        includeProjects: z.boolean().nullish(),
        includePublications: z.boolean().nullish(),
        includeSkills: z.boolean().nullish(),
    })
    .extend(sanityDocumentValidator.shape);
export type Home = z.infer<typeof homeValidator>;
