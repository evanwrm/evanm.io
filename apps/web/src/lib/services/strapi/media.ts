import { getAPIURL } from "@/lib/services/strapi/api";
import { isExternal } from "@/lib/uri";
import { StrapiMedia } from "@/lib/validators/strapi/strapi-media";

export const getMedia = (media: StrapiMedia) => {
    const { url } = media;
    return isExternal(url) ? url : getAPIURL(url);
};

export const getMediaThumbnail = (media: StrapiMedia) => {
    const { url, formats } = media;
    const thumnailUrl =
        typeof formats === "object" && formats?.thumbnail?.url ? formats?.thumbnail?.url : url;

    return isExternal(thumnailUrl) ? thumnailUrl : getAPIURL(thumnailUrl);
};
