import { StrapiMedia, StrapiTimestamp } from "./StrapiMedia";

export interface Project extends StrapiTimestamp {
    name: string;
    logline?: string;
    description?: string;
    liveSite?: string;
    repository?: string;
    publication?: string;
    startDate?: string;
    endDate?: string;
    thumbnail?: StrapiMedia;
    media?: StrapiMedia[];
}
