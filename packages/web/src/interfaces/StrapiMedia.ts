import { APIResponse } from "../lib/api";

export interface StrapiMedia extends APIResponse<StrapiAttributes> {}

export interface StrapiAttributes {
    name?: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider?: string;
}
