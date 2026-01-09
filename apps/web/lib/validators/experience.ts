import { z } from "zod";
import { sanityDocumentValidator } from "@/lib/validators/sanity/sanity-document";
import { sanityMediaValidator } from "@/lib/validators/sanity/sanity-media";

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
        role: z.string(),
        company: z.string(),
        slug: z.string(),
        employmentType: experienceTypeValidator,
        locationType: locationTypeValidator.nullish(),
        location: z.string().nullish(),
        siteUrl: z.string().nullish(),
        description: z.string().nullish(),
        startDate: z.string().nullish(),
        endDate: z.string().nullish(),
        thumbnail: sanityMediaValidator.nullish(),
        media: z.array(sanityMediaValidator).nullish(),
    })
    .merge(sanityDocumentValidator);
export type Experience = z.infer<typeof experienceValidator>;
