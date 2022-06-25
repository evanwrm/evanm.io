import { z } from "zod";
import { Project, projectValidator } from "./Project";
import { Timestamp, timestampValidator } from "./Timestamp";

// TOOD: zod inference on mutally recursive types
export interface Skill extends Timestamp {
    skillId: string;
    name: string;
    iconId: string;
    description?: string | null;
    url?: string | null;
    projects?: Project[] | null;
}

export const skillValidator: z.ZodType<Skill> = z.lazy(() =>
    z
        .object({
            skillId: z.string(),
            name: z.string(),
            iconId: z.string(),
            description: z.string().nullish(),
            url: z.string().url().nullish(),
            projects: z.array(projectValidator).nullish()
        })
        .merge(timestampValidator)
);
