import { Image } from "../interfaces/Image";
import { getAPIURL } from "./api";

export const getMedia = (media: Image) => {
    const { url } = media.data.attributes;
    const imageUrl = url.startsWith("/") ? getAPIURL(url) : url;
    return imageUrl;
};
