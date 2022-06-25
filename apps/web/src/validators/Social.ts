import { z } from "zod";
import { timestampValidator } from "./Timestamp";

export const socialValidator = z
    .object({
        socialId: z.string(),
        name: z.string(),
        iconId: z.string(),
        description: z.string().nullish(),
        url: z.string().url()
    })
    .merge(timestampValidator);
export type SocialLink = z.infer<typeof socialValidator>;
