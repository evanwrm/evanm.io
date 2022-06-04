import { StrapiMedia } from "../interfaces/Media";
import { getAPIURL } from "./api";

export const getMedia = (media: StrapiMedia) => {
    const { url } = media.data.attributes;
    const imageUrl = url.startsWith("/") ? getAPIURL(url) : url;
    return imageUrl;
};
