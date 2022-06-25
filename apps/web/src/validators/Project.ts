import { z } from "zod";
import { Publication, publicationValidator } from "./Publication";
import { Skill, skillValidator } from "./Skill";
import { StrapiMedia, strapiMediaValidator } from "./StrapiMedia";
import { dateSchema, Timestamp, timestampValidator } from "./Timestamp";

// TOOD: zod inference on mutally recursive types
export interface Project extends Timestamp {
    name: string;
    logline?: string | null;
    description?: string | null;
    liveSite?: string | null;
    repository?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
    thumbnail?: StrapiMedia | null;
    media?: StrapiMedia[] | null;
    publications?: Publication[] | null;
    skills?: Skill[] | null;
}

export const projectValidator: z.ZodType<Project> = z.lazy(() =>
    z
        .object({
            name: z.string(),
            logline: z.string().nullish(),
            description: z.string().nullish(),
            liveSite: z.string().nullish(),
            repository: z.string().nullish(),
            startDate: dateSchema.nullish(),
            endDate: dateSchema.nullish(),
            thumbnail: strapiMediaValidator.nullish(),
            media: z.array(strapiMediaValidator).nullish(),
            publications: z.array(publicationValidator).nullish(),
            skills: z.array(skillValidator).nullish()
        })
        .merge(timestampValidator)
);
