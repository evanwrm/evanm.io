import * as z from "zod";
import {
    sanityDocumentValidator,
    sanityMediaValidator,
} from "@/lib/validators/sanity";

export const courseValidator = z.object({
    name: z.string(),
    instructor: z.string().nullish(),
});

export const educationLevelValidator = z.enum([
    "primary",
    "highschool",
    "undergraduate",
    "graduate",
    "postgraduate",
]);

export const educationValidator = z
    .object({
        slug: z.string(),
        school: z.string(),
        degree: z.string().nullish(),
        location: z.string().nullish(),
        gpa: z.string().nullish(),
        startDate: z.string().nullish(),
        endDate: z.string().nullish(),
        description: z.string().nullish(),
        siteUrl: z.url().nullish(),
        courses: z.array(courseValidator).nullish(),
        educationLevel: educationLevelValidator,
        thumbnail: sanityMediaValidator.nullish(),
        media: z.array(sanityMediaValidator).nullish(),
    })
    .extend(sanityDocumentValidator.shape);
export type Education = z.infer<typeof educationValidator>;
