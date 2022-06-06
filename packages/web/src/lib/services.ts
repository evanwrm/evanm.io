import { Global } from "../interfaces/Global";
import { Project } from "../interfaces/Project";
import { Publication } from "../interfaces/Publication";
import { Seo } from "../interfaces/Seo";
import { Skill } from "../interfaces/Skill";
import { SocialLink } from "../interfaces/Social";
import { fetchAPI, ServiceFetcher } from "./api";

export const getGlobal: ServiceFetcher<Global> = async (
    urlParamsObject: any = {},
    options: RequestInit = {},
    mapData: boolean = true
) => {
    return fetchAPI("/global", { populate: "*", ...urlParamsObject }, options, mapData);
};

export const getSeo: ServiceFetcher<Seo> = async (
    urlParamsObject: any = {},
    options: RequestInit = {},
    mapData: boolean = true
) => {
    return fetchAPI("/seo", { populate: "*", ...urlParamsObject }, options, mapData);
};

export const getSocials: ServiceFetcher<SocialLink[]> = async (
    urlParamsObject: any = {},
    options: RequestInit = {},
    mapData: boolean = true
) => {
    return fetchAPI("/social-links", { populate: "*", ...urlParamsObject }, options, mapData);
};

export const getProjects: ServiceFetcher<Project[]> = async (
    urlParamsObject: any = {},
    options: RequestInit = {},
    mapData: boolean = true
) => {
    return fetchAPI("/projects", { populate: "*", ...urlParamsObject }, options, mapData);
};

export const getPublications: ServiceFetcher<Publication[]> = async (
    urlParamsObject: any = {},
    options: RequestInit = {},
    mapData: boolean = true
) => {
    return fetchAPI("/publications", { populate: "*", ...urlParamsObject }, options, mapData);
};

export const getSkills: ServiceFetcher<Skill[]> = async (
    urlParamsObject: any = {},
    options: RequestInit = {},
    mapData: boolean = true
) => {
    return fetchAPI("/skills", { populate: "*", ...urlParamsObject }, options, mapData);
};
