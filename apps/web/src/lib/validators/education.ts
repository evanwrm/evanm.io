import { sanityDocumentValidator } from "@/lib/validators/sanity/sanity-document";
import { sanityMediaValidator } from "@/lib/validators/sanity/sanity-media";
import { z } from "zod";

export const courseValidator = z.object({
    name: z.string(),
    instructor: z.string().nullish()
});

export const educationLevelValidator = z.enum([
    "primary",
    "highschool",
    "undergraduate",
    "graduate",
    "postgraduate"
]);

export const educationValidator = z
    .object({
        educationLevel: educationLevelValidator,
        school: z.string(),
        slug: z.string(),
        degree: z.string().nullish(),
        location: z.string().nullish(),
        siteUrl: z.string().nullish(),
        description: z.string().nullish(),
        gpa: z.string().nullish(),
        courses: z.array(courseValidator).nullish(),
        startDate: z.string().nullish(),
        endDate: z.string().nullish(),
        thumbnail: sanityMediaValidator.nullish(),
        media: z.array(sanityMediaValidator).nullish()
    })
    .merge(sanityDocumentValidator);
export type Education = z.infer<typeof educationValidator>;
