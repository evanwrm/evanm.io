import { sanityDocumentValidator } from "@/lib/validators/sanity/SanityDocument";
import { sanityMediaValidator } from "@/lib/validators/sanity/SanityMedia";
import { z } from "zod";

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
    "coop"
]);
export const locationTypeValidator = z.enum(["remote", "onsite", "hybrid"]);

export const experienceValidator = z
    .object({
        role: z.string(),
        company: z.string(),
        employmentType: experienceTypeValidator,
        locationType: locationTypeValidator.nullish(),
        location: z.string().nullish(),
        siteUrl: z.string().nullish(),
        description: z.string().nullish(),
        startDate: z.string().nullish(),
        endDate: z.string().nullish(),
        thumbnail: sanityMediaValidator.nullish(),
        media: z.array(sanityMediaValidator).nullish()
    })
    .merge(sanityDocumentValidator);
export type Experience = z.infer<typeof experienceValidator>;
