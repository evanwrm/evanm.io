import { Publication, publicationValidator } from "@/lib/validators/Publication";
import {
    SanityDocument,
    sanityDocumentValidator,
    SanityReference,
    sanityReferencesValidator
} from "@/lib/validators/sanity/SanityDocument";
import { SanityMedia, sanityMediaValidator } from "@/lib/validators/sanity/SanityMedia";
import { Skill, skillValidator } from "@/lib/validators/Skill";
import { z } from "zod";

// TOOD: zod inference on mutally recursive types
export interface Project extends SanityDocument {
    title: string;
    slug: string;
    logline?: string | null;
    description?: string | null;
    siteUrl?: string | null;
    repositoryUrl?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    thumbnail?: SanityMedia | null;
    media?: SanityMedia[] | null;
    publications?: (Publication | SanityReference)[] | null;
    skills?: (Skill | SanityReference)[] | null;
}

export const projectValidator: z.ZodType<Project> = z.lazy(() =>
    z
        .object({
            title: z.string(),
            slug: z.string(),
            logline: z.string().nullish(),
            description: z.string().nullish(),
            siteUrl: z.string().nullish(),
            repositoryUrl: z.string().nullish(),
            startDate: z.string().datetime().nullish(),
            endDate: z.string().datetime().nullish(),
            thumbnail: sanityMediaValidator.nullish(),
            media: z.array(sanityMediaValidator).nullish(),
            publications: z
                .array(z.union([publicationValidator, sanityReferencesValidator]))
                .nullish(),
            skills: z.array(z.union([skillValidator, sanityReferencesValidator])).nullish()
        })
        .merge(sanityDocumentValidator)
);
