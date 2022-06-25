import { z } from "zod";
import { Project, projectValidator } from "./Project";
import { dateSchema, Timestamp, timestampValidator } from "./Timestamp";

// TOOD: zod inference on mutally recursive types
export interface Publication extends Timestamp {
    title: string;
    author: string;
    booktitle?: string | null;
    journal?: string | null;
    pages?: string | null;
    year: Date;
    organization?: string | null;
    pdf?: string | null;
    url?: string | null;
    award?: string | null;
    project?: Project | null;
}

export const publicationValidator: z.ZodType<Publication> = z.lazy(() =>
    z
        .object({
            title: z.string(),
            author: z.string(),
            booktitle: z.string().nullish(),
            journal: z.string().nullish(),
            pages: z.string().nullish(),
            year: dateSchema,
            organization: z.string().nullish(),
            pdf: z.string().url().nullish(),
            url: z.string().url().nullish(),
            award: z.string().nullish(),
            project: projectValidator.nullish()
        })
        .merge(timestampValidator)
);
