import { StrapiTimestamp } from "./StrapiMedia";

export interface Publication extends StrapiTimestamp {
    title: string;
    author: string;
    booktitle?: string;
    journal?: string;
    pages?: string;
    year: string;
    organization?: string;
}
