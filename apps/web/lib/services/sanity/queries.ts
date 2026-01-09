import { groq } from "next-sanity";
import { z } from "zod";
import { sanityClient } from "@/lib/services/sanity/client";
import { groqSort } from "@/lib/services/sanity/utils";
import { validatePromise } from "@/lib/validate";
import { articleValidator } from "@/lib/validators/article";
import { educationValidator } from "@/lib/validators/education";
import { experienceValidator } from "@/lib/validators/experience";
import { landingValidator } from "@/lib/validators/landing";
import { projectValidator } from "@/lib/validators/project";
import { publicationValidator } from "@/lib/validators/publication";
import { sanityQueryParameterValidator } from "@/lib/validators/sanity/sanity-query-parameters";
import { seoValidator } from "@/lib/validators/seo";
import { settingsValidator } from "@/lib/validators/settings";
import { skillValidator } from "@/lib/validators/skill";
import { socialValidator } from "@/lib/validators/social";

export const api = <T = any>(
    query: string,
    paramsObject: { [key: string]: any } = {},
) => {
    return sanityClient.fetch<T>(groq`${query}`, paramsObject);
};

// collections

export const articleFindSchema = sanityQueryParameterValidator;
export type ArticleFindRequest = z.infer<typeof articleFindSchema>;
export const articleFind = async ({
    sort = "endDate desc",
}: ArticleFindRequest) => {
    return validatePromise(
        api(
            `*[_type == "article"]{
        ...,
        "slug":slug.current,
        tags[]->
    }${groqSort(sort)}`,
        ),
        articleValidator.array(),
        [],
    );
};

export const articleFindOneSchema = z.object({ slug: z.string() });
export type ArticleFindOneRequest = z.infer<typeof articleFindOneSchema>;
export const articleFindOne = async ({ slug }: ArticleFindOneRequest) => {
    return validatePromise(
        api(
            `*[_type == "article" && slug.current == $slug]{
            ...,
            "slug":slug.current,
            tags[]->
        }[0]`,
            { slug },
        ),
        articleValidator,
    );
};

export const educationFindSchema = sanityQueryParameterValidator;
export type EducationFindRequest = z.infer<typeof educationFindSchema>;
export const educationFind = async ({
    sort = "name desc",
}: EducationFindRequest) => {
    return validatePromise(
        api(`*[_type == "education"]{
        ...,
        "slug":slug.current,
        thumbnail{title,alt,asset->},
        media[]{title,alt,asset->}
    }${groqSort(sort)}`),
        educationValidator.array(),
        [],
    );
};

export const experienceFindSchema = sanityQueryParameterValidator;
export type ExperienceFindRequest = z.infer<typeof experienceFindSchema>;
export const experienceFind = async ({
    sort = "name desc",
}: ExperienceFindRequest) => {
    return validatePromise(
        api(`*[_type == "experience"]{
        ...,
        "slug":slug.current,
        thumbnail{title,alt,asset->},
        media[]{title,alt,asset->}
    }${groqSort(sort)}`),
        experienceValidator.array(),
        [],
    );
};

export const projectFindSchema = sanityQueryParameterValidator;
export type ProjectFindRequest = z.infer<typeof projectFindSchema>;
export const projectFind = async ({
    sort = "endDate desc",
}: ProjectFindRequest) => {
    return validatePromise(
        api(
            `*[_type == "project"]{
            ...,
            "slug":slug.current,
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
};

export const publicationFindSchema = sanityQueryParameterValidator;
export type PublicationFindRequest = z.infer<typeof publicationFindSchema>;
export const publicationFind = async ({
    sort = "year desc",
}: PublicationFindRequest) => {
    return validatePromise(
        api(
            `*[_type == "publication"]{
            ...,
            "slug": slug.current,
            project->{...,"slug": slug.current}
        }${groqSort(sort)}`,
        ),
        publicationValidator.array(),
        [],
    );
};

export const skillFindSchema = sanityQueryParameterValidator;
export type SkillFindRequest = z.infer<typeof skillFindSchema>;
export const skillFind = async ({ sort = "name desc" }: SkillFindRequest) => {
    return validatePromise(
        api(
            `*[_type == "skill"]{
            ...,
            "slug":slug.current,
            projects[]->{...,"slug": slug.current}
        }${groqSort(sort)}`,
        ),
        skillValidator.array(),
        [],
    );
};

export const socialFindSchema = sanityQueryParameterValidator;
export type SocialFindRequest = z.infer<typeof socialFindSchema>;
export const socialFind = async ({ sort = "name desc" }: SocialFindRequest) => {
    return validatePromise(
        api(`*[_type == "social"]${groqSort(sort)}`),
        socialValidator.array(),
        [],
    );
};

// pages

export const landingFind = async () => {
    return validatePromise(api(`*[_type == "landing"][0]`), landingValidator);
};

// singletons

export const seoFind = async () => {
    return validatePromise(api(`*[_type == "seo"][0]`), seoValidator);
};

export const settingsFind = async () => {
    return validatePromise(
        api(`*[_type == "settings"]{
        ...,
        avatar{title,alt,asset->},
        cv{title,alt,asset->},
        resume{title,alt,asset->}
    }[0]`),
        settingsValidator,
    );
};
