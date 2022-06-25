import { z } from "zod";
import { strapiMediaValidator } from "./StrapiMedia";
import { timestampValidator } from "./Timestamp";

export const globalValidator = z
    .object({
        firstName: z.string().nullish(),
        lastName: z.string().nullish(),
        bio: z.string().nullish(),
        cv: strapiMediaValidator.nullish(),
        resume: strapiMediaValidator.nullish()
    })
    .merge(timestampValidator);
export type Global = z.infer<typeof globalValidator>;
