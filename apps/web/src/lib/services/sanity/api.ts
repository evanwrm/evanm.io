import { env } from "@/lib/env/server.mjs";
import type {
    ArticleFindOneRequest,
    ArticleFindRequest,
    ArticleIncrementViewsRequest,
    EducationFindRequest,
    ExperienceFindRequest,
    ProjectFindRequest,
    PublicationFindRequest,
    SkillFindRequest,
    SocialFindRequest
} from "@/lib/services/api";
import { groqSort } from "@/lib/services/sanity/utils";
import { Article } from "@/lib/validators/article";
import { Education } from "@/lib/validators/education";
import { Experience } from "@/lib/validators/experience";
import { Landing } from "@/lib/validators/landing";
import { Project } from "@/lib/validators/project";
import { Publication } from "@/lib/validators/publication";
import { Seo } from "@/lib/validators/seo";
import { Settings } from "@/lib/validators/settings";
import { Skill } from "@/lib/validators/skill";
import { SocialLink } from "@/lib/validators/social";
import { createClient, groq } from "next-sanity";

export const sanityClient = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn: typeof window !== "undefined"
});

export const api = <T = any>(query: string, paramsObject: { [key: string]: any } = {}) => {
    return sanityClient.fetch<T>(groq`${query}`, paramsObject);
};

// collections

export const articleFind = async ({
    sort = "endDate desc"
}: ArticleFindRequest): Promise<Article[]> => {
    return api(
        `*[_type == "article"]{
        ...,
        "slug":slug.current,
        tags[]->
    }${groqSort(sort)}`
    );
};

export const articleFindOne = async ({ slug }: ArticleFindOneRequest): Promise<Article> => {
    return api(
        `*[_type == "article" && slug.current == $slug]{
            ...,
            "slug":slug.current,
            tags[]->
        }[0]`,
        { slug }
    );
};

export const articleIncrementViews = async ({ documentId }: ArticleIncrementViewsRequest) => {
    sanityClient
        .patch(documentId)
        .inc({ "stats.views": 1 })
        .commit({ token: env.SANITY_APP_TOKEN })
        .catch(console.error);
};

export const educationFind = async ({
    sort = "name desc"
}: EducationFindRequest): Promise<Education[]> => {
    return api(`*[_type == "education"]{
        ...,
        "slug":slug.current,
        thumbnail{title,alt,asset->},
        media[]{title,alt,asset->}
    }${groqSort(sort)}`);
};

export const experienceFind = async ({
    sort = "name desc"
}: ExperienceFindRequest): Promise<Experience[]> => {
    return api(`*[_type == "experience"]{
        ...,
        "slug":slug.current,
        thumbnail{title,alt,asset->},
        media[]{title,alt,asset->}
    }${groqSort(sort)}`);
};

export const projectFind = async ({
    sort = "endDate desc"
}: ProjectFindRequest): Promise<Project[]> => {
    return api(
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
        }${groqSort(sort)}`
    );
};

export const publicationFind = async ({
    sort = "year desc"
}: PublicationFindRequest): Promise<Publication[]> => {
    return api(
        `*[_type == "publication"]{
            ...,
            "slug": slug.current,
            project->{...,"slug": slug.current}
        }${groqSort(sort)}`
    );
};

export const skillFind = async ({ sort = "name desc" }: SkillFindRequest): Promise<Skill[]> => {
    return api(
        `*[_type == "skill"]{
            ...,
            "slug":slug.current,
            projects[]->{...,"slug": slug.current}
        }${groqSort(sort)}`
    );
};

export const socialFind = async ({
    sort = "name desc"
}: SocialFindRequest): Promise<SocialLink[]> => {
    return api(`*[_type == "social"]${groqSort(sort)}`);
};

// pages

export const landingFind = async (): Promise<Landing> => {
    return api(`*[_type == "landing"][0]`);
};

// singletons

export const seoFind = async (): Promise<Seo> => {
    return api(`*[_type == "seo"][0]`);
};

export const settingsFind = async (): Promise<Settings> => {
    return api(`*[_type == "settings"]{
        ...,
        avatar{title,alt,asset->},
        cv{title,alt,asset->},
        resume{title,alt,asset->}
    }[0]`);
};
