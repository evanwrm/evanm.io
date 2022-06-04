import { StrapiTimestamp } from "../lib/api";

export interface SocialLink extends StrapiTimestamp {
    socialId: string;
    name: string;
    iconId: string;
    description?: string;
    url: string;
}
