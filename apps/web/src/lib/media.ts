import { StrapiMedia } from "../validators/StrapiMedia";
import { getAPIURL } from "./api";
import { isExternal } from "./utils/uri";

export const getMedia = (media: StrapiMedia) => {
    const { url } = media;
    return isExternal(url) ? url : getAPIURL(url);
};
