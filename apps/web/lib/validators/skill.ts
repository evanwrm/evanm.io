import * as z from "zod";
import { type Project, projectValidator } from "@/lib/validators/project";
import {
    type SanityDocument,
    type SanityReference,
    sanityDocumentValidator,
    sanityReferenceValidator,
} from "@/lib/validators/sanity";

// TODO: zod inference on mutually recursive types
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
            url: z.url().nullish(),
            iconId: z.string(),
            projects: z
                .array(z.union([projectValidator, sanityReferenceValidator]))
                .nullish(),
        })
        .extend(sanityDocumentValidator.shape),
);
