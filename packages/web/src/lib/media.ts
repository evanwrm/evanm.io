import { StrapiMedia } from "../interfaces/StrapiMedia";
import { getAPIURL } from "./api";

export const getMedia = (media: StrapiMedia) => {
    const { url } = Array.isArray(media.data) ? media.data[0]?.attributes : media.data.attributes;
    const imageUrl = url.startsWith("/") ? getAPIURL(url) : url;
    return imageUrl;
};
