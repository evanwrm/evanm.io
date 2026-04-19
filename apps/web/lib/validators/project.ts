import * as z from "zod";
import {
    type Publication,
    publicationValidator,
} from "@/lib/validators/publication";
import {
    type SanityDocument,
    type SanityMedia,
    type SanityReference,
    sanityDocumentValidator,
    sanityMediaValidator,
    sanityReferenceValidator,
} from "@/lib/validators/sanity";
import { type Skill, skillValidator } from "@/lib/validators/skill";

// TODO: zod inference on mutually recursive types
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
            siteUrl: z.url().nullish(),
            repositoryUrl: z.url().nullish(),
            startDate: z.iso.datetime().nullish(),
            endDate: z.iso.datetime().nullish(),
            thumbnail: sanityMediaValidator.nullish(),
            media: z.array(sanityMediaValidator).nullish(),
            publications: z
                .array(
                    z.union([publicationValidator, sanityReferenceValidator]),
                )
                .nullish(),
            skills: z
                .array(z.union([skillValidator, sanityReferenceValidator]))
                .nullish(),
        })
        .extend(sanityDocumentValidator.shape),
);
