import { StrapiTimestamp } from "../lib/api";
import { StrapiMedia } from "./StrapiMedia";

export interface Global extends StrapiTimestamp {
    firstName?: string;
    lastName?: string;
    bio?: string;
    cv?: StrapiMedia;
    resume?: StrapiMedia;
}
