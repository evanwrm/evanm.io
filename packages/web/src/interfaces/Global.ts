import { StrapiMedia, StrapiTimestamp } from "./StrapiMedia";

export interface Global extends StrapiTimestamp {
    firstName?: string;
    lastName?: string;
    bio?: string;
    cv?: StrapiMedia;
    resume?: StrapiMedia;
}
