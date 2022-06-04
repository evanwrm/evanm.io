import { NextSeoProps } from "next-seo";
import { StrapiTimestamp } from "../lib/api";

export interface Seo extends NextSeoProps, StrapiTimestamp {
    title?: string;
    titleTemplate?: string;
    description?: string;
    canonical?: string;
    openGraph?: OpenGraph;
    twitter?: Twitter;
}

export interface OpenGraph {
    url?: string;
    type?: string;
    title?: string;
    description?: string;
    site_name?: string;
    locale?: string;
    images?: OpenGraphMedia[];
    profile?: OpenGraphProfile;
}
export interface OpenGraphMedia {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
    type?: string;
    secureUrl?: string;
}
export interface OpenGraphProfile {
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
}

export interface Twitter {
    handle?: string;
    site?: string;
    cardType?: string;
}
