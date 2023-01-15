import { Project, projectValidator } from "@/lib/validators/Project";
import {
    SanityDocument,
    sanityDocumentValidator,
    SanityReference,
    sanityReferencesValidator
} from "@/lib/validators/sanity/SanityDocument";
import { z } from "zod";

// TOOD: zod inference on mutally recursive types
export interface Skill extends SanityDocument {
    skillId: string;
    name: string;
    iconId: string;
    description?: string | null;
    url?: string | null;
    projects?: (Project | SanityReference)[] | null;
}

export const skillValidator: z.ZodType<Skill> = z.lazy(() =>
    z
        .object({
            skillId: z.string(),
            name: z.string(),
            description: z.string().nullish(),
            url: z.string().url().nullish(),
            iconId: z.string(),
            projects: z.array(z.union([projectValidator, sanityReferencesValidator])).nullish()
        })
        .merge(sanityDocumentValidator)
);
