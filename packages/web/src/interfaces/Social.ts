import { StrapiTimestamp } from "./StrapiMedia";

export interface SocialLink extends StrapiTimestamp {
    socialId: string;
    name: string;
    iconId: string;
    description?: string;
    url: string;
}
