import { env } from "@/lib/env/client.mjs";
import { validatePromise } from "@/lib/validate";
import { ackValidator } from "@/lib/validators/ack";
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
import { RouteRevalidate } from "@/lib/validators/system";
import { z } from "zod";

type ApiOptions = RequestInit;

export const api = async <T = any>(resource: string, options: ApiOptions = {}): Promise<T> => {
    const host = `${env.NEXT_PUBLIC_SITE_URL}/api`;
    const response = await fetch(`${host}/${resource}`, {
        method: "GET",
        credentials: "include",
        ...options,
        headers: {
            Origin: env.NEXT_PUBLIC_SITE_URL,
            ...(options.headers || {})
        }
    });
    const result = response.headers.get("Content-Type")?.includes("application/json")
        ? await response.json()
        : await response.text();
    return response.ok ? result : Promise.reject(result);
};

// system

export const apiHealth = (apiOptions?: ApiOptions) => {
    return validatePromise(api("health", apiOptions), ackValidator);
};

type RouteRevalidateRequest = RouteRevalidate;
export const routeRevalidate = (request: RouteRevalidateRequest, apiOptions?: ApiOptions) => {
    return validatePromise(
        api("revalidate", {
            method: "POST",
            body: JSON.stringify(request),
            ...apiOptions
        }),
        ackValidator
    );
};

// collections

export const articleFindSchema = sanityQueryParameterValidator;
export type ArticleFindRequest = z.infer<typeof articleFindSchema>;
export const articleFind = async (request: ArticleFindRequest, apiOptions?: ApiOptions) => {
    const params = JSON.stringify(request);
    return validatePromise(
        api(`article/find?data=${params}`, apiOptions),
        articleValidator.array(),
        []
    );
};

export const articleFindOneSchema = z.object({ slug: z.string() });
export type ArticleFindOneRequest = z.infer<typeof articleFindOneSchema>;
export const articleFindOne = async (request: ArticleFindOneRequest, apiOptions?: ApiOptions) => {
    const params = JSON.stringify(request);
    return validatePromise(api(`article/findOne?data=${params}`, apiOptions), articleValidator);
};

export const articleIncrementViewsSchema = z.object({ documentId: z.string() });
export type ArticleIncrementViewsRequest = z.infer<typeof articleIncrementViewsSchema>;
export const articleIncrementViews = async (
    request: ArticleIncrementViewsRequest,
    apiOptions?: ApiOptions
) => {
    return api(`article/incrementViews`, {
        method: "POST",
        body: JSON.stringify(request),
        ...apiOptions
    });
};

export const educationFindSchema = sanityQueryParameterValidator;
export type EducationFindRequest = z.infer<typeof educationFindSchema>;
export const educationFind = async (request: EducationFindRequest, apiOptions?: ApiOptions) => {
    const params = JSON.stringify(request);
    return validatePromise(
        api(`education/find?data=${params}`, apiOptions),
        educationValidator.array(),
        []
    );
};

export const experienceFindSchema = sanityQueryParameterValidator;
export type ExperienceFindRequest = z.infer<typeof experienceFindSchema>;
export const experienceFind = async (request: ExperienceFindRequest, apiOptions?: ApiOptions) => {
    const params = JSON.stringify(request);
    return validatePromise(
        api(`experience/find?data=${params}`, apiOptions),
        experienceValidator.array(),
        []
    );
};

export const projectFindSchema = sanityQueryParameterValidator;
export type ProjectFindRequest = z.infer<typeof projectFindSchema>;
export const projectFind = async (request: ProjectFindRequest, apiOptions?: ApiOptions) => {
    const params = JSON.stringify(request);
    return validatePromise(
        api(`project/find?data=${params}`, apiOptions),
        projectValidator.array(),
        []
    );
};

export const publicationFindSchema = sanityQueryParameterValidator;
export type PublicationFindRequest = z.infer<typeof publicationFindSchema>;
export const publicationFind = async (request: PublicationFindRequest, apiOptions?: ApiOptions) => {
    const params = JSON.stringify(request);
    return validatePromise(
        api(`publication/find?data=${params}`, apiOptions),
        publicationValidator.array(),
        []
    );
};

export const skillFindSchema = sanityQueryParameterValidator;
export type SkillFindRequest = z.infer<typeof skillFindSchema>;
export const skillFind = async (request: SkillFindRequest, apiOptions?: ApiOptions) => {
    const params = JSON.stringify(request);
    return validatePromise(
        api(`skill/find?data=${params}`, apiOptions),
        skillValidator.array(),
        []
    );
};

export const socialFindSchema = sanityQueryParameterValidator;
export type SocialFindRequest = z.infer<typeof socialFindSchema>;
export const socialFind = async (request: SocialFindRequest, apiOptions?: ApiOptions) => {
    const params = JSON.stringify(request);
    return validatePromise(
        api(`social/find?data=${params}`, apiOptions),
        socialValidator.array(),
        []
    );
};

// pages

export const landingFind = async (apiOptions?: ApiOptions) => {
    return validatePromise(api(`social/find`, apiOptions), landingValidator);
};

// singletons

export const seoFind = async (apiOptions?: ApiOptions) => {
    return validatePromise(api(`social/find`, apiOptions), seoValidator);
};

export const settingsFind = async (apiOptions?: ApiOptions) => {
    return validatePromise(api(`social/find`, apiOptions), settingsValidator);
};
