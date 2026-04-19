import { z } from "zod";
import { sanityClient } from "@/lib/sanity/client";
import { groqSort } from "@/lib/sanity/utils";
import { validatePromise } from "@/lib/validate";
import { articleValidator } from "@/lib/validators/article";
import { educationValidator } from "@/lib/validators/education";
import { experienceValidator } from "@/lib/validators/experience";
import { homeValidator } from "@/lib/validators/home";
import { projectValidator } from "@/lib/validators/project";
import { publicationValidator } from "@/lib/validators/publication";
import { sanityQueryParamValidator } from "@/lib/validators/sanity";
import { seoValidator } from "@/lib/validators/seo";
import { settingsValidator } from "@/lib/validators/settings";
import { skillValidator } from "@/lib/validators/skill";
import { socialValidator } from "@/lib/validators/social";

// collections

export const articleFindSchema = sanityQueryParamValidator;
export type ArticleFindRequest = z.infer<typeof articleFindSchema>;
export async function articleFind({
    sort = "_createdAt desc",
}: ArticleFindRequest = {}) {
    return validatePromise(
        sanityClient.fetch(
            `*[_type == "article"]{
                ...,
                "slug": slug.current,
                tags[]->
            }${groqSort(sort)}`,
        ),
        articleValidator.array(),
        [],
    );
}

export const articleFindOneSchema = z.object({ slug: z.string() });
export type ArticleFindOneRequest = z.infer<typeof articleFindOneSchema>;
export async function articleFindOne({ slug }: ArticleFindOneRequest) {
    return validatePromise(
        sanityClient.fetch(
            `*[_type == "article" && slug.current == $slug]{
                ...,
                "slug": slug.current,
                tags[]->
            }[0]`,
            { slug },
        ),
        articleValidator.nullable(),
    );
}

export const socialFindSchema = sanityQueryParamValidator;
export type SocialFindRequest = z.infer<typeof socialFindSchema>;
export async function socialFind({
    sort = "name desc",
}: SocialFindRequest = {}) {
    return validatePromise(
        sanityClient.fetch(`*[_type == "social"]${groqSort(sort)}`),
        socialValidator.array(),
        [],
    );
}

export const educationFindSchema = sanityQueryParamValidator;
export type EducationFindRequest = z.infer<typeof educationFindSchema>;
export async function educationFind({
    sort = ["endDate desc", "startDate desc"],
}: EducationFindRequest = {}) {
    return validatePromise(
        sanityClient.fetch(
            `*[_type == "education"]{
                ...,
                "slug": slug.current,
                thumbnail{title,alt,asset->},
                media[]{title,alt,asset->}
            }${groqSort(sort)}`,
        ),
        educationValidator.array(),
        [],
    );
}

export const experienceFindSchema = sanityQueryParamValidator;
export type ExperienceFindRequest = z.infer<typeof experienceFindSchema>;
export async function experienceFind({
    sort = ["endDate desc", "startDate desc"],
}: ExperienceFindRequest = {}) {
    return validatePromise(
        sanityClient.fetch(
            `*[_type == "experience"]{
                ...,
                "slug": slug.current,
                thumbnail{title,alt,asset->},
                media[]{title,alt,asset->}
            }${groqSort(sort)}`,
        ),
        experienceValidator.array(),
        [],
    );
}

export const projectFindSchema = sanityQueryParamValidator;
export type ProjectFindRequest = z.infer<typeof projectFindSchema>;
export async function projectFind({
    sort = "endDate desc",
}: ProjectFindRequest = {}) {
    return validatePromise(
        sanityClient.fetch(
            `*[_type == "project"]{
                ...,
                "slug": slug.current,
                thumbnail{title,alt,asset->},
                media[]{title,alt,asset->},
                "publications": *[_type == "publication" && references(^._id)]{
                    ...,
                    "slug": slug.current
                },
                skills[]->{...,"slug":slug.current}
            }${groqSort(sort)}`,
        ),
        projectValidator.array(),
        [],
    );
}

export const publicationFindSchema = sanityQueryParamValidator;
export type PublicationFindRequest = z.infer<typeof publicationFindSchema>;
export async function publicationFind({
    sort = "year desc",
}: PublicationFindRequest = {}) {
    return validatePromise(
        sanityClient.fetch(
            `*[_type == "publication"]{
                ...,
                "slug": slug.current,
                project->{...,"slug": slug.current}
            }${groqSort(sort)}`,
        ),
        publicationValidator.array(),
        [],
    );
}

export const skillFindSchema = sanityQueryParamValidator;
export type SkillFindRequest = z.infer<typeof skillFindSchema>;
export async function skillFind({ sort = "name desc" }: SkillFindRequest = {}) {
    return validatePromise(
        sanityClient.fetch(
            `*[_type == "skill"]{
                ...,
                "slug":slug.current,
                projects[]->{...,"slug": slug.current}
            }${groqSort(sort)}`,
        ),
        skillValidator.array(),
        [],
    );
}

// pages

export async function homeFind() {
    return validatePromise(
        sanityClient.fetch(`*[_type == "home"][0]`),
        homeValidator,
    );
}

// singletons

export async function seoFind() {
    return validatePromise(
        sanityClient.fetch(`*[_type == "seo"][0]`),
        seoValidator,
    );
}

export async function settingsFind() {
    return validatePromise(
        sanityClient.fetch(
            `*[_type == "settings"]{
                ...,
                avatar{title,alt,asset->},
                cv{title,alt,asset->},
                resume{title,alt,asset->}
            }[0]`,
        ),
        settingsValidator,
    );
}
