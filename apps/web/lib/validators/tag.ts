import * as z from "zod";
import { sanityDocumentValidator } from "@/lib/validators/sanity";

export const tagValidator = z
    .object({
        name: z.string(),
        description: z.string().nullish(),
        iconId: z.string().nullish(),
    })
    .extend(sanityDocumentValidator.shape);
export type Tag = z.infer<typeof tagValidator>;
