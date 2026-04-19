import * as z from "zod";
import {
    sanityDocumentValidator,
    sanityMediaValidator,
} from "@/lib/validators/sanity";

export const settingsValidator = z
    .object({
        firstName: z.string().nullish(),
        lastName: z.string().nullish(),
        location: z.string().nullish(),
        avatar: sanityMediaValidator.nullish(),
        cv: sanityMediaValidator.nullish(),
        resume: sanityMediaValidator.nullish(),
        bookingUrl: z.url().nullish(),
    })
    .extend(sanityDocumentValidator.shape);
export type Settings = z.infer<typeof settingsValidator>;
