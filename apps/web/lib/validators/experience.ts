import * as z from "zod";
import {
    sanityDocumentValidator,
    sanityMediaValidator,
} from "@/lib/validators/sanity";

export const experienceTypeValidator = z.enum([
    "selfemployed",
    "freelance",
    "internship",
    "apprenticeship",
    "contract-fulltime",
    "contract-parttime",
    "permanent-fulltime",
    "permanent-parttime",
    "casual-oncall",
    "seasonal",
    "coop",
]);
export const locationTypeValidator = z.enum(["remote", "onsite", "hybrid"]);

export const experienceValidator = z
    .object({
        slug: z.string(),
        company: z.string(),
        role: z.string(),
        location: z.string().nullish(),
        locationType: locationTypeValidator.nullish(),
        employmentType: experienceTypeValidator,
        startDate: z.string().nullish(),
        endDate: z.string().nullish(),
        siteUrl: z.string().nullish(),
        description: z.string().nullish(),
        thumbnail: sanityMediaValidator.nullish(),
        media: z.array(sanityMediaValidator).nullish(),
    })
    .extend(sanityDocumentValidator.shape);
export type Experience = z.infer<typeof experienceValidator>;
