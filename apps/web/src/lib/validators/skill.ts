import { Project, projectValidator } from "@/lib/validators/project";
import {
    SanityDocument,
    sanityDocumentValidator,
    SanityReference,
    sanityReferencesValidator
} from "@/lib/validators/sanity/sanity-document";
import { z } from "zod";

// TOOD: zod inference on mutally recursive types
export interface Skill extends SanityDocument {
    name: string;
    slug: string;
    iconId: string;
    description?: string | null;
    url?: string | null;
    projects?: (Project | SanityReference)[] | null;
}

export const skillValidator: z.ZodType<Skill> = z.lazy(() =>
    z
        .object({
            name: z.string(),
            slug: z.string(),
            description: z.string().nullish(),
            url: z.string().url().nullish(),
            iconId: z.string(),
            projects: z.array(z.union([projectValidator, sanityReferencesValidator])).nullish()
        })
        .merge(sanityDocumentValidator)
);
