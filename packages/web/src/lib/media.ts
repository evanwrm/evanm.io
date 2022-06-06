import { StrapiMedia } from "../interfaces/StrapiMedia";
import { getAPIURL } from "./api";
import { isExternal } from "./utils";

export const getMedia = (media: StrapiMedia) => {
    const { url } = media;
    return isExternal(url) ? url : getAPIURL(url);
};
