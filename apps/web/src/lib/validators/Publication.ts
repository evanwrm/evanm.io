import { Project, projectValidator } from "@/lib/validators/Project";
import {
    SanityDocument,
    SanityReference,
    sanityDocumentValidator,
    sanityReferencesValidator
} from "@/lib/validators/sanity/SanityDocument";
import { z } from "zod";

// TOOD: zod inference on mutally recursive types
export interface Publication extends SanityDocument {
    title: string;
    slug: string;
    abstract: string;
    authors: string[];
    booktitle?: string | null;
    journal?: string | null;
    pages?: string | null;
    year: string;
    organization?: string | null;
    url?: string | null;
    pdf?: string | null;
    award?: string | null;
    project?: (Project | SanityReference) | null;
}

export const publicationValidator: z.ZodType<Publication> = z.lazy(() =>
    z
        .object({
            title: z.string(),
            slug: z.string(),
            abstract: z.string(),
            authors: z.array(z.string()),
            booktitle: z.string().nullish(),
            journal: z.string().nullish(),
            pages: z.string().nullish(),
            year: z.string().date(),
            organization: z.string().nullish(),
            url: z.string().url().nullish(),
            pdf: z.string().url().nullish(),
            award: z.string().nullish(),
            project: z.union([projectValidator, sanityReferencesValidator]).nullish()
        })
        .merge(sanityDocumentValidator)
);
