import { Global } from "../interfaces/Global";
import { Project } from "../interfaces/Project";
import { Publication } from "../interfaces/Publication";
import { Seo } from "../interfaces/Seo";
import { SocialLink } from "../interfaces/Social";
import { fetchAPI, ServiceFetcher } from "./api";

export const getGlobal: ServiceFetcher<Global> = async (
    urlParamsObject: any = { populate: "*" },
    options: RequestInit = {},
    mapData: boolean = true
) => {
    return fetchAPI("/global", urlParamsObject, options, mapData);
};

export const getSeo: ServiceFetcher<Seo> = async (
    urlParamsObject: any = { populate: "*" },
    options: RequestInit = {},
    mapData: boolean = true
) => {
    return fetchAPI("/seo", urlParamsObject, options, mapData);
};

export const getSocials: ServiceFetcher<SocialLink[]> = async (
    urlParamsObject: any = { populate: "*" },
    options: RequestInit = {},
    mapData: boolean = true
) => {
    return fetchAPI("/social-links", urlParamsObject, options, mapData);
};

export const getProjects: ServiceFetcher<Project[]> = async (
    urlParamsObject: any = { populate: "*" },
    options: RequestInit = {},
    mapData: boolean = true
) => {
    return fetchAPI("/projects", urlParamsObject, options, mapData);
};

export const getPublications: ServiceFetcher<Publication[]> = async (
    urlParamsObject: any = { populate: "*" },
    options: RequestInit = {},
    mapData: boolean = true
) => {
    return fetchAPI("/publications", urlParamsObject, options, mapData);
};
